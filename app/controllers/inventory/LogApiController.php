<?php
class LogApiController extends BaseController {
  public function index() {
    try {
      $log = Trans_Log::all();

      return $log->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  public function store() {
    try {
      $newModel = Input::json()->all();
      //select the vendor name of the new selected vendor

      $newLog = new Trans_Log;
      $uHelper = new UserHelper();

      $newLog->itemname = $newModel['itemname'];
      $newLog->action = $newModel['action'];

      $newLog->username = $uHelper->getWmuName();

      $newLog->save();

      return $newLog->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }
}