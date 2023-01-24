<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dish;
use App\Models\Restaurant;
use App\Models\Order;
use Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function addToCart (Request $request){
        $cart = $request->session()->get('cart', collect([]));
        $ids = $cart->pluck('dish_id');

        if($ids->search($request->id) !== false){
            $cart = $cart->map(function($dish) use ($request){
                if($dish['dish_id'] == $request->id && $dish['restaurant_id'] == $request->restaurant_id){
                    $dish['amount'] += $request['amount'];
                }
                    return $dish;
            });
        } 
        else {
            $cart = $cart->push(['restaurant_id'=> (int) $request->restaurant_id, 'dish_id'=> (int) $request->id, 'amount' => (int) $request->amount]);
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
        })->groupBy('restaurant_id');
        $cart = $cart->values()->map(function($restaurant){
            $oneOrder = [];
            $totalPrice = 0;
            foreach($restaurant as $item){
                $totalPrice += $item['amount'] * $item['dish_info']['price'];
            }
            $restaurantName = Restaurant::where('id', $restaurant[0]['restaurant_id'])
                            ->select('restaurant_name')
                            ->first()->restaurant_name;
            return ['cartInfo'=> $restaurant, 'totalPrice' => $totalPrice, 'restaurantName' => $restaurantName];
          });

        $user = ['name'=> Auth::user()->name];
        return Inertia::render('Cart', [
                                'cartInfo'=> $cart,
                                'user'=> $user,
                                'asset' => asset('images/food'),
                                'deliveryPrice' => Order::DELIVERY_PRICE,
                                'deleteCartItemUrl' => route('delete-cart-item')
        ]);
    }
    public function deleteCartItem (Request $request){
        $cart = $request->session()->get('cart', collect([]));
        $filtered = $cart->filter(function ($item, $key) use ($request) {
            return ($item['restaurant_id'] != $request->restaurantId || $item['dish_id'] != $request->dishId);
        });
        $request->session()->put('cart', $filtered);
        return response()->json(['message'=> 'Dish is deleted from the list']);
    }
}
