<?php
class ScheduleInfoApiController extends BaseController {

  public function getAdminScheduleInfo() {
    $admins = User::where('position_id', '=', '2')->get();
    foreach ($admins as $admin) {
      $admin->hours = '00:00';
    }
    return $admins->toJson();      
  }

  public function getAttendantScheduleInfo() {
    $attendants = User::where('position_id', '=', '1')->get();
    foreach ($attendants as $attendent) {
      $attendent->hours = '00:00';
    }
    return $attendants->toJson(); 
  }

  public function getProgrammerScheduleInfo() {
    $programmers = User::where('position_id', '=', '3')->get();
    foreach ($programmers as $programmer) {
      $programmer->hours = '00:00';
    }
    return $programmers->toJson(); 
  }

  public function getEndOfNextSemester() {
    $now = date('Y-m-d H:i:s',time());
    $result = DB::table('semester_start')->where('start_date', '>', $now)->orderBy('start_date')->take('1')->get();
    return json_encode($result[0]->end_date);
  }

}