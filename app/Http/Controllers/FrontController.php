<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Dish;
use App\Models\Order;
use Inertia\Inertia;
use Auth;

class FrontController extends Controller
{
    public function restaurants(){
        $restaurants = Restaurant::all();
        return Inertia::render('RestaurantList', [
                        'restaurants'=> $restaurants
                        ]);
    }
    public function dishes(){
        
        $restaurants = Restaurant::orderBy('restaurant_name', 'asc')->get();
        $dishes = Dish::join('restaurants', 'restaurants.id', '=', 'dishes.restaurant_id')
            ->select('dishes.id as dish_id', 'restaurants.*', 'dishes.*')
            ->get();

        return Inertia::render('DishList', [
                        'dishes'=> $dishes,
                        'default_pic' => asset('/images') . '/like.jpg',
                        'orderUrl' => route('user-order'),
                        'sortAndFilterUrl' => route('sort-and-filter'),
                        'searchUrl' => route('search-dish'),
                        'restaurants'=> $restaurants
                        ]);
    }

    public function sortAndFilter(Request $request){
        dump($request->filter);
        if($request->filter == 0){
            $dishes = match($request->price_sort){
                'asc'=>Dish::join('restaurants', 'restaurants.id', '=', 'dishes.restaurant_id')
                ->select('dishes.id as dish_id', 'restaurants.*', 'dishes.*')
                ->orderBy('price', 'asc')
                ->get(), 
                'desc'=>Dish::join('restaurants', 'restaurants.id', '=', 'dishes.restaurant_id')
                ->select('dishes.id as dish_id', 'restaurants.*', 'dishes.*')
                ->orderBy('price', 'desc')
                ->get(),
                default => Dish::join('restaurants', 'restaurants.id', '=', 'dishes.restaurant_id')
                ->select('dishes.id as dish_id', 'restaurants.*', 'dishes.*')
                ->get(),
            };
        } else {
            $dishes = match($request->price_sort){
                'asc'=>Dish::join('restaurants', 'restaurants.id', '=', 'dishes.restaurant_id')
                ->select('dishes.id as dish_id', 'restaurants.*', 'dishes.*')
                ->where('restaurants.id', '=', $request->filter)
                ->orderBy('price', 'asc')
                ->get(), 
                'desc'=>Dish::join('restaurants', 'restaurants.id', '=', 'dishes.restaurant_id')
                ->select('dishes.id as dish_id', 'restaurants.*', 'dishes.*')
                ->where('restaurants.id', '=', $request->filter)
                ->orderBy('price', 'desc')
                ->get(),
                default => Dish::join('restaurants', 'restaurants.id', '=', 'dishes.restaurant_id')
                ->select('dishes.id as dish_id', 'restaurants.*', 'dishes.*')
                ->where('restaurants.id', '=', $request->filter)
                ->get(),
            };
        }
            return response()-> json([
                'dishes'=> $dishes,
            ]);
    }
    
    public function searchDish(Request $request){
        $search_words = explode(' ', trim($request->dish));
        if(count($search_words) > 1 ){
            $search_words = array_slice($search_words, 0, 1);
        }
        $dishes = Dish::join('restaurants', 'restaurants.id', '=', 'dishes.restaurant_id')
        ->select('dishes.id as dish_id', 'restaurants.*', 'dishes.*')
        ->where(function($case) use ($search_words){
            foreach($search_words as $word){
                $case->where('dishes.dish_name', 'like', '%'. $word.'%');
            }
        })->get();
        
        dump($dishes);
        return response()-> json([
            'dishes'=> $dishes,
        ]);
    }

    public function order (Request $request){
        dump($request->all());
        $order = new Order;
        $order->user_id = Auth::user()->id;
        $order->dish_id = $request->dish_id;
        dump($order);
        $order->save();
        return response()->json([
            'message'=> 'This thing is ordered'
        ]);
    }
}
