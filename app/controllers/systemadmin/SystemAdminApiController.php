<?php
class SystemAdminApiController extends BaseController {

  public function index() {
    try {
      $scans = DB::table('virus_tracker')
        ->join('virus_users', 'virus_tracker.user_name', '=', 'virus_users.user_name')
        ->select('virus_tracker.id', 'virus_users.id AS uid', 'virus_tracker.user_name', 'virus_tracker.mac_addr', 'virus_tracker.scan_date', 'virus_tracker.room_number',
                  'virus_tracker.cpu_desc', 'virus_tracker.troj_mal', 'virus_tracker.pups', 'virus_tracker.notes', 'virus_tracker.scanned_by')
        ->orderBy('scan_date')
        ->get();
      return json_encode($scans);
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  //called when editting a user
  public function update($id) {
      //get the json from the request.
      $updateModel = Input::json()->all();
      
      //update the scan model based on the json data sent.
      $updateScan = Scans::find($id);
      $updateScan->mac_addr = $updateModel['mac_addr'];
      $updateScan->scan_date = $updateModel['scan_date'];
      $updateScan->room_number = $updateModel['room_number'];
      $updateScan->cpu_desc = $updateModel['cpu_desc'];
      $updateScan->troj_mal = $updateModel['troj_mal'];
      $updateScan->pups = $updateModel['pups'];
      $updateScan->notes = $updateModel['notes'];
      $updateScan->scanned_by = $updateModel['scanned_by'];
      //save the updated user to the database


      $scanUser = ScansUser::find($updateModel['uid']);
      if ($scanUser->user_name != $updateScan->user_name) {
        $oldScanUser = $updateScan->scansUser();
        $updateScan->user_name = $scanUser->user_name;
        $updateScan->save();

        $oldScanUser->updateTotal();
        $scanUser->updateTotal();
      } else {
        $updateScan->save();
        $scanUser->updateTotal();
      }

      //send the response
      return $updateScan->toJson();
  }

}
