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
	// if(Auth::guest())
	// 	return Redirect::route('login');

	// Testing
	if(!Auth::check())
		return Redirect::route('login');
});


Route::filter('auth.basic', function()
{
	return Auth::basic();
});

// Assets Filter
Route::filter('auth_crud_assets', function()
{
	if(!Auth::check())
	{
		return Redirect::route('login');
	}
});
// Room Scheduling Filter
Route::filter('auth_room', function()
{
	if(!Auth::check())
	{
		return Redirect::route('login');
	}
});
// Audio/Visual Filter
Route::filter('auth_avlog', function()
{
	if(!Auth::check())
	{
		return Redirect::route('login');
	}
});
// Inventory Filter
Route::filter('auth_inv', function()
{
	if(!Auth::check())
	{
		return Redirect::route('login');
	}
});
// Employee Filter
Route::filter('auth_emp', function()
{
	if(!Auth::check())
	{
		return Redirect::route('login');
	}
});
// User Administration Filter
Route::filter('auth_useradm', function()
{
	if(!Auth::check())
	{
		return Redirect::route('login');
	}
});
// System Administration Filter
Route::filter('auth_sysadm', function()
{
	if(!Auth::check())
	{
		return Redirect::route('login');
	}
});
// CRUD Timesheet Filter
Route::filter('auth_crud_timesheet', function()
{
	if(!Auth::check())
	{
		return Redirect::route('login');
	}
});
// View Timesheet Filter
Route::filter('auth_view_timesheet', function()
{
	if(!Auth::check())
	{
		return Redirect::route('login');
	}
});
// Generate Timesheet Filter
Route::filter('auth_gen_timesheet', function()
{
	if(!Auth::check())
	{
		return Redirect::route('login');
	}
});
// CRUD Schedule Filter
Route::filter('auth_crud_schedule', function()
{
	if(!Auth::check())
	{
		return Redirect::route('login');
	}
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
		return Redirect::route('home');
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
