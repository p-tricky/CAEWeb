<?php
class ViewableTabsApiController extends BaseController {

  public function index() {
    $tabs = array();
    $uHelper = new UserHelper();
    $uModel = $uHelper->getUserModel();
    if(is_object($uModel)) {
      if($uModel->acc_dir == 1) {
        array_push($tabs, (object)array('id'=>'1','tab'=>'myhours','name'=>'My Hours'));
      }
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