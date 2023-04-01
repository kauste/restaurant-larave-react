<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\BackOffice\RestaurantController;
use App\Http\Controllers\BackOffice\DishController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\HomeController;

//Back
// Restaurant
Route::middleware(['auth', 'verified'], 'role:user')->group(function () {
Route::get('/restaurant-list', [RestaurantController::class, 'index'])->name('restaurant-list');
Route::post('/restaurant-store', [RestaurantController::class, 'store'])->name('restaurant-store');
Route::put('/restaurant-update', [RestaurantController::class, 'update'])->name('restaurant-update');
Route::delete('/restaurant-delete/{id?}', [RestaurantController::class, 'destroy'])->name('restaurant-delete');


//Restaurant dishes
Route::get('/back-restaurant-dishes/{restaurantId?}', [DishController::class, 'restaurantDishes'])->name('restaurant-show-dishes');
Route::put('/add-dish-to-restaurant/{restaurantId?}', [DishController::class, 'addDishToRestaurant'])->name('add-dish-to-restaurant');
Route::put('/remove-dish-from-restaurant/{restaurantId?}', [DishController::class, 'removeDishFromRestaurant'])->name('remove-dish-from-restaurant');


//Dishes
Route::get('/dish-list', [DishController::class, 'index'])->name('dish-list');
Route::get('/dish-create', [DishController::class, 'create'])->name('dish-create');
Route::post('/dish-store', [DishController::class, 'store'])->name('dish-store');
Route::put('/dish-update/{id?}', [DishController::class, 'update'])->name('dish-update');
Route::delete('/dish-delete/{id?}', [DishController::class, 'destroy'])->name('dish-delete');
Route::get('/back-search-and-filter-dish', [DishController::class, 'searchAndFilterDish'])->name('back-search-and-filter-dish');
});
// Order
Route::get('back-order', [OrderController::class, 'backIndex'])->name('back-order');
Route::put('change-status/{id?}', [OrderController::class, 'changeStatus'])->name('change-status');
Route::get('search-order-date', [OrderController::class, 'searchOrderDate'])->name('search-order-date');


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
// Route::get('/login-react', function () {
//     return Inertia::render('Auth/Login');
// })->name('login-react');

// Route::get('/dashboard', [RestaurantController::class, 'index'])->middleware(['auth', 'verified'], 'Role:admin')->name('dashboard');
// Route::get('/dashboard-user', [FrontController::class, 'index'])->middleware(['auth', 'verified'], 'Role:user')->name('dashboard-user');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// Guest and front office
Route::get('/user-restaurant-list', [FrontController::class, 'restaurants'])->name('user-restaurants');
Route::get('/restaurant-dishes/{id?}', [FrontController::class, 'restaurantDishes'])->name('restaurant-dishes');
Route::get('/user-dish-list', [FrontController::class, 'dishes'])->name('user-dishes');
Route::get('/dish-sort-and-filter', [FrontController::class, 'sortAndFilter'])->name('sort-and-filter');
Route::get('/search-dish', [FrontController::class, 'searchDish'])->name('search-dish');
//Front offce
Route::middleware(['auth', 'verified'], 'role:user')->group(function () {
Route::get('show-cart', [CartController::class, 'showCart'])->name('show-cart');
Route::post('/add-to-cart', [CartController::class, 'addToCart'])->name('user-add-to-cart');
Route::delete('/delete-cart-item/{dishId?}/{restaurantId?}', [CartController::class, 'deleteCartItem'])->name('delete-cart-item');
Route::put('/edit-cart-item/{dishId?}/{restaurantId?}', [CartController::class, 'editCartItem'])->name('edit-cart-item');
Route::delete('/delete-cart/{restaurantId?}', [CartController::class, 'deleteCart'])->name('delete-cart');
//order
Route::post('/order-store', [OrderController::class, 'store'])->name('confirm-cart');
Route::get('/show-orders', [OrderController::class, 'index'])->name('show-orders');
Route::put('/update-order-adress/{orderId?}', [OrderController::class, 'updateAdress'])->name('update-order-adress');
Route::get('/get-invoice/{orderId?}', [OrderController::class, 'getInvoice'])->name('get-invoice');
Route::delete('client-delete-order/{orderId?}', [OrderController::class, 'clientDeleteOrder'])->name('client-delete-order');
});

require __DIR__.'/auth.php';
Route::get('/home', [HomeController::class, 'index'])->name('home');