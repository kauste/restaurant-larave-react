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

        if (count($roles) === 1 && in_array('user', $roles)) {
            if ($userRole != 1) {
                return redirect()->route('user-restaurants');
            }
        }
        else if (count($roles) === 1 && in_array('admin', $roles)) {
            if ($userRole != 10) {
                return redirect()->route('user-restaurants');
            }
        }

        
        return $next($request);
    }
}
