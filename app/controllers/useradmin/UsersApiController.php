<?php
class UsersApiController extends BaseController {

  public function index() {
    $users = User::all();
    return $users->toJson();      
  }

}