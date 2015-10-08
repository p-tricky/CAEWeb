<?php
class UserPermissionsApiController extends BaseController {

  public function index() {
    $uHelper = new UserHelper();
    $uModel = $uHelper->getUserModel();
    return $uModel->toJson();
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

  public function checkLogin() {
    if (Auth::check())
      return "true";
    else
      return "false";
  }
}