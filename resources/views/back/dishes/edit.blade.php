@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="card col-8 p-5">
            <div class="card-header">
                <h1>Create new dish</h1>
            </div>
            <div class="card-body">
                <form enctype="multipart/form-data" method="post" action="{{route('dish-update', $dish)}}">
                    <div class="form-row d-flex">
                        <div class="col-md-7">
                            <label for="name">Name</label>
                            <input id="name" required type="text" class="form-control" name="dish_name" value="{{$dish->dish_name}}">
                        </div>
                        <div class="col-md-2">
                            <label for="price">Price</label>
                            <input required id="price" type="number" class="form-control" name="price" value="{{$dish->price}}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-">
                            <label for="restaurant_id">Witch restaurant?</label>
                            <div class="d-block">
                
                                @foreach($restaurants as $restaurant)
                                <div>
                                    <input id="restaurant_id--{{$restaurant->id}}"type="checkbox" name="restaurant[]" value="{{$restaurant->id}}" @if(in_array($restaurant->id, $inRestaurant)) checked @endif/>
                                    <label for="restaurant_id--{{$restaurant->id}}">{{$restaurant->restaurant_name}}</label>
                                </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md">
                            <label for="picture">Add picture</label>
                            <input id="picture" type="file" name="picture">
                        </div>
                    </div>
                    <div class="form-row align-items-center d-flex">
                        @csrf
                        @method('put')
                        <button type="submit" class="btn btn-primary m-3">Edit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection