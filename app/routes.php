<?php

/*
|------------------------------------------------------------------------------
| Application Routes
|------------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

//Root Route
Route::get('/', array('as' => 'home', function()
{
	return View::make('pages.tempindex');
}))->before('auth');

// ----------------------------------------------------------------------------
// Redirect Routes for short url
// ----------------------------------------------------------------------------
Route::get('roomschedule', function()
{
  return Redirect::to('roomschedule/classroom');
})->before('auth_room');

Route::get('inventory', function()
{
  return Redirect::to('inventory/currentinventory');
})->before('auth_inv');

Route::get('avlog', function()
{
  return Redirect::to('avlog/classroom');
})->before('auth_avlog');

Route::get('employee', function()
{
  return Redirect::to('employee/myhours');
})->before('auth_emp');

Route::get('useradmin', function()
{
  return Redirect::to('useradmin/userlist');
})->before('auth_useradm');

Route::get('systemadmin', function()
{
  return Redirect::to('systemadmin/openclosechecklist');
})->before('auth_emp');

Route::get('assets', function()
{
  return Redirect::to('assets/assetslist');
})->before('auth_crud_assets');

// ----------------------------------------------------------------------------
// Room schedule routes
// ----------------------------------------------------------------------------
// Routes for the tabs and views
Route::get('roomschedule/classroom', function()
{
  return View::make('layouts.roomschedule')->nest('contentTabHolder','roomschedule.classroomTab');
})->before('auth_room');

Route::get('roomschedule/computerclassroom', function()
{
  return View::make('layouts.roomschedule')->nest('contentTabHolder','roomschedule.computerclassroomTab');
})->before('auth_room');

Route::get('roomschedule/breakoutroom', function()
{
  return View::make('layouts.roomschedule')->nest('contentTabHolder','roomschedule.breakoutroomTab');
})->before('auth_room');

Route::get('roomschedule/specialroom', function()
{
  return View::make('layouts.roomschedule')->nest('contentTabHolder','roomschedule.specialroomTab');
})->before('auth_room');

Route::get('roomschedule/uploadschedule', function()
{
  return View::make('layouts.roomschedule')->nest('contentTabHolder','roomschedule.uploadscheduleTab');
})->before('auth_room');

// Routes for the API
Route::group(array('before'=>'auth_room'), function() {   
  Route::controller('classroom','ClassroomController');
  Route::controller('computerclassroom','ComputerClassroomController');
  Route::controller('specialroom','SpecialRoomController');
  Route::controller('breakoutroom','BreakoutRoomController');

  Route::post('roomschedule/uploadschedule', 'UploadScheduleController@fillInSchedule');

  Route::get('classroomlist', 'RoomListController@getClassroomList');
  Route::get('computerclassroomlist', 'RoomListController@getComputerClassroomList');
  Route::get('breakoutroomlist', 'RoomListController@getBreakoutRoomList');
  Route::get('specialroomlist', 'RoomListController@getSpecialRoomList');
  Route::get('otherroomlist', 'RoomListController@getOtherRoomList');
  Route::get('allroomlist', 'RoomListController@getAllRoomList');

  Route::get('roomschedule/api/kiosk', 'KioskApiController@getRoomSchedule');
  Route::get('roomschedule/api/getsemesters', 'UploadScheduleController@getSemesters');
  Route::get('roomschedule/api/deletesemesterevents', 'RoomListController@deleteEvents');
});


Route::get('employee/api/checklogin', 'UserPermissionsApiController@checkLogin');

// ----------------------------------------------------------------------------
// Routes for Inventory
// ----------------------------------------------------------------------------
// Routes for the tabs and views
Route::get('inventory/currentinventory', function() {
  return View::make('layouts.inventory')->nest('contentTabHolder','inventory.currentInventoryTab');
})->before('auth_inv');

Route::get('inventory/vieworders', function() {
  return View::make('layouts.inventory')->nest('contentTabHolder','inventory.viewOrdersTab');
})->before('auth_inv');

Route::get('inventory/placeorder', function() {
  return View::make('layouts.inventory')->nest('contentTabHolder','inventory.placeOrderTab');
})->before('auth_inv');

Route::get('inventory/viewlog', function() {
  return View::make('layouts.inventory')->nest('contentTabHolder','inventory.viewLogTab');
})->before('auth_inv');

Route::get('inventory/vendor', function() {
  return View::make('layouts.inventory')->nest('contentTabHolder','inventory.vendorTab');
})->before('auth_inv');


// Routes for the API
Route::group(array('before'=>'auth_inv'), function() {   
  Route::resource('inventory/api/items','InventoryApiController');
  Route::resource('inventory/api/orders','OrderApiController');
  Route::resource('inventory/api/log','LogApiController');
  Route::resource('inventory/api/vendor', 'VendorApiController');
  Route::get('inventory/api/sendemail', 'InventoryApiController@sendEmail');
});

// ----------------------------------------------------------------------------
// Routes for AVLog
// ----------------------------------------------------------------------------
// Routes for the tabs and views
Route::get('avlog/classroom', function() {
  return View::make('layouts.avlog')->nest('contentTabHolder','avlog.classroomTab');
})->before('auth_avlog');

Route::get('avlog/computerclassroom', function() {
  return View::make('layouts.avlog')->nest('contentTabHolder','avlog.computerclassroomTab');
})->before('auth_avlog');

Route::get('avlog/breakoutroom', function() {
  return View::make('layouts.avlog')->nest('contentTabHolder','avlog.breakoutroomTab');
})->before('auth_avlog');

Route::get('avlog/specialroom', function() {
  return View::make('layouts.avlog')->nest('contentTabHolder','avlog.specialroomTab');
})->before('auth_avlog');

Route::get('avlog/otherroom', function() {
  return View::make('layouts.avlog')->nest('contentTabHolder','avlog.otherroomTab');
})->before('auth_avlog');

Route::get('avlog/recentevents', function() {
  return View::make('layouts.avlog')->nest('contentTabHolder','avlog.recentEventsTab');
})->before('auth_avlog');

// Routes for the API
Route::group(array('before'=>'auth_avlog'), function() {   
  Route::resource('avlog/api/avlog','AVLogApiController');
  Route::resource('avlog/api/ceasrooms','CeasRoomListApiController');

  Route::get('avlog/api/createroom', 'RoomListController@createRoom');

  Route::get('avlog/api/recent', 'AVLogApiController@recent');
  Route::get('avlog/api/sendemail', 'AVLogApiController@sendEmail');
});

// ----------------------------------------------------------------------------
// Routes for Employee
// ----------------------------------------------------------------------------
Route::get('employee/myhours', function() {
  return View::make('layouts.employee')->nest('contentTabHolder','employee.employeeTab');
})->before('auth_emp');

Route::get('employee/adminschedule', function() {
  return View::make('layouts.employee')->nest('contentTabHolder','employee.employeeTab');
})->before('auth_emp');

Route::get('employee/attendantschedule', function() {
  return View::make('layouts.employee')->nest('contentTabHolder','employee.employeeTab');
})->before('auth_emp');

Route::get('employee/programmerschedule', function() {
  return View::make('layouts.employee')->nest('contentTabHolder','employee.employeeTab');
})->before('auth_emp');

Route::get('employee/timesheet', function() {
  return View::make('layouts.employee')->nest('contentTabHolder','employee.employeeTab');
})->before('auth_emp')->before('auth_view_timesheet');

Route::get('employee/shiftmanager', function() {
  return View::make('layouts.employee')->nest('contentTabHolder','employee.employeeTab');
})->before('auth_emp')->before('auth_crud_timesheet');

// Routes for the API
// Routes for the viewable tabs and user permissions
Route::group(array('before'=>'auth_emp'), function() {   
  Route::resource('employee/api/viewabletabs','ViewableTabsApiController');
  Route::resource('employee/api/userpermissions','UserPermissionsApiController'); 
  Route::resource('useradmin/api/userpermissions','UserPermissionsApiController');
});

// Routes for the admin, attendant, and programmer schedule
Route::group(array('before'=>'auth_emp'), function() {   
  Route::controller('employee/api/adminschedule', 'AdminScheduleApiController');
  Route::controller('employee/api/attendantschedule', 'AttendantScheduleApiController');
  Route::controller('employee/api/programmerschedule', 'ProgrammerScheduleApiController');
});

// Route for Timesheet
Route::group(array('before'=>'auth_crud_timesheet'), function() {   
  Route::controller('employee/api/timesheet', 'TimesheetApiController');

  // Route for Shift Manager
  Route::controller('employee/api/shiftmanager', 'AllShiftsApiController'); 
});

Route::group(array('before'=>'auth_emp'), function() {   
  // Routes for the admin, attendant, and programmer employee info
  Route::get('employee/api/adminscheduleinfo', 'ScheduleInfoApiController@getAdminScheduleInfo');
  Route::get('employee/api/attendantscheduleinfo', 'ScheduleInfoApiController@getAttendantScheduleInfo');
  Route::get('employee/api/programmerscheduleinfo', 'ScheduleInfoApiController@getProgrammerScheduleInfo');

  //Route for the start of the Timesheet Api by Dan Peekstok
  Route::get('employee/api/allshifts', 'TimesheetApiController@getAllShifts');
  Route::get('employee/api/username', 'TimesheetApiController@getUserName');

  // Route to get the end of the next semester. This is used to set the unitl date for new employee shifts
  Route::get('employee/api/endofnextsemester', 'ScheduleInfoApiController@getEndOfNextSemester');

  // Routes for getting all employee shifts, clocking in and out, and getting server time.
  Route::get('employee/api/payperiod', 'ShiftApiController@getPayPeriod');
  Route::get('employee/api/usershifts', 'ShiftApiController@getShifts');
  Route::get('employee/api/servertime', 'ShiftApiController@getServerTime');
  Route::put('employee/api/usershift', 'ShiftApiController@clockOut');
  Route::post('employee/api/usershift', 'ShiftApiController@clockIn');
  Route::get('employee/api/deleteshift', 'ShiftApiController@deleteShift');
  Route::get('employee/api/updateshift', 'ShiftApiController@updateShift');
  Route::get('employee/api/newshift', 'ShiftApiController@newShift');
  Route::get('employee/api/getallshifts', 'AllShiftsApiController@getShifts');
  Route::get('employee/api/endForgottenShifts', 'ShiftApiController@endForgottenShifts');
  Route::resource('employee/api/users','UsersApiController');
  Route::get('employee/api/getemails', 'UsersApiController@getEmails');
});

// ----------------------------------------------------------------------------
// Routes for User Admin
// ----------------------------------------------------------------------------
Route::get('useradmin/userlist', function() {
  return View::make('layouts.useradmin')->nest('contentTabHolder','useradmin.userlistTab');
})->before('auth_useradm');

// Routes for the API
Route::group(array('before'=>'auth_useradm'), function() {   
  Route::resource('useradmin/api/users','UsersApiController');
  Route::resource('useradmin/api/userstype','UsersTypeApiController');
});

// ----------------------------------------------------------------------------
// Routes for System Admin
// ----------------------------------------------------------------------------

Route::get('systemadmin/virustracker', function()
{
  return View::make('layouts.systemadmin')->nest('contentTabHolder','systemadmin.virusTrackerTab');
})->before('auth_sysadm');

Route::get('systemadmin/virususer', function()
{
  return View::make('layouts.systemadmin')->nest('contentTabHolder', 'systemadmin.virusUserTab');
})->before('auth_sysadm');

Route::get('systemadmin/checkoutlab', function()
{
  return View::make('layouts.systemadmin')->nest('contentTabHolder', 'systemadmin.checkoutLabTab');
})->before('auth_emp');

Route::get('systemadmin/openclosechecklist', function()
{
  return View::make('layouts.systemadmin')->nest('contentTabHolder', 'systemadmin.openCloseChecklistTab');
})->before('auth_emp');

// Routes for the api
Route::group(array('before'=>'auth_sysadm'), function() {   
  Route::resource('systemadmin/api/scans','SystemAdminApiController');
  Route::resource('systemadmin/api/scansuser', 'VirusUserApiController');
});
Route::group(array('before'=>'auth_emp'), function() {   
  Route::resource('systemadmin/api/checkoutlabs', 'CheckoutLabApiController');
  Route::resource('systemadmin/api/openclosechecklist', 'OpenCloseChecklistApiController');
});

// ----------------------------------------------------------------------------
// Routes for Asset Management 
// ----------------------------------------------------------------------------
Route::get('assets/assetslist', function() 
{
  return View::make('layouts.assets')->nest('contentTabHolder','assets.assetListTab');
})->before('auth_crud_assets');

// Routes for the API
Route::group(array('before'=>'auth_crud_assets'), function() {   
  Route::resource('assets/api/assets', 'AssetManagementApiController');
  Route::get('assets/api/departments', 'AssetManagementApiController@getDepartments');
  Route::get('assets/api/find', 'AssetManagementApiController@findAsset');
  Route::get('assets/api/createtemplate', 'AssetManagementApiController@createTemplate');
  Route::get('assets/api/getalltemplates', 'AssetManagementApiController@getAllTemplates');
  Route::get('assets/api/gettemplate', 'AssetManagementApiController@getTemplate');
});


// ----------------------------------------------------------------------------
// Routes for login/logout
// ----------------------------------------------------------------------------

Route::get('login', array('as' => 'login', function() {
	return View::make('pages.login');
 }))->before('guest');
Route::post('login', function(){
	$user = array(
		'username' => Input::get('login'),
    'password' => 'password'
	);

	if (Auth::attempt($user)) {
        return Redirect::route('home')
            ->with('flash_notice', 'You are successfully logged in.');
    }
    
    // authentication failure! lets go back to the login page
    return Redirect::route('login')
        ->with('flash_error', 'Your username/password combination was incorrect.')
        ->withInput();
});
Route::get('logout', array('as' => 'logout', function() {
	Auth::logout();

	return Redirect::route('home')
		->with('flash_notice', 'You are successfully logged out.');
}))->before('auth');
