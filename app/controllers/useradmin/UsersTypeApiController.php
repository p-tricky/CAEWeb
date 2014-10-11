<?php
class UsersTypeApiController extends BaseController {
	//Fetch id and position_name from the positions table
  public function getPositions() {
    $positions = Positions::all();
    return $positions->toJson();
  }

}