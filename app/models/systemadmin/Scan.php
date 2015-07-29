<?php

class Scans extends Eloquent {

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'virus_tracker';

  public function scansUser() {
    return ScansUser::where('id', '=', $this->uid)->firstOrFail();
  }

}
