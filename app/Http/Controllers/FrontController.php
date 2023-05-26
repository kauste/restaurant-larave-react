<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Dish;
use App\Models\Order;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Auth;
use DB;

class FrontController extends Controller
{
    public function restaurants(){
        $restaurants = Restaurant::all();
        $perPage = 4;
        $amountOfPages = (int) ceil(Restaurant::count() / $perPage);
        $restaurants->map(function($restaurant){
            $restaurant['work_starts'] = Carbon::parse($restaurant['work_starts'])->format('H:i');
            $restaurant['work_ends'] = Carbon::parse($restaurant['work_ends'])->format('H:i');
            return $restaurant;
        });
        $props = [
            'restaurants'=> $restaurants,
            'amountOfPages' => $amountOfPages,
            'perPage' => $perPage
        ];
        if(Auth::user() !== null){
            return Inertia::render('frontOffice/RestaurantList', $props);
        } 
        else {
            return Inertia::render('Guest/RestaurantList', $props);
        }
    }
    public function dishes(){
        
        $restaurants = Restaurant::orderBy('restaurant_name', 'asc')->get();
        $perPage = 12;
        $amountOfPages = (int) ceil(Dish::count() / $perPage);
        $dishes = Dish::get();
        $dishes->map(function($dish){
            $restaurants = Restaurant::join('restaurant_dish', 'restaurant_dish.restaurant_id', 'restaurants.id')
                           ->select('restaurants.restaurant_name', 'restaurants.id', 'restaurants.city', 'restaurants.adress')
                           ->where('restaurant_dish.dish_id', '=', $dish->id)
                            ->get()->toArray();
            $dish->restaurants = $restaurants;
            return $dish;
        });
        $props = [
            'asset' => asset('images/food') . '/',
            'dishes'=> $dishes,
            'defaultPic' => '/todays-special.jpg',
            'restaurants'=> $restaurants,
            'amountOfPages' => $amountOfPages,
            'perPage' => $perPage
        ];
        if(Auth::user() !== null){
            return Inertia::render('frontOffice/DishList', $props);
        } else {
            return Inertia::render('Guest/DishList', $props);
        }
    }

    public function restaurantDishes(Request $request){
        $perPage = 12;
        $restaurant = Restaurant::where('id', '=', $request->id)->first();
        $dishes = Dish::join('restaurant_dish', 'restaurant_dish.dish_id', 'dishes.id')
                                ->where('restaurant_dish.restaurant_id', $request->id)
                        ->select('dishes.*')
                        ->orderBy('dishes.dish_name')
                        ->get();
        $amountOfPages = ceil($dishes->count() / $perPage);

        $props =  [
            'restaurant' =>$restaurant,
            'dishes'=> $dishes,
            'asset' => asset('images/food'). '/',
            'defaultPic' => '/todays-special.jpg',
            'userId' => Auth::user()?->id,
            'amountOfPages' => $amountOfPages,
            'perPage' => $perPage
        ];
        if(Auth::user() !== null){
            return Inertia::render('frontOffice/RestaurantDishes', $props);
        } else {
            return Inertia::render('Guest/RestaurantDishes', $props);
        }
    }

    public function sortAndFilter(Request $request){
        if($request->filter == 0){
            $dishes = match($request->price_sort){
                'asc'=>Dish::select('id')
                ->orderBy('price', 'asc')
                ->get()->pluck('id')->toArray(), 
                'desc'=>Dish::select('id')
                ->orderBy('price', 'desc')
                ->get()->pluck('id')->toArray(),
                default => Dish::select('id')
                ->get()->pluck('id')->toArray(),
            };
        } else {

            $dishes = match($request->price_sort){
                'asc'=> Dish::whereHas('restaurants', function(Builder $query) use ($request){
                    $query->where('id', '=', $request->filter);
                })->select('dishes.id')
                ->orderBy('price', 'asc')
                ->get()->pluck('id')->toArray(), 
                'desc'=> Dish::whereHas('restaurants', function(Builder $query) use ($request){
                    $query->where('id', '=', $request->filter);
                })->select('dishes.id')
                ->orderBy('price', 'desc')
                ->get()->pluck('id')->toArray(),
                default => Dish::whereHas('restaurants', function(Builder $query) use ($request){
                    $query->where('id', '=', $request->filter);
                })->select('dishes.id')
                ->get()->pluck('id')->toArray(),
            };
        }
        // $dishes->map(function($dish){
        //     $restaurants = Restaurant::join('restaurant_dish', 'restaurant_dish.restaurant_id', 'restaurants.id')
        //                    ->select('restaurants.restaurant_name', 'restaurants.id')
        //                    ->where('restaurant_dish.dish_id', '=', $dish->id)
        //                    ->orderBy('restaurants.restaurant_name')
        //                     ->get();
        //     $dish->restaurants = $restaurants;
        //     return $dish;
        // });
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
