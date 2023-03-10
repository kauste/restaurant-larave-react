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
Route::get('/back-restaurant-dishes/{restaurant?}', [RestaurantController::class, 'showDishes'])->name('restaurant-show-dishes'); // not used yet
Route::post('/restaurant-store', [RestaurantController::class, 'store'])->name('restaurant-store');
Route::put('/restaurant-update', [RestaurantController::class, 'update'])->name('restaurant-update');
Route::delete('/restaurant-delete/{id?}', [RestaurantController::class, 'destroy'])->name('restaurant-delete');

//Dishes
Route::get('/dish-list', [DishController::class, 'index'])->name('dish-list');
Route::get('/dish-create', [DishController::class, 'create'])->name('dish-create');
Route::post('/dish-store', [DishController::class, 'store'])->name('dish-store');
Route::put('/dish-update/{id?}', [DishController::class, 'update'])->name('dish-update');
Route::delete('/dish-delete/{id?}', [DishController::class, 'destroy'])->name('dish-delete');
});
// Order
Route::get('back-order', [OrderController::class, 'backIndex'])->name('back-order');


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

//Front offce
Route::middleware(['auth', 'verified'], 'role:user')->group(function () {
//restaurant
Route::get('/user-restaurant-list', [FrontController::class, 'restaurants'])->name('user-restaurants');
Route::get('/restaurant-dishes/{id?}', [FrontController::class, 'restaurantDishes'])->name('restaurant-dishes');
//dishes
Route::get('/user-dish-list', [FrontController::class, 'dishes'])->name('user-dishes');
Route::get('/dish-sort-and-filter', [FrontController::class, 'sortAndFilter'])->name('sort-and-filter');
Route::get('/search-dish', [FrontController::class, 'searchDish'])->name('search-dish');
//cart
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

});

require __DIR__.'/auth.php';
Route::get('/home', [HomeController::class, 'index'])->name('home');