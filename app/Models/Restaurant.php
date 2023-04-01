<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Dish;
use Laravel\Scout\Searchable;


class Restaurant extends Model
{
    use HasFactory, Searchable;


    public function dishes(){
        return $this->belongsToMany(Dish::class, 'restaurant_dish');
    }

    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
        ];
    }
}
