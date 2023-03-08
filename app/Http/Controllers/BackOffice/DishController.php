<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Dish;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Image;
use Inertia\Inertia;

class DishController extends Controller
{
    public function index()
    {
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
        return Inertia::render('BackOffice/DishList', [
                        'asset' => asset('images/food') . '/',
                        'dishes'=> $dishes,
                        'defaultPic' => '/todays-special.jpg',
                        'sortAndFilterUrl' => route('sort-and-filter'),
                        'restaurantDishesUrl'=>route('restaurant-dishes'),
                        'dishStoreUrl' => route('dish-store'),
                        'searchUrl' => route('search-dish'),
                        'restaurants'=> $restaurants
                        ]);
    }

    public function store(Request $request)
    {
        $restaurantData = $request->formData;
        dump($restaurantData);
        foreach($restaurantData['restaurant'] as $restaurant_id){
            $dish = new Dish;
            $dish->dish_name = $restaurantData['dish_name'];
            $dish->price = $restaurantData['price'];
            $dish->restaurant_id = $restaurant_id;
            if ($restaurantData['picture']) {

                $photo = $restaurantData['picture'];
    
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
