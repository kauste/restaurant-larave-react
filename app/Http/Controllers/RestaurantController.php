<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Restaurant;
use Carbon\Carbon;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $restaurants = Restaurant::all();
        return view('back.restaurants.index', ['restaurants'=> $restaurants]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('back.restaurants.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreRestaurantRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $restaurant = new Restaurant;
        $restaurant->restaurant_name = $request->restaurant_name;
        $restaurant->city = $request->city;
        $restaurant->adress = $request->adress;
        $restaurant->work_starts = Carbon::parse($request->work_starts.':00')->format('H:i');
        $restaurant->work_ends = Carbon::parse($request->work_ends.':00')->format('H:i');
        $restaurant->save();
        return redirect()-> route('restaurant-list')->with('message', 'New restaurant is added');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Restaurant  $restaurant
     * @return \Illuminate\Http\Response
     */
    public function show(Restaurant $restaurant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Restaurant  $restaurant
     * @return \Illuminate\Http\Response
     */
    public function edit(Restaurant $restaurant)
    {
        return view('back.restaurants.edit', ['restaurant'=> $restaurant]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRestaurantRequest  $request
     * @param  \App\Models\Restaurant  $restaurant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        $restaurant->restaurant_name = $request->restaurant_name;
        $restaurant->city = $request->city;
        $restaurant->adress = $request->adress;
        $restaurant->work_starts = Carbon::parse($request->work_starts.':00')->format('H:i');
        $restaurant->work_ends = Carbon::parse($request->work_ends.':00')->format('H:i');
        $restaurant->save();
        return redirect()-> route('restaurant-list')->with('message', 'New restaurant is edited');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Restaurant  $restaurant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();
        return redirect()-> back()-> with('message', 'Restaurant is deleted');
    }
}
