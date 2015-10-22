<?php
class SystemAdminApiController extends BaseController {

  public function index() {
    try {
      //get all the scans and orders them by date
      $scans = Scans::orderBy('scan_date')->get();
      //sets the user name from the scan user table
      foreach ($scans as $scan) {
        $scan->user_name = ScansUser::where('id', '=', $scan->uid)->pluck('user_name');
      }
      return $scans->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  //called when adding a new scan
  public function store() {
    // get all inputs
    $addModel = Input::json()->all();

    //create a new scan and set attributes to inputs
    $addScan = new Scans;
    $addScan->mac_addr = $addModel['mac_addr'];
    $addScan->scan_date = $addModel['scan_date'];
    $addScan->room_number = $addModel['room_number'];
    $addScan->cpu_desc = $addModel['cpu_desc'];
    $addScan->troj_mal = $addModel['troj_mal'];
    $addScan->pups = $addModel['pups'];
    $addScan->notes = $addModel['notes'];
    $addScan->scanned_by = $addModel['scanned_by'];

    //if the user doesn't exist, it makes a new user
    $scanUser = ScansUser::where('user_name', '=', $addModel['user_name'])->first();
    if ($scanUser == null) {
      $scanUser = new ScansUser;
      $scanUser->user_name = $addModel['user_name'];
      $scanUser->save();
    }

    //sets the uid fof scan user
    $addScan->uid = $scanUser->id;
    $addScan->save();
    //updates the virus total for the user and the most recent scan
    $scanUser->updateTotal();
    $scanUser->updateMostRecentScan();

    //returns the scan
    return $addScan->toJson();
  }

  //called when editting a scan
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

      //if the user doesn't exist, it makes a new user. Otherwise, it gets the user for this scan
      $scanUser = ScansUser::where('user_name', '=', $updateModel['user_name'])->first();
      if ($scanUser == null) {
        $scanUser = new ScansUser;
        $scanUser->user_name = $updateModel['user_name'];
        $scanUser->save();
      }
      //if the user for the update and the old user are different, then update each one
      if ($updateScan->uid != $scanUser->id) {
        $oldScanUser = $updateScan->scansUser();
        $updateScan->uid = $scanUser->id;
        $updateScan->save();

        $oldScanUser->updateTotal();
        $oldScanUser->updateMostRecentScan();
        $scanUser->updateTotal();
        $scanUser->updateMostRecentScan();
      } else {
        //if its still the same user, just update the one person
        $updateScan->save();
        $scanUser->updateTotal();
        $scanUser->updateMostRecentScan();
      }

      //send the response
      return $updateScan->toJson();
  }

  //called when deleting a scan
  public function destroy($id) {
    try {
      //get the scan to be deleted
      $deleteScan = Scans::find($id);
      //get the scan user for this scan
      $deleteScanUser = $deleteScan->scansUser();
      //delete the scan
      $deleteScan->delete();
      //update the totals and most recent scan for the user
      $deleteScanUser->updateTotal();
      $deleteScanUser->updateMostRecentScan();
      //Destroy must return the object that was destroyed for backbone to not throw an error.
      return $deleteScan->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

}
