<?php
class ScheduleInfoApiController extends BaseController {

  public function getAdminScheduleInfo() {
    $admins = User::where('position_id', '=', '2')->get();
    return $admins->toJson();      
  }

  public function getAttendantScheduleInfo() {
    $attendants = User::where('position_id', '=', '1')->get();
    return $attendants->toJson(); 
  }

  public function getProgrammerScheduleInfo() {
    $programmers = User::where('position_id', '=', '3')->get();
    return $programmers->toJson(); 
  }

}