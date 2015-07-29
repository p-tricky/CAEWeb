<?php

class ScansUser extends Eloquent {

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'virus_users';

  public function scans() {
    return Scans::where('uid', '=', $this->id)->get();
  }

  public function updateTotal() {
    $scans = $this->scans();
    $newTotal = 0; 
    foreach ($scans as $scan) {
      $newTotal += $scan->pups + $scan->troj_mal;
    }
    $this->total = $newTotal;
    $this->save();
  }

  public function updateMostRecentScan() {
    $mostRecentScan = Scans::where('uid', '=', $this->id)->orderBy('scan_date', 'desc')->first();
    if (is_null($mostRecentScan)) $this->last_scanned = '0000-00-00';
    else $this->last_scanned = $mostRecentScan->scan_date;
    $this->save();
  }

}
