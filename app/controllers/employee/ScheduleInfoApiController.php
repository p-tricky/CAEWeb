<?php
class ScheduleInfoApiController extends BaseController {

  public function getAdminScheduleInfo() {
    $admins = User::where('position_id', '=', '2')->get();
    return $admins->toJson();      
  }

  public function getAttendentScheduleInfo() {
    //
  }

  public function getProgrammerScheduleInfo() {
    //
  }

}