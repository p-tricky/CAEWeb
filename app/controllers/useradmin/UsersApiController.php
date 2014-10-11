<?php
class UsersApiController extends BaseController {
	//Fetch all the users information from the users table
  public function index() {
    $users = User::all();
    return $users->toJson();
  }

}