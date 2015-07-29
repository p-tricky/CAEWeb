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

}
