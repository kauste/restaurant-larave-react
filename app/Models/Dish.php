<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Restaurant;
use App\Models\Order;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Laravel\Scout\Searchable;


class Dish extends Model
{
    use HasFactory, Searchable;

    protected $hidden = ['pivot'];

    public function restaurants(){
        return $this->belongsToMany(Restaurant::class, 'restaurant_dish');
    }
    public function orders(){
        return $this->belongsToMany(Order::class, 'dish_order')
                    ->withPivot('amount');
    }

    #[SearchUsingPrefix(['dish_name'])]
    #[SearchUsingFullText(['price'])]
    public function toSearchableArray()
    {
        return [
            'dish_name' => $this->dish_name,
            'price' => $this->price,
        ];
    }
}
