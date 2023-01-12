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

        foreach(range(1, 20) as $_){
            $date = Carbon::parse(rand(8, 11).':00:00')->format('H:i:s');
            DB::table('restaurants')-> insert([
                'restaurant_name' => $faker->name . ' restaurant',
                'city'=> $faker->city,
                'adress' => $faker->streetAddress,
                'work_starts'=> Carbon::parse(rand(8, 11).':00:00')->format('H:i'),
                'work_ends' => Carbon::parse(rand(18, 21).':00:00')->format('H:i'),
            ]);
        }
        foreach(range(1, 20) as $_){
            $date = Carbon::parse(rand(8, 11).':00:00')->format('H:i:s');
            DB::table('dishes')-> insert([
                'dish_name' => $faker->name . ' dish',
                'price'=> rand(10, 100),
                'restaurant_id' => rand(1, 20),
            ]);
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
