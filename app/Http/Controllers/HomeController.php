<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    // public function index(Request $request)
    // {
    //     if($request->user()?->role == 1){
    //         return redirect()->route('user-restaurants');
    //     } 
    //     elseif($request->user()?->role == 10){

    //         // return redirect()->route(/restaurant-list);
    //         return Inertia::render('Redirect');
    //     }
    // }
}
