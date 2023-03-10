<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('lt_LT');
        $restaurantNames = ['Food masters', 'Food first', 'Vegan friendly', 'Lovely dinner', 'Fell for smell', 'Day treat', 'Food brothers', 'Pleasure', 'Taste good', 'Smell and taste'];
        foreach($restaurantNames as $restaurantName){
            DB::table('restaurants')-> insert([
                'restaurant_name' => $restaurantName,
                'city'=> $faker->city,
                'adress' => $faker->streetAddress,
                'work_starts'=> Carbon::parse(rand(8, 11).':00:00')->format('H:i'),
                'work_ends' => Carbon::parse(rand(18, 21).':00:00')->format('H:i'),
            ]);
        }
        $dishes = ['Egg and bacon', 'Cezar salad', 'Greek salad', 'Avocado sandwich', 'Pizza mafia', 'Four cheese pizza', 'Chilli stew', 'Grilled sandwich', 'Steak with rice', 'Beetroot gazpacho', 'Pink soup', 'Italian Pasta', 'Burger with bacon', 'Vegan beetroot burger', 'Buddha bowl', 'Grilled vegetables', 'Tomato soup', 'Pistacio Ice Cream', "Today's special", 'Milkshake'];
        foreach($dishes as $dish){
            DB::table('dishes')-> insert([
                'dish_name' => $dish,
                'price'=> rand(10, 20),
                'picture_path' => strtr(strtolower($dish), [' '=> '-', "'" => '']) . '.jpg',
            ]);
        }

        foreach ($restaurantNames as $key => $resraurantName) {
            $amountOfDishes = rand(5, count($dishes));
            $dishes_ids = collect([]);

            do{
                $dishes_ids->push(rand(1, count($dishes)));
                $dishes_ids = $dishes_ids->unique();
            }while($dishes_ids->count() != $amountOfDishes);

            foreach($dishes_ids as $dish_id){
                DB::table('restaurant_dish')->insert([
                   'restaurant_id' => ($key + 1),
                   'dish_id' => $dish_id,
                ]);
            }
        }

        DB::table('users')->insert([
            'name' => 'user',
            'email' => 'user@gmail.com',
            'password' => Hash::make('123'),
        ]);

        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123'),
            'role' => 10,
        ]);

    }
}
