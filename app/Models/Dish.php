<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Restaurant;
use App\Models\Order;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Dish extends Model
{
    use HasFactory;

    public function restaurants(){
        return $this->belongsToMany(Restaurant::class, 'restaurant_dish');
    }
    public function orders(){
        return $this->belongsToMany(Order::class);
    }
}
