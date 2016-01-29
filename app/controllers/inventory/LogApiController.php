<?php
class LogApiController extends BaseController {
  public function index() {
    try {
      //how the collection will be sorted, defaulting to date ascending
      $sort = Input::get('sort', 'dateAsc');
      //based on the sort method, it will pull the collection with a different orderBy
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
      //adds logNum to each shift
      foreach ($logs as $log) {
        //sets the log number
        $log->logNum = $logNumber;
        //increments the log number
        $logNumber+=1;
      }

      return $logs->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  public function store() {
    try {
      $newLog = new Trans_Log;
      $newModel = Input::json()->all();
      //select the vendor name of the new selected vendor

      $newLog->itemname = $newModel['itemname'];
      $newLog->action = $newModel['action'];

      $newLog->username = Auth::user()->fullname;

      $newLog->save();

      return $newLog->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }
}
