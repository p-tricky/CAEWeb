<?php
class ScheduleInfoApiController extends BaseController {

  public function getAdminScheduleInfo() {
    $admins = User::where('position_id', '=', '2')->get();
    return $admins->toJson();      
  }

  public function getAttendentScheduleInfo() {
    $admins = User::where('position_id', '=', '1')->get();
    return $admins->toJson(); 
  }

  public function getProgrammerScheduleInfo() {
    $admins = User::where('position_id', '=', '3')->get();
    return $admins->toJson(); 
  }

}