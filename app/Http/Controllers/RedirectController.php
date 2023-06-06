<?php

namespace App\Http\Controllers;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\LoginRequest;
use Illuminate\Support\Facades\Validator;

class RedirectController extends Controller
{
    public function redirect(Request $request){
        if(Auth::user()?->role === 10){
            return redirect()->route('restaurant-list');
        }
        else{
            return redirect()->route('user-restaurants');
        }
    }
    public function sendMail(Request $request){
        $validator = Validator:: make($request->all(), [
            'guestEmail' => 'required|email:rfc,dns'
        ]);
        if($validator->fails()){
            return response()->json(['error' =>$validator->errors()->first()]);
        }
        Mail::to('rugilestasionyte@gmail.com')->send(new LoginRequest($request->guestEmail));
        return response()->json(['message'=> 'Thank you for request. I will write you back as soon as possible']);
    }
}
