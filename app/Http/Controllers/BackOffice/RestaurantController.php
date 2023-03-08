<?php

namespace App\Http\Controllers\BackOffice;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Restaurant;
use Carbon\Carbon;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::all();
        $restaurants->map(function($restaurant){
            $restaurant['work_starts'] = Carbon::parse($restaurant['work_starts'])->format('H:i');
            $restaurant['work_ends'] = Carbon::parse($restaurant['work_ends'])->format('H:i');
            return $restaurant;
        });
        return Inertia::render('BackOffice/RestaurantList', ['restaurants'=> $restaurants,
                                                              'storeRestaurantUrl' =>route('restaurant-store'),
                                                              'deleteRestaurantUrl' =>route('restaurant-delete'),
                                                              'updateRestaurantUrl' =>route('restaurant-update'),
                                                              'showRestaurantDishesUrl' =>route('restaurant-show-dishes')]); 
    }

    public function store(Request $request)
    {
        $restaurantData = $request->restaurantData;
        $restaurant = new Restaurant;
        $restaurant->restaurant_name = $restaurantData['restaurant_name'];
        $restaurant->city = $restaurantData['city'];
        $restaurant->adress = $restaurantData['adress'];
        $restaurant->work_starts = Carbon::parse($restaurantData['work_starts'].':00')->format('H:i');
        $restaurant->work_ends = Carbon::parse($restaurantData['work_ends'].':00')->format('H:i');
        $restaurant->save();
        return response()->json(['message'=> 'New restaurant is added',
                                 'restaurantId' => $restaurant->id]);

    }

    public function show(Restaurant $restaurant)
    {
        //
    }


    public function update(Request $request)
    {
        $forUpdate = $request->all();
        $restaurant = Restaurant::find($forUpdate['id']);
        $restaurant->restaurant_name = $forUpdate['restaurant_name'];
        $restaurant->city = $forUpdate['city'];
        $restaurant->adress = $forUpdate['adress'];
        $restaurant->work_starts = Carbon::parse($forUpdate['work_starts']);
        $restaurant->work_ends = Carbon::parse($forUpdate['work_ends']);
        $restaurant->save();
        return response()->json(['message'=> 'Restaurant is edited']);
    }

    public function destroy(Request $request)
    {
        $restaurant = Restaurant::find($request->id);
        $restaurant->delete();
        return response()->json(['message' => 'Restaurant is deleted']);
    }
}
