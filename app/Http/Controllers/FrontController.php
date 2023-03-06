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
        $restaurants->map(function($restaurant){
            $restaurant['work_starts'] = Carbon::parse($restaurant['work_starts'])->format('H:i');
            $restaurant['work_ends'] = Carbon::parse($restaurant['work_ends'])->format('H:i');
            return $restaurant;
        });

        return Inertia::render('frontOffice/RestaurantList', [
                        'restaurants'=> $restaurants,
                        'restaurantDishesUrl' => route('restaurant-dishes'),
                        ]);
    }
    public function dishes(){
        
        $restaurants = Restaurant::orderBy('restaurant_name', 'asc')->get();

        $dishes = Dish::get();
        $dishes->map(function($dish){
            $restaurants = Restaurant::join('restaurant_dish', 'restaurant_dish.restaurant_id', 'restaurants.id')
                           ->select('restaurants.restaurant_name', 'restaurants.id', 'restaurants.city', 'restaurants.adress')
                           ->where('restaurant_dish.dish_id', '=', $dish->id)
                            ->get()->toArray();
            $dish->restaurants = $restaurants;
            return $dish;
        });
        return Inertia::render('frontOffice/DishList', [
                        'asset' => asset('images/food') . '/',
                        'dishes'=> $dishes,
                        'defaultPic' => '/todays-special.jpg',
                        'sortAndFilterUrl' => route('sort-and-filter'),
                        'restaurantDishesUrl'=>route('restaurant-dishes'),
                        'searchUrl' => route('search-dish'),
                        'restaurants'=> $restaurants
                        ]);
    }
    public function restaurantDishes(Request $request){
        $restaurant = Restaurant::where('id', '=', $request->id)->first();
        $dishes = Dish::join('restaurant_dish', 'restaurant_dish.dish_id', 'dishes.id')
                                ->where('restaurant_dish.restaurant_id', $request->id)
                        ->select('dishes.*')
                        ->orderBy('dishes.dish_name')
                        ->get();
        return Inertia::render('frontOffice/RestaurantDishes', [
                                'restaurant' =>$restaurant,
                                'dishes'=> $dishes,
                                'asset' => asset('images/food'). '/',
                                'defaultPic' => '/todays-special.jpg',
                                'addToCartUrl' => route('user-add-to-cart'),
                                ]);
    }

    public function sortAndFilter(Request $request){

        if($request->filter == 0){
            $dishes = match($request->price_sort){
                'asc'=>Dish::select('dishes.id as dish_id', 'dishes.*')
                ->orderBy('price', 'asc')
                ->get(), 
                'desc'=>Dish::select('dishes.id as dish_id', 'dishes.*')
                ->orderBy('price', 'desc')
                ->get(),
                default => Dish::select('dishes.id as dish_id', 'dishes.*')
                ->get(),
            };
        } else {
            $dishes = match($request->price_sort){
                'asc'=>Dish::select('dishes.id as dish_id', 'dishes.*')
                ->where('restaurants.id', '=', $request->filter)
                ->orderBy('price', 'asc')
                ->get(), 
                'desc'=>Dish::select('dishes.id as dish_id', 'dishes.*')
                ->where('restaurants.id', '=', $request->filter)
                ->orderBy('price', 'desc')
                ->get(),
                default => Dish::select('dishes.id as dish_id', 'dishes.*')
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
}
