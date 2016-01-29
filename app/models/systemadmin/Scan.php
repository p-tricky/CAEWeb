<?php

class Scans extends Eloquent {

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'virus_tracker';

  //gets the user for the this scan
  public function getScansUserById() {
    return ScansUser::where('id', '=', $this->uid)->firstOrFail();
  } 
  
  public function save(array $options = array()) {
    parent::save($options);
    $scanUser = $this->getScansUserById();
    $scanUser->updateTotal();
    $scanUser->updateMostRecentScan();
  }

}
