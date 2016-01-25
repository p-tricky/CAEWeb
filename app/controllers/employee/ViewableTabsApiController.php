<?php
class ViewableTabsApiController extends BaseController {

  public function index() {
    $tabs = array();
      if(Auth::user()->acc_emp == '1') {
        array_push($tabs, (object)array('id'=>'1','tab'=>'myhours','name'=>'My Hours'));
        array_push($tabs, (object)array('id'=>'2','tab'=>'adminschedule','name'=>'Admin Schedule'));
        array_push($tabs, (object)array('id'=>'3','tab'=>'attendantschedule','name'=>'Attendant Schedule'));
        array_push($tabs, (object)array('id'=>'4','tab'=>'programmerschedule','name'=>'Programmer Schedule'));
      }
      if (Auth::user()->acc_view_timesheet == '1') {
        array_push($tabs, (object)array('id'=>'5','tab'=>'timesheet','name'=>'Timesheet'));
      }
      if (Auth::user()->acc_crud_timesheet == '1') {
        array_push($tabs, (object)array('id'=>'6','tab'=>'shiftmanager','name'=>'Shift Manager'));
      }
    return json_encode($tabs);
      
  }

  public function store() {
    //stub for creates. Should not be needed.
  }

  public function update($id) {
    //stub for updates. Should not be needed.
  }

  public function destroy($id) {
    //stub for deletes. Should not be needed.
  }
}
