<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function($request)
{
	//
});


App::after(function($request, $response)
{
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function()
{
	if(Auth::guest())
		return Redirect::route('login');
});


Route::filter('auth.basic', function()
{
	return Auth::basic();
});

// Directory Filter
Route::filter('auth_dir', function()
{
	if(Auth::guest() || (Auth::user()->acc_dir == 0))
		return Redirect::route('login');
});
// Room Scheduling Filter
Route::filter('auth_room', function()
{
	if(Auth::guest() || (Auth::user()->acc_room == 0))
		return Redirect::route('login');
});
// Audio/Visual Filter
Route::filter('auth_audio', function()
{
	if(Auth::guest() || (Auth::user()->acc_audio == 0))
		return Redirect::route('login');
});
// Inventory Filter
Route::filter('auth_inv', function()
{
	if(Auth::guest() || (Auth::user()->acc_inv == 0))
		return Redirect::route('login');
});
// Employee Filter
Route::filter('auth_emp', function()
{
	if(Auth::guest() || (Auth::user()->acc_emp == 0))
		return Redirect::route('login');
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (Auth::check()) 
		return Redirect::route('home')
				->with('flash_notice', 'You are alredy logged in!');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	if (Session::token() != Input::get('_token'))
	{
		throw new Illuminate\Session\TokenMismatchException;
	}
});