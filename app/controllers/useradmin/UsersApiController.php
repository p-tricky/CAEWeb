<?php
class UsersApiController extends BaseController {
	//Fetch all the users information from the users table
  public function index() {
    $users = User::all();
    return $users->toJson();
  }

  public function store() {
    try {
      $addModel = Input::json()->all();

      $addUser = new User;
      $addUser->username = $addModel['username'];
      $addUser->fullname = UserHelper::sGetWmuName($addUser->username);
      $addUser->email = UserHelper::sGetWmuEmail($addUser->username);
      $addUser->position_id = $addModel['position_id'];
      $addUser->phone = $addModel['phone'];
      $addUser->schedule_color = $addModel['schedule_color'];
      $addUser->acc_room = $addModel['acc_room'];
      $addUser->acc_avlog = $addModel['acc_avlog'];
      $addUser->acc_inv = $addModel['acc_inv'];
      $addUser->acc_emp = $addModel['acc_emp'];
      $addUser->acc_useradm = $addModel['acc_useradm'];
      $addUser->acc_crud_timesheet = $addModel['acc_crud_timesheet'];
      $addUser->acc_crud_schedule = $addModel['acc_crud_schedule'];

      $addUser->save();
      return $addUser->toJson();

    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }
}
