<?php
class LogApiController extends BaseController {
  public function index() {
    try {
      $sort = Input::get('sort', 'dateAsc');
      switch ($sort) {
        case 'dateAsc': 
          $logs = Trans_Log::orderBy('updated_at')->get();
          break;
        case 'dateDes':
          $logs = Trans_Log::orderBy('updated_at', 'DESC')->get();
          break;
        case 'itemAsc':
          $logs = Trans_Log::orderBy('itemname')->orderBy('updated_at')->get();
          break;
        case 'itemDes':
          $logs = Trans_Log::orderBy('itemname', 'DESC')->orderBy('updated_at')->get();
          break;
        case 'userAsc':
          $logs = Trans_Log::orderBy('username')->orderBy('updated_at')->get();
          break;
        case 'userDes':
          $logs = Trans_Log::orderBy('username', 'DESC')->orderBy('updated_at')->get();
          break;
        case 'actionAsc':
          $logs = Trans_Log::orderBy('action')->orderBy('updated_at')->get();
          break;
        case 'actionDes': 
          $logs = Trans_Log::orderBy('action', 'DESC')->orderBy('updated_at')->get();
          break;
      }

      $logNumber = 0;
      //adds shiftNum to each shift
      foreach ($logs as $log) {
        //sets the shift number
        $log->logNum = $logNumber;
        //increments the shift number
        $logNumber+=1;
      }

      return $logs->toJson();
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