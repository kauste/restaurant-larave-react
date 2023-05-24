<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $userRole = $request->user()?->role ?? 0;
        // dump('dabar');

        // dump($roles);
        if(in_array('guest', $roles)){
            if ($userRole != 0 && $userRole != 1) {
                abort(401);
            }
        }
        else if (in_array('user', $roles)) {
            if ($userRole != 1) {
                abort(401);
            }
        }
        else if (in_array('admin', $roles)) {
            if ($userRole != 10) {
                abort(401);
            }
        }

        
        return $next($request);
    }
}
