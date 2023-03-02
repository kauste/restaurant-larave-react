<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    {{-- <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,500;1,400;1,500&family=The+Girl+Next+Door&display=swap" rel="stylesheet"> --}}
    <style>

    body, body *{
        padding: 0;
		vertical-align: top;
		box-sizing: border-box;
    }
    body * {
        margin: 0;
    }
    body{
        margin:72px 50px 139px 72px
    }
    h2.invoice{
        text-transform:uppercase; 
        margin-bottom:40px
    }
    .restaurant{
        font-size:25px;
        font-family: 'The Girl Next Door', cursive;
        display:inline-block;
        padding: 30px;
        font-style:italic;
    }
    .recipient-info-box{
        margin-bottom:30px;
    }
    .status{
        display:inline-block;
        float:right;
        text-transform:uppercase;
    }

    .dishes-list{
        width:100%; 
        border:black solid 2px; 
        padding: 10px;
        display:block;
    }
    .dish-headers{
        font-size:15px;
        line-height:20px;
        border-bottom:black solid 2px;
        padding: 10px;

    }
    .one-dish{
        border-bottom: 1px solid black;
        padding: 5px;
    }

    .dish-headers-item, .one-dish-item{
        display:inline-block;
        width:24%;
    }
    .prices{
        width:30%;
        margin: 20px 0 20px 70%;
    }

    </style>
</head>
<body>
    <div>
        <h2 class="invoice">Invoice {{$order->id}}</h2>
        <div class="dishes-list">
            <div>
                <div class="restaurant">"{{$order->restaurant->restaurant_name}}" restaurant</div>
                <div class="status">Status: {{$order->status_name}}</div>
            </div>
            <div class="recipient-info-box">
                <div>Recipient: {{$order->user['name']}} {{$order->user['email']}}</div>
                @if($order->adress)
                <div>{{$order->adress->street}} {{$order->adress->street_nr}}@if($order->adress->flat_nr)-{{$order->adress->flat_nr}}@endif, {{$order->adress->city}}</div>
                <div>Telephone number: {{$order->adress->telephone_number}}</div>
                @if($order->adress->message)<div>Message to courier: {{$order->adress->message}}</div>@endif
                @endif
            </div>
            <div class="dish-headers">
                <div class="dish-headers-item"><b>Dish name</b></div>
                <div class="dish-headers-item"><b>Dish price</b></div>
                <div class="dish-headers-item"><b>Amount ordered</b></div>
                <div class="dish-headers-item"><b>Total price for this dish</b></div>
            </div>
            @foreach ($order->food as $dish)
            <div class="one-dish">
                <div class="one-dish-item">{{$dish->dish_name}}</div>
                <div class="one-dish-item">{{$dish->price}} eu.</div>
                <div class="one-dish-item">{{$dish->amount}}</div>
                <div class="one-dish-item">{{$dish->allPrice}} eu.</div>
            </div>
            @endforeach
            <div class="prices">
                <div>Delivery: {{$order->delivery}}</div>
                <div>Delivery price: {{$order->delivery_price}} eu.</div>
                <div>Total price: {{$order->totalPrice}} eu.</div>
            </div>
        </div>
    </div>
</body>
</html>

