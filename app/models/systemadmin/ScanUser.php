<?php

class ScansUser extends Eloquent {

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'virus_users';

  //called by the functions below. Returns all the scans related to this user
  public function scans() {
    return Scans::where('uid', '=', $this->id)->get();
  }

  //when a new scan is entered, this updates the virus total for the user
  public function updateTotal() {
    //get the scans for this user
    $scans = $this->scans();
    //create running total
    $newTotal = 0; 
    //for each scan, add the total pups and virus to the total
    foreach ($scans as $scan) {
      $newTotal += $scan->pups + $scan->troj_mal;
    }
    //sets and saves the new total for this user
    $this->total = $newTotal;
    $this->save();
  }

  //this sets the most recent scan date for the current user
  public function updateMostRecentScan() {
    //finds the most recent scan
    $mostRecentScan = Scans::where('uid', '=', $this->id)->orderBy('scan_date', 'desc')->first();
    //if there isn't a scan, then the most recent scan doesn't exist
    if (is_null($mostRecentScan)) $this->last_scanned = '0000-00-00';
    //otherwise, it sets the date to the scan date of the scan
    else $this->last_scanned = $mostRecentScan->scan_date;
    //save the user
    $this->save();
  }

}
