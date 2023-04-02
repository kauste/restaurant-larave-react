<?php

namespace App\Listeners;

use App\Events\OrdersDeleted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Auth;

class ReloadOrdersPage
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\OrdersDeleted  $event
     * @return void
     */
    public function handle(OrdersDeleted $event)
    {
        dump(Auth::user());
        if(Auth::user()?->role === 10){
            dump(url()->current());
        }
        if(Auth::user()?->role === 1){
            dump('yufg');
        }
        else{
            return;
        }
    }
}
