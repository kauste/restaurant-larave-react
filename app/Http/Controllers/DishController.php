<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Image;

class DishController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dishes = Dish::join('restaurants', 'restaurants.id', '=', 'dishes.restaurant_id')
        ->select('restaurants.*', 'dishes.*')
        ->get();
        return view('back.dishes.index', ['dishes'=> $dishes]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $restaurants = Restaurant::all();
        return view('back.dishes.create', ['restaurants'=> $restaurants]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreDishRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        foreach($request->restaurant as $restaurant_id){
            $dish = new Dish;
            $dish->dish_name = $request->dish_name;
            $dish->price = $request->price;
            $dish->restaurant_id = $restaurant_id;
            if ($request->file('picture')) {

                $photo = $request->file('picture');
    
                $ext = $photo->getClientOriginalExtension();
    
                $name = pathinfo($photo->getClientOriginalName(), PATHINFO_FILENAME);
    
                $file = $name. '-' . rand(100000, 999999). '.' . $ext;
    
                $Image = Image::make($photo);
    
                $Image->save(public_path().'/images/'.$file);
    
                // $photo->move(public_path().'/images', $file);
    
                $dish->picture_path = asset('/images') . '/' . $file;
    
            }
            $dish->save();
        }

        return redirect()-> route('dish-list')->with('message', 'New dish is added');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dish  $dish
     * @return \Illuminate\Http\Response
     */
    public function show(Dish $dish)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Dish  $dish
     * @return \Illuminate\Http\Response
     */
    public function edit(Dish $dish)
    {
        $thisDishRestaurants = Dish::where('dish_name', $dish->dish_name)->select('restaurant_id')->get();
        $inRestaurant = [];
        foreach($thisDishRestaurants as $restaurant){
            $inRestaurant[] = $restaurant->restaurant_id;
        }
        $restaurants = Restaurant::all();

        return view('back.dishes.edit', ['dish'=> $dish, 'inRestaurant'=> $inRestaurant, 'restaurants'=> $restaurants]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDishRequest  $request
     * @param  \App\Models\Dish  $dish
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Dish $dish)
    {

        if ($request->file('picture') && $dish->picture_path){
            $name = pathinfo($dish->picture_path, PATHINFO_FILENAME);
            $ext = pathinfo($dish->picture_path, PATHINFO_EXTENSION);
            dump(pathinfo($dish->picture_path, PATHINFO_FILENAME));
            $path = public_path(). '/images/'. $name . '.'. $ext ;
            if (file_exists($path)) {
                unlink($path);
            }
        }
        $dishes = Dish::where('dish_name', $dish->dish_name)->get();
        foreach($dishes as $dish){
            if(!in_array($dish->restaurant_id, $request->restaurant)){
                $dish->delete();
            }
            else{
                $photo = $request->file('picture');
                if ($request->file('picture')){
                    $ext = $photo->getClientOriginalExtension();
                    $name = pathinfo($photo->getClientOriginalName(), PATHINFO_FILENAME);
                    $file = $name. '-' . rand(100000, 999999). '.' . $ext;
                    $Image = Image::make($photo);
                    $Image->save(public_path().'/images/'.$file);
                    $dish->picture_path = asset('/images') . '/' . $file;
                }
                $dish->dish_name = $request->dish_name;
                $dish->price = $request->price;
                 $dish->save();
                $request->restaurant = array_diff($request->restaurant, [$dish->restaurant_id]);
            }
        }


        foreach($request->restaurant as $restaurant_id){
            $dish = new Dish;
            $dish->dish_name = $request->dish_name;
            $dish->price = $request->price;
            $dish->restaurant_id = $restaurant_id;
            if ($request->file('picture')) {

                $photo = $request->file('picture');
    
                $ext = $photo->getClientOriginalExtension();
    
                $name = pathinfo($photo->getClientOriginalName(), PATHINFO_FILENAME);
    
                $file = $name. '-' . rand(100000, 999999). '.' . $ext;
    
                $Image = Image::make($photo);
    
                $Image->save(public_path().'/images/'.$file);
                $dish->picture_path = asset('/images') . '/' . $file;
    
            }
            $dish->save();
        }

        return redirect()-> route('dish-list')->with('message', 'Dish is edited');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dish  $dish
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dish $dish)
    {
        $name = pathinfo($dish->picture_path, PATHINFO_FILENAME);
        $ext = pathinfo($dish->picture_path, PATHINFO_EXTENSION);
        $path = public_path('/images') . '/' . $name . '.' . $ext;

        if(file_exists($path)) {
            unlink($path);
        } 
        $dish->delete();

        return redirect()->back()->with('deleted', 'Animal have no photo now');
    }
}
