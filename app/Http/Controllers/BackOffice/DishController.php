<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Dish;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Image;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Builder;


class DishController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::orderBy('restaurant_name', 'asc')->get();

        $dishes = Dish::orderByDesc('id')->get();
        $dishes->map(function($dish){
            $restaurants = Restaurant::join('restaurant_dish', 'restaurant_dish.restaurant_id', 'restaurants.id')
                           ->select('restaurants.restaurant_name', 'restaurants.id', 'restaurants.city', 'restaurants.adress')
                           ->where('restaurant_dish.dish_id', '=', $dish->id)
                            ->get()->toArray();
            $dish->restaurants = $restaurants;
            return $dish;
        });
        $perPage = 8;
        $amountOfPages = ceil($dishes->count() / $perPage);
        return Inertia::render('BackOffice/DishList', [
                        'asset' => asset('images/food') . '/',
                        'dishes'=> $dishes,
                        'defaultPic' => '/todays-special.jpg',
                        'restaurants'=> $restaurants,
                        'perPage' =>$perPage,
                        'amountOfPages' => $amountOfPages
                        ]);
    }

    public function store(Request $request)
    {
        $dishData = $request->all();

        $restaurants = collect($dishData)->filter(function ($value, string $key) {
            return str_contains($key, 'restaurants');
        })->toArray();

        $dishData['restaurants'] = $restaurants;

        $validator = Validator::make($dishData, [
            'dish_name' => 'required|min:3|max:50',
            'price' => 'required|min:0|decimal:0,2',
            'picture' => 'required|image|mimes:jpg,bmp,png',
            'restaurants' => 'nullable|array',
            'restaurants.*' => 'nullable|integer|exists:restaurants,id'
        ]);
        if($validator->fails()){
            return response()->json(['messages' => $validator->errors()->all()]);
        };

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


            $restaurants = array_values($restaurants);

            $dish->restaurants()->attach($restaurants);

            
        return response()->json(['message'=> 'New dish is added', 'newDish' => $dish, 'restaurants' => $dish->restaurants]);
    }

    public function update(Request $request)
    {
        $dishData = $request->all();

        $restaurants = collect($dishData)->filter(function ($value, string $key) {
            return str_contains($key, 'restaurants');
        })->toArray();

        $dishData['restaurants'] = $restaurants;

        $validator = Validator::make($dishData, [
            'dish_name' => 'required|min:3|max:50',
            'price' => 'required|decimal:0,2',
            'picture' => 'nullable|image|mimes:jpg,bmp,png',
            'restaurants' => 'nullable|array',
            'restaurants.*' => 'nullable|integer|exists:restaurants,id'
        ]);
        if($validator->fails()){
            return response()->json(['messages' => $validator->errors()->all()]);
        };

        $dish = Dish::where('id', $dishData['id'])->first();
        $dish->dish_name = $dishData['dish_name'];
        $dish->price = $dishData['price'];
            if ($dishData['picture']) {
                $imgToDelete = $dish->picture_path;

                $nameOfImg = pathinfo($imgToDelete, PATHINFO_FILENAME);
                $extOfImg = pathinfo($imgToDelete, PATHINFO_EXTENSION);
                $pic_path = public_path('images/food') . '/' . $nameOfImg . '.' . $extOfImg;

                if(file_exists($pic_path)){
                    unlink($pic_path);
                }

                $newImg = $dishData['picture'];
                $ext = $newImg->getClientOriginalExtension();

                $name = pathinfo($newImg->getClientOriginalName(), PATHINFO_FILENAME);
                $file = $name. '-' . rand(100000, 999999). '.' . $ext;

                $newImg->move(public_path().'/images/food', $file);
                $dish->picture_path = $file; 
            }
            $dish->save();

            $restaurants = array_values($restaurants);

            $dish->restaurants()->detach();

            $dish->restaurants()->attach($restaurants);

        return response()->json(['message'=> 'Dish "' . $dish->dish_name . '" dish is edited', 'editedDish' => $dish, 'restaurants' => $dish->restaurants]);
    }

    public function destroy(Request $request)
    {
        $dish = Dish::where('id', (int) $request->id)->first();
        $name = pathinfo($dish->picture_path, PATHINFO_FILENAME);
        $ext = pathinfo($dish->picture_path, PATHINFO_EXTENSION);
        $path = public_path('images/food') . '/' . $name . '.' . $ext;
        if(file_exists($path)) {
            unlink($path);
        } 
        $dishName = $dish->dish_name;
        $dish->delete();

        return response()->json(['message' => 'Dish "'. $dishName .'" is deleted.']);
    }

    public function restaurantDishes(Request $request)
    {
        $restaurant = Restaurant::where('id', '=', $request->restaurantId)->first();

        $involvedDishes = Dish::join('restaurant_dish', 'restaurant_dish.dish_id', 'dishes.id')
                                ->where('restaurant_dish.restaurant_id', $request->restaurantId)
                        ->select('dishes.*')
                        ->orderBy('dishes.dish_name')
                        ->get()
                        ->map(function($dish){
                            $dish->isAdded = true;
                            return $dish;
                        });
        $involvedDishesIds = $involvedDishes->pluck('id')->all();
        $notInvolvedDishes = Dish::whereNotIn('id', $involvedDishesIds)
                            ->get()
                            ->map(function($dish){
                                $dish->isAdded = false;
                                return $dish;
                            });

        $dishes = $involvedDishes->merge($notInvolvedDishes);
        $props =  [
            'restaurant' => $restaurant,
            'dishes' => $dishes,
            'asset' => asset('images/food'). '/',
            'defaultPic' => '/todays-special.jpg',
        ];
            return Inertia::render('BackOffice/RestaurantDishes', $props);

    }
    public function addDishToRestaurant(Request $request)
    {
        $data = ['restaurantId' => $request->restaurantId, 'dishId' => $request->dishId ];
        $vadidator = Validator::make($data, [
            'restaurantId' => 'required|exists:restaurants,id',
            'dishId' => 'required|exists:dishes,id'
        ])->validate();

        $dishName = Dish::where('id', $request->dishId)->select('dish_name')->first()->dish_name;

        Restaurant::where('id', $request->restaurantId)
                    ->first()
                    ->dishes()
                    ->attach($request->dishId);

        return response()->json(['message' => $dishName . ' is added to the restaurant menu.']);
    }

    public function removeDishFromRestaurant(Request $request)
    {
        $data = ['restaurantId' => $request->restaurantId, 'dishId' => $request->dishId ];
        $vadidator = Validator::make($data, [
            'restaurantId' => 'required|exists:restaurants,id',
            'dishId' => 'required|exists:dishes,id'
        ])->validate();

        $dishName = Dish::where('id', $request->dishId)->select('dish_name')->first()->dish_name;

        Restaurant::where('id', $request->restaurantId)
                    ->first()
                    ->dishes()
                    ->detach($request->dishId); // skiriasi tik situ

        return response()->json(['message' => $dishName . ' is removed from the restaurant menu.']);
    }

    public function searchAndFilterDish(Request $request) 
    {
        $data = $request->all();
        if($data['filter'] == 0) {
            if($data['search'] === null){
                $dishesIds = Dish::select('id')->get()->pluck('id')->toArray();
            }
            else{
                $searchData =  preg_split("/[\s,]*\\\"([^\\\"]+)\\\"[\s,]*|" . "[\s,]*'([^']+)'[\s,]*|" . "[\s,]+/", $data['search'], 0, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
                $dishesIds = collect($searchData)->map(function($word) {
                    $ids = Dish::search($word)
                                    ->query(fn($dish) => $dish->select('id'))
                                    ->get()->pluck('id');
                    return $ids;
                                    

                });
                $dishesIds = $dishesIds->flatten()->toArray();
            }
        }
        else {
              $restaurantDishes = Restaurant::search($data['filter'])
                                            ->query(function($restaurant){
                                                $restaurant->select('id');
                                            })
                                            ->first()
                                            ->load(['dishes' => function ($query) {
                                                $query->select('dish_id');
                                            }])->toArray();

            $restaurantDishesIds = collect($restaurantDishes['dishes'])->map(function($dish){
                unset($dish['pivot']);
                return $dish;
            })->flatten();

            if($data['search'] === null){
                $dishesIds = $restaurantDishesIds;
            }
            else{
                $searchData =  preg_split("/[\s,]*\\\"([^\\\"]+)\\\"[\s,]*|" . "[\s,]*'([^']+)'[\s,]*|" . "[\s,]+/", $data['search'], 0, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
                $searchIds = collect($searchData)->map(function($word) {
                    $ids = Dish::search($word)
                                    ->query(fn($dish) => $dish->select('id'))
                                    ->get()->pluck('id');
                    return $ids;
                                    

                });
                $searchIds = $searchIds->flatten();
                $dishesIds = array_values($searchIds->intersect($restaurantDishesIds)->toArray());
            }
        }

        return response()->json(['dishesIds' => $dishesIds]);
    }
}
