<?php

class Scans extends Eloquent {

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'virus_tracker';

  public function scansUser() {
    return ScansUser::where('user_name', '=', $this->user_name)->firstOrFail();
  }

}
