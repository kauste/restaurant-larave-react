<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeControlle;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Restaurant
Route::middleware(['auth', 'verified'], 'role:user')->group(function () {
Route::get('/restaurant-list', [RestaurantController::class, 'index'])->name('restaurant-list');
Route::get('/restaurant-create', [RestaurantController::class, 'create'])->name('restaurant-create');
Route::post('/restaurant-store', [RestaurantController::class, 'store'])->name('restaurant-store');
Route::get('/restaurant-edit/ {restaurant}', [RestaurantController::class, 'edit'])->name('restaurant-edit');
Route::put('/restaurant-update/{restaurant}', [RestaurantController::class, 'update/{restaurant}'])->name('restaurant-update/{restaurant}');
Route::delete('/restaurant-delete/{restaurant}', [RestaurantController::class, 'destroy'])->name('restaurant-delete');

//Dishes
Route::get('/dish-list', [DishController::class, 'index'])->name('dish-list');
Route::get('/dish-create', [DishController::class, 'create'])->name('dish-create');
Route::post('/dish-store', [DishController::class, 'store'])->name('dish-store');
Route::get('/dish-edit/ {dish}', [DishController::class, 'edit'])->name('dish-edit');
Route::put('/dish-update/{dish}', [DishController::class, 'update'])->name('dish-update');
Route::delete('/dish-delete/{dish}', [DishController::class, 'destroy'])->name('dish-delete');
});


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
Route::post('/confirm-cart', [CartController::class, 'confirmCart'])->name('confirm-cart');
});

require __DIR__.'/auth.php';
Route::get('/home', [HomeController::class, 'index'])->name('home');