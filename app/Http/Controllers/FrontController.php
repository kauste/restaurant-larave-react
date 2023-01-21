<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Dish;
use App\Models\Order;
use Inertia\Inertia;
use Auth;
use DB;

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

        $dishes = Dish::get();
        $dishes->map(function($dish){
            $restaurants = Restaurant::join('restaurant_dish', 'restaurant_dish.restaurant_id', 'restaurants.id')
                           ->select('restaurants.restaurant_name', 'restaurants.id')
                           ->where('restaurant_dish.dish_id', '=', $dish->id)
                            ->get()->toArray();
            $dish->restaurants = $restaurants;
            return $dish;
        });
        return Inertia::render('DishList', [
                        'asset' => asset('images/food') . '/',
                        'dishes'=> $dishes,
                        'default_pic' => '/todays-special.jpg',
                        'orderUrl' => route('user-order'),
                        'sortAndFilterUrl' => route('sort-and-filter'),
                        'searchUrl' => route('search-dish'),
                        'restaurants'=> $restaurants
                        ]);
    }

    public function sortAndFilter(Request $request){

        if($request->filter == 0){
            $dishes = match($request->price_sort){
                'asc'=>Dish::join('restaurant_dish', 'restaurant_dish.dish_id', '=', 'dishes.id')
                ->join('restaurants', 'restaurants.id', 'restaurant_dish.restaurant_id')
                ->select('dishes.id as dish_id', 'dishes.*')
                ->orderBy('price', 'asc')
                ->get(), 
                'desc'=>Dish::join('restaurant_dish', 'restaurant_dish.dish_id', '=', 'dishes.id')
                ->join('restaurants', 'restaurants.id', 'restaurant_dish.restaurant_id')
                ->select('dishes.id as dish_id', 'dishes.*')
                ->orderBy('price', 'desc')
                ->get(),
                default => Dish::join('restaurant_dish', 'restaurant_dish.dish_id', '=', 'dishes.id')
                ->join('restaurants', 'restaurants.id', 'restaurant_dish.restaurant_id')
                ->select('dishes.id as dish_id', 'dishes.*')
                ->get(),
            };
        } else {
            $dishes = match($request->price_sort){
                'asc'=>Dish::join('restaurant_dish', 'restaurant_dish.dish_id', '=', 'dishes.id')
                ->join('restaurants', 'restaurants.id', 'restaurant_dish.restaurant_id')
                ->select('dishes.id as dish_id', 'dishes.*')
                ->where('restaurants.id', '=', $request->filter)
                ->orderBy('price', 'asc')
                ->get(), 
                'desc'=>Dish::join('restaurant_dish', 'restaurant_dish.dish_id', '=', 'dishes.id')
                ->join('restaurants', 'restaurants.id', 'restaurant_dish.restaurant_id')
                ->select('dishes.id as dish_id', 'dishes.*')
                ->where('restaurants.id', '=', $request->filter)
                ->orderBy('price', 'desc')
                ->get(),
                default => Dish::join('restaurant_dish', 'restaurant_dish.dish_id', '=', 'dishes.id')
                ->join('restaurants', 'restaurants.id', 'restaurant_dish.restaurant_id')
                ->select('dishes.id as dish_id', 'dishes.*')
                ->where('restaurants.id', '=', $request->filter)
                ->get(),
            };
        }
        $dishes->map(function($dish){
            $restaurants = Restaurant::join('restaurant_dish', 'restaurant_dish.restaurant_id', 'restaurants.id')
                           ->select('restaurants.restaurant_name', 'restaurants.id')
                           ->where('restaurant_dish.dish_id', '=', $dish->id)
                           ->orderBy('restaurants.restaurant_name')
                            ->get();
            $dish->restaurants = $restaurants;
            return $dish;
        });
            return response()-> json([
                'dishes'=> $dishes,
            ]);
    }
    
    public function searchDish(Request $request){
        $search_words = explode(' ', trim($request->dish));
        if(count($search_words) > 1 ){
            $search_words = array_slice($search_words, 0, 1);
        }
        $dishes = Dish::select('dishes.id as dish_id', 'dishes.*')
        ->where(function($case) use ($search_words){
            foreach($search_words as $word){
                $case->where('dishes.dish_name', 'like', '%'. $word.'%');
            }
        })->get();
        
        $dishes->map(function($dish){
            $restaurants = Restaurant::join('restaurant_dish', 'restaurant_dish.restaurant_id', 'restaurants.id')
                           ->select('restaurants.restaurant_name', 'restaurants.id')
                           ->where('restaurant_dish.dish_id', '=', $dish->id)
                           ->orderBy('restaurants.restaurant_name')
                            ->get();
            $dish->restaurants = $restaurants;
            return $dish;
        });

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
