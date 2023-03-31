<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Dish;
use App\Models\Resraurant;
use App\Models\ContactInfo;
use Barryvdh\DomPDF\Facade\Pdf;
use Laravel\Scout\Searchable;


class Order extends Model
{
    use HasFactory, Searchable;

    const DELIVERY_PRICE = 5;
    const STATUS = [ 1 => 'Ordered',
                     2 => 'Accepted',
                     3 => 'Delivering',
                     4 => 'Finished'];
    const DELIVERY_CHOICES = [0 => 'Self delivery',
                              1 => 'Courier delivery'];
    
    public function dishes(){
        return $this->belongsToMany(Dish::class, 'dish_order')
                    ->withPivot('amount');
    }
    public function adress(){
        return $this->hasOne(ContactInfo::class);
    }
    public function restaurant(){
        return $this->belongsTo(Restaurant::class);
    }
    public function user(){
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    #[SearchUsingPrefix(['created_at'])]
    public function toSearchableArray()
    {
        return [
            'created_at' => $this->created_at,
        ];
    }
}
