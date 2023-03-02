<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Restaurant;
use App\Models\Dish;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurant_dish', function (Blueprint $table) {
            $table->foreignIdFor(Restaurant::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Dish::class)->constrained()->cascadeOnDelete();
            $table->primary(['restaurant_id', 'dish_id']);
            $table->index('restaurant_id');
            $table->index('dish_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('restaurant_dish');
    }
};
