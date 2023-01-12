@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="card">
            <div class="card-header">
                <h1>Our restaurants</h1>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Restaurant Name</th>
                            <th scope="col">City</th>
                            <th scope="col">Adress</th>
                            <th scope="col">Working Hours</th>
                            <ths cope="col">
                                </th>
                                <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($restaurants as $restaurant)
                        <tr>
                            <th scope="row">{{$restaurant->restaurant_name}}</th>
                            <td>{{$restaurant->city}}</td>
                            <td>{{$restaurant->adress}}</td>
                            <td>From {{$restaurant->work_starts}}h to {{$restaurant->work_ends}}h</td>
                            <td class="controls">
                                <a href="{{route('restaurant-edit', $restaurant)}}" class="btn btn-outline-success">EDIT</a>
                                <form method="post" action="{{route('restaurant-delete', $restaurant)}}">
                                    @csrf
                                    @method('delete')
                                    <button class="btn btn-outline-danger" type="submit">DELETE</button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
