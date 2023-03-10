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
                        'restaurants'=> $restaurants,
                        ]);
    }

    public function store(Request $request)
    {
        $dishData = $request->all();
        $dish = new Dish;
        $dish->dish_name = $dishData['dish_name'];
        $dish->price = $dishData['price'];

            if ($dishData['picture']) {
                $photo = $dishData['picture'];
    
                $ext = $photo->getClientOriginalExtension();
                $name = pathinfo($photo->getClientOriginalName(), PATHINFO_FILENAME);
                $file = $name. '-' . rand(100000, 999999). '.' . $ext;
    
                // $Image = Image::make($photo);
                // $Image->save(public_path().'/images/'.$file);
                $photo->move(public_path().'/images/food', $file);
                $dish->picture_path = $file; 
            }
            $dish->save();

            $restaurants = collect($dishData)->filter(function ($value, string $key) {
                return str_contains($key, 'restaurants');
            })->toArray();
            $restaurants = array_values($restaurants);
            $dish->restaurants()->attach($restaurants);
            
        return response()->json(['message'=> 'New dish is added', 'newDish' => $dish, 'restaurants' => $dish->restaurants]);
    }

    public function update(Request $request)
    {
        $dishData = $request->all();
        $dish = Dish::where('id', $dishData['id'])->first();
        $dish->dish_name = $dishData['dish_name'];
        $dish->price = $dishData['price'];
            if ($dishData['picture']) {
                $photo = $dishData['picture'];
    
                $ext = $photo->getClientOriginalExtension();
                $name = pathinfo($photo->getClientOriginalName(), PATHINFO_FILENAME);
                $file = $name. '-' . rand(100000, 999999). '.' . $ext;
    
                // $Image = Image::make($photo);
                // $Image->save(public_path().'/images/'.$file);
                $photo->move(public_path().'/images/food', $file);
                $dish->picture_path = $file; 
            }
            $dish->save();
            $restaurants = collect($dishData)->filter(function ($value, string $key) {
                return str_contains($key, 'restaurants');
            })->toArray();
            $restaurants = array_values($restaurants);
            $dish->restaurants()->detach();
            $dish->restaurants()->attach($restaurants);
            
        return response()->json(['message'=> 'Dish "' . $dish->dish_name . '" dish is edited', 'editedDish' => $dish, 'restaurants' => $dish->restaurants]);
    }

    public function destroy(Request $request)
    {
        $dish = Dish::where('id', $request->id)->first();
        $name = pathinfo($dish->picture_path, PATHINFO_FILENAME);
        $ext = pathinfo($dish->picture_path, PATHINFO_EXTENSION);
        $path = public_path('/images/food') . '/' . $name . '.' . $ext;
        
        if(file_exists($path)) {
            unlink($path);
        } 
        $dishName = $dish->dish_name;
        $dish->delete();

        return response()->json(['message' => 'Dish "'. $dishName .'" is deleted.']);
    }
}
