<?php

namespace App\Http\Controllers\BackOffice;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Restaurant;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

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
        return Inertia::render('BackOffice/RestaurantList', ['restaurants'=> $restaurants]); 
    }

    public function store(Request $request)
    {
        $restaurantData = $request->restaurantData;

        $validator = Validator::make($restaurantData, [
            'restaurant_name' => 'required|min:3|max:50',
            'city' => 'required|min:3|max:50',
            'adress' => 'required|min:3|max:50',
            'work_starts' => 'required|date_format:format,H:i',
            'work_ends' => 'required|date_format:format,H:i',
        ]);
        if($validator->fails()){
            return response()->json(['messages' => $validator->errors()->all()]);
        };

        $restaurant = new Restaurant;
        $restaurant->restaurant_name = $restaurantData['restaurant_name'];
        $restaurant->city = $restaurantData['city'];
        $restaurant->adress = $restaurantData['adress'];
        $restaurant->work_starts = $restaurantData['work_starts'];
        $restaurant->work_ends = $restaurantData['work_ends'];
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
        $validator = Validator::make( $forUpdate, [
            'restaurant_name' => 'required|min:3|max:50',
            'city' => 'required|min:3|max:50',
            'adress' => 'required|min:3|max:50',
            'work_starts' => 'required|date_format:format,H:i',
            'work_ends' => 'required|date_format:format,H:i',
        ]);

        if($validator->fails()){
            return response()->json(['messages' => $validator->errors()->all()]);
        };

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
        $restaurant = Restaurant::find( (int) $request->id);
        $restaurant->delete();
        return response()->json(['message' => 'Restaurant is deleted']);
    }
}
