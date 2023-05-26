<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dish;
use App\Models\Restaurant;
use App\Models\Order;
use Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


class CartController extends Controller
{
    public function addToCart (Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:dishes,id',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'amount' => 'required|integer|min:1|max:50'
        ]);
        if($validator->stopOnFirstFailure()->fails()){
            $error = $validator->errors()->all()[0];
            return response()->json(['message' => $error]);
        }

        $cart = $request->session()->get('cart', collect([]));
        $dishInCart = $cart->where('dish_id', $request->id)->where('restaurant_id', $request->restaurant_id);
        if(count($dishInCart) !== 0){
            $cart = $cart->map(function($dish) use ($request){
                if($dish['dish_id'] == $request->id && $dish['restaurant_id'] == $request->restaurant_id){
                    $dish['amount'] += $request['amount'];
                }
                    return $dish;
            });
        } 
        else {
            $cart = $cart->push(['restaurant_id'=> $request->restaurant_id, 'dish_id'=> $request->id, 'amount' => $request->amount]);
        }
        $request->session()->put('cart', $cart);

        return response()->json([
            'message'=> $request->dish_name . ' is in your cart. Check your cart and make and order.'
        ]);
    }
    public function showCart(Request $request){
        $cart = $request->session()->get('cart', collect([]));
        $dishesIds = $cart->pluck('dish_id');
        $cart = $cart->map(function($item){
            $item['dish_info'] = Dish::where('id', $item['dish_id'])
                               ->first();
            return $item;
        })->groupBy('restaurant_id')
          ->values()
          ->map(function($restaurant){
            $totalPrice = 0;
            foreach($restaurant as $item){
                $totalPrice += $item['amount'] * $item['dish_info']['price'];
            }
            $restaurantName = Restaurant::where('id', $restaurant[0]['restaurant_id'])
                            ->select('restaurant_name')
                            ->first()->restaurant_name;
            return ['cartInfo'=> $restaurant, 'totalPrice' => $totalPrice, 'restaurantName' => $restaurantName];
          });
        $perPage = 4;
        $amountOfPages = ceil($cart->count() / $perPage);

        $user = ['name'=> Auth::user()->name];
        return Inertia::render('frontOffice/Cart', [
                                'cartInfo'=> $cart,
                                'user'=> $user,
                                'asset' => asset('images/food'),
                                'deliveryPrice' => Order::DELIVERY_PRICE,
                                'amountOfPages' => $amountOfPages,
                                'perPage' => $perPage
        ]);
    }
    public function deleteCartItem (Request $request){
        $cart = $request->session()->get('cart', collect([]));
        $filtered = $cart->filter(function ($item, $key) use ($request) {
            return ($item['restaurant_id'] != $request->restaurantId || $item['dish_id'] != $request->dishId);
        });
        $request->session()->put('cart', $filtered);
        return response()->json(['message'=> 'Dish is deleted from the cart.']);
    }
    public function editCartItem(Request $request){
        $cart = $request->session()->get('cart', collect([]));
        $cart = $cart->map(function ($item) use ($request) {
            if($item['restaurant_id'] == $request->restaurantId && $item['dish_id'] == $request->dishId){
                $item['amount'] = (int) $request->amount;
            }
            return $item;
        });
        $request->session()->put('cart', $cart);
        return response()->json(['message'=> 'Amount of this dish is edited']);
    }
    public function deleteCart (Request $request){
        $cart = $request->session()->get('cart', collect([]));
        $filtered = $cart->filter(function ($item) use ($request) {
            return ($item['restaurant_id'] != $request->restaurantId);
        });
        $request->session()->put('cart', $filtered);
        return response()->json(['message'=> 'Your cart is deleted. Please form a new order.']);
    }
}
