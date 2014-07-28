<?php
class UsersTypeApiController extends BaseController {

  public function getPositions() {
    $positions = Positions::all();
    return $positions->toJson();
  }

}