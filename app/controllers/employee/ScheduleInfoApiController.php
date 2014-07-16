<?php
class ScheduleInfoApiController extends BaseController {

  public function getAdminScheduleInfo() {
    $admins = User::where('position_id', '=', '2')->get();
    foreach ($admins as $admin) {
      $admin->hours = 0;
    }
    return $admins->toJson();      
  }

  public function getAttendantScheduleInfo() {
    $attendants = User::where('position_id', '=', '1')->get();
    foreach ($attendants as $attendent) {
      $attendent->hours = 0;
    }
    return $attendants->toJson(); 
  }

  public function getProgrammerScheduleInfo() {
    $programmers = User::where('position_id', '=', '3')->get();
    foreach ($programmers as $programmer) {
      $programmer->hours = 0;
    }
    return $programmers->toJson(); 
  }

}