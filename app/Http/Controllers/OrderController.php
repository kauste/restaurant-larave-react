<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Dish;
use App\Models\User;
use App\Models\Restaurant;
use App\Models\ContactInfo;
use Auth;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::where('user_id', Auth::user()->id)
                        ->orderBy('created_at', 'desc')
                        ->get()
                        ->map(function($order){
                            $order->dishes = Dish::join('dish_order', 'dish_order.dish_id', 'dishes.id')
                                            ->where('order_id', $order->id)
                                            ->get();
                            $order->restaurantName = Restaurant::where('restaurants.id', $order->restaurant_id)
                                                                ->select('restaurants.restaurant_name')
                                                                ->first()->restaurant_name;
                            $totalPrice = 0;
                            foreach($order->dishes as $item){
                                    $totalPrice += $item['amount'] * $item['price'];
                            }
                            if($order->delivery_choice === 1){
                                $order->contactInfo = ContactInfo::where('order_id', $order->id)
                                                                ->first();
                                $totalPrice += Order::DELIVERY_PRICE;                          
                            }
                            $order->totalPrice = $totalPrice;
                            $order->created = Carbon::create($order->created_at, 'UTC+2')->format('Y-m-d H:m');
                            $order->updated = Carbon::parse($order->updated_at, 'UTC+2')->format('Y-m-d H:m');
                            return $order;
                        });
        $statuses = Order::STATUS;
        $deliveryChoices = Order::DELIVERY_CHOICES;
        
        return Inertia::render('frontOffice/FrontOrders', [ 'orders' => $orders,
                                                'statuses' => $statuses,
                                                'deliveryPrice' => Order::DELIVERY_PRICE,
                                                'asset'=> asset('/images/food'),
                                                'deliveryChoices' => $deliveryChoices,
                                                'getInvoiceUrl' => route('get-invoice')
                                                ]);
        
    }
    public function store(Request $request)
    {   
        // validation
        $courierData = $request->deliveryData['courierData'];
        if($request->deliveryData['deliveryChoice'] == 1){
            $validator = Validator::make($courierData, [
                'city' => 'required|string|min:3|max:50',
                'street' =>'required|string|min:3|max:50',
                'streetNumber'=> 'required|string|min:1|max:8',
                'flat' => 'nullable|string|min:1|max:8',
                'postCode'  => 'required|numeric|digits_between:5,8',
                'telNr' => 'required|numeric|digits:8',
                'message' => 'nullable|string|min:1|max:200'
            ]);
            $validator->after(function ($validator) use ($courierData){
                $exp = '/6\d{7}/';
                if (preg_match($exp, $courierData['telNr']) != 1) {
                    $validator->errors()->add('telNr', 'Invalid telephone number!');
                }
            });
            if($validator->fails()){
                $errors = $validator->errors()->all();
                return response()->json(['errors' => $errors]);
            }
        }
        // data valid, putting to database
        $order = new Order;
        $order->user_id = Auth::user()->id;
        $order->restaurant_id = $request->restaurantId;
        $order->delivery_choice = $request->deliveryData['deliveryChoice'];
        $order->save();

        $allCarts = $request->session()->get('cart', collect([]));
        $restaurantCart = $allCarts->filter(function ($item) use ($request) {
            return ($item['restaurant_id'] == $request->restaurantId);
        });
        $restaurantCart->map(function($item) use ($order){
                $order->dishes()->attach($item['dish_id'], ['amount' => $item['amount']]);
        });
        if($request->deliveryData['deliveryChoice'] == 1){
            $contactInfo = new ContactInfo;
            $contactInfo->order_id = $order->id;
            $contactInfo->city = $courierData['city'];
            $contactInfo->street = $courierData['street'];
            $contactInfo->street_nr = $courierData['streetNumber'];
            $contactInfo->flat_nr = $courierData['flat'];
            $contactInfo->post_code = $courierData['postCode'];
            $contactInfo->telephone_number = $courierData['telNr'];
            $contactInfo->message = $courierData['message'];
            $contactInfo->save();
        }

        $filtered = $allCarts->filter(function ($item) use ($request) {
            return ($item['restaurant_id'] != $request->restaurantId);
        });
        $request->session()->put('cart', $filtered);

        return response()->json(['message'=> 'Thank you for your order. Delivery information will appear on you order as soon as possible.']);

    }


    public function updateAdress(Request $request)
    {
        $contacts = ContactInfo::where('order_id', $request->orderId)->first();
        $contacts->city = $request->all()['city'];
        $contacts->street = $request->all()['street'];
        $contacts->street_nr = $request->all()['streetNumber'];
        $contacts->flat_nr = $request->all()['flat'] ?? null;
        $contacts->post_code = $request->all()['postCode'];
        $contacts->telephone_number = $request->all()['telNr'];
        $contacts->message = $request->all()['message'] ?? null;
        $contacts->save();
        return response()->json(['message' => 'Contact information is edited.']);
    }
    public function getInvoice(Request $request){
        $order = Order::where('orders.id', $request->orderId)
                        ->first();
        $order->food = Dish::join('dish_order','dish_order.dish_id', 'dishes.id')
                            ->where('dish_order.order_id', $request->orderId)
                            ->select('dishes.dish_name', 'dishes.price', 'dish_order.amount')
                            ->get();
        $order->totalPrice = 0;
        ($order->food)->map(function($dish) use ($order){
            $dish->allPrice = round(($dish->amount * $dish->price), 2);
            $order->totalPrice += $dish->allPrice;
            return $dish;
        });

        if($order->delivery_choice === 1){
            $order->totalPrice += Order::DELIVERY_PRICE;
        }
        $order->delivery_price = $order->delivery_choice === 1 ? Order::DELIVERY_PRICE : 0;
        $order->user = User::where('id', $order->user_id)->first();
        $order->status_name = Order::STATUS[$order->status];
        $order->delivery = Order::DELIVERY_CHOICES[$order->delivery_choice];


        $pdf = Pdf::loadView('invoice', ['order'=> $order]);
        $pdf->setPaper('a4' , 'portrait');
        return $pdf->output();
    }
    public function backIndex (){
        $orders = Order::where('id', '>', 0)
                        ->select('orders.*')
                        ->orderBy('created_at', 'desc')
                        ->groupBy('status')
                        ->get();
                        dump($orders);
        //                 ->map(function($order){
        //                     $order->dishes = Dish::join('dish_order', 'dish_order.dish_id', 'dishes.id')
        //                                     ->where('order_id', $order->id)
        //                                     ->get();
        //                     $order->restaurantName = Restaurant::where('restaurants.id', $order->restaurant_id)
        //                                                         ->select('restaurants.restaurant_name')
        //                                                         ->first()->restaurant_name;
        //                     $totalPrice = 0;
        //                     foreach($order->dishes as $item){
        //                             $totalPrice += $item['amount'] * $item['price'];
        //                     }
        //                     if($order->delivery_choice === 1){
        //                         $order->contactInfo = ContactInfo::where('order_id', $order->id)
        //                                                         ->first();
        //                         $totalPrice += Order::DELIVERY_PRICE;                          
        //                     }
        //                     $order->totalPrice = $totalPrice;
        //                     $order->created = Carbon::create($order->created_at, 'UTC+2')->format('Y-m-d H:m');
        //                     $order->updated = Carbon::parse($order->updated_at, 'UTC+2')->format('Y-m-d H:m');
        //                     return $order;
        //                 });
        // $statuses = Order::STATUS;
        // $deliveryChoices = Order::DELIVERY_CHOICES;
        return Inertia::render('BackOffice/OrderList', ['orders' => $orders]);
    }
}
