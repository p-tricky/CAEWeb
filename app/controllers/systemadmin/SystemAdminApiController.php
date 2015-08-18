<?php
class SystemAdminApiController extends BaseController {

  public function index() {
    try {
      $scans = DB::table('virus_tracker')
        ->join('virus_users', 'virus_tracker.uid', '=', 'virus_users.id')
        ->select('virus_tracker.id', 'virus_users.id AS uid', 'virus_users.user_name', 'virus_tracker.mac_addr', 'virus_tracker.scan_date', 'virus_tracker.room_number',
                  'virus_tracker.cpu_desc', 'virus_tracker.troj_mal', 'virus_tracker.pups', 'virus_tracker.notes', 'virus_tracker.scanned_by')
        ->orderBy('scan_date')
        ->get();
      return json_encode($scans);
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  //called when adding a new user
  public function store() {
    // get all inputs
    $addModel = Input::json()->all();

    //create a new user and set attributes to inputs
    $addScan = new Scans;
    $addScan->mac_addr = $addModel['mac_addr'];
    $addScan->scan_date = $addModel['scan_date'];
    $addScan->room_number = $addModel['room_number'];
    $addScan->cpu_desc = $addModel['cpu_desc'];
    $addScan->troj_mal = $addModel['troj_mal'];
    $addScan->pups = $addModel['pups'];
    $addScan->notes = $addModel['notes'];
    $addScan->scanned_by = $addModel['scanned_by'];

    $scanUser = ScansUser::where('user_name', '=', $addModel['user_name'])->first();
    if ($scanUser == null) {
      $scanUser = new ScansUser;
      $scanUser->user_name = $addModel['user_name'];
      $scanUser->save();
    }

    $addScan->uid = $scanUser->id;
    $addScan->save();
    $scanUser->updateTotal();
    $scanUser->updateMostRecentScan();

    return $addScan->toJson();
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


      $scanUser = ScansUser::where('user_name', '=', $updateModel['user_name'])->first();
      if ($scanUser == null) {
        $scanUser = new ScansUser;
        $scanUser->user_name = $updateModel['user_name'];
        $scanUser->save();
      }
      if ($updateScan->uid != $scanUser->id) {
        $oldScanUser = $updateScan->scansUser();
        $updateScan->uid = $scanUser->id;
        $updateScan->save();

        $oldScanUser->updateTotal();
        $oldScanUser->updateMostRecentScan();
        $scanUser->updateTotal();
        $scanUser->updateMostRecentScan();
      } else {
        $updateScan->save();
        $scanUser->updateTotal();
        $scanUser->updateMostRecentScan();
      }

      //send the response
      return $updateScan->toJson();
  }

  //called when deleting a user
  public function destroy($id) {
    try {
      $deleteScan = Scans::find($id);
      $deleteScanUser = $deleteScan->scansUser();
      $deleteScan->delete();
      $deleteScanUser->updateTotal();
      $deleteScanUser->updateMostRecentScan();
      //Destroy must return the object that was destroyed for backbone to not throw an error.
      return $deleteScan->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

}
