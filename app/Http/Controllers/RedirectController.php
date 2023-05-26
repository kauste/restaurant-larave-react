<?php

namespace App\Http\Controllers;
use Auth;
use Illuminate\Http\Request;

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
}
