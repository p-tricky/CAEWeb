<?php
class UsersApiController extends BaseController {
	//Fetch all the users information from the users table
  public function index() {
    $users = User::all();
    $userNumber = 0;
    foreach ($users as $user) {
      $user->userNum = $userNumber;
      $userNumber+=1;
    }
    return $users->toJson();
  }

  public function store() {
      $addModel = Input::json()->all();

      $addUser = new User;
      $addUser->username = $addModel['username'];
      $addUser->fullname = UserHelper::sGetWmuName($addUser->username);
      $addUser->email = UserHelper::sGetWmuEmail($addUser->username);
      $addUser->position_id = $addModel['position_id'];
      if (array_key_exists('phone', $addModel))
        $addUser->phone = UsersApiController::getAllNumbers( $addModel['phone'] );
      $addUser->schedule_color = $addModel['schedule_color'];
      $addUser->acc_room = $addModel['acc_room'];
      $addUser->acc_avlog = $addModel['acc_avlog'];
      $addUser->acc_inv = $addModel['acc_inv'];
      $addUser->acc_emp = $addModel['acc_emp'];
      $addUser->acc_useradm = $addModel['acc_useradm'];
      $addUser->acc_crud_timesheet = $addModel['acc_crud_timesheet'];
      $addUser->acc_view_timesheet = $addModel['acc_view_timesheet'];
      $addUser->acc_gen_timesheet = $addModel['acc_gen_timesheet'];
      $addUser->acc_crud_schedule = $addModel['acc_crud_schedule'];

      $addUser->save();
      return $addUser->toJson();
  }

  public function update($id) {
      //get the json from the request.
      $updateModel = Input::json()->all();
      //update the user model based on the json data sent.
      $updateUser = User::find($id);
      $updateUser->position_id = $updateModel['position_id'];
      if (array_key_exists('phone', $updateModel))
        $updateUser->phone = UsersApiController::getAllNumbers( $updateModel['phone'] );
      else $updateUser->phone = NULL;
      $updateUser->schedule_color = $updateModel['schedule_color'];
      $updateUser->acc_room = $updateModel['acc_room'];
      $updateUser->acc_avlog = $updateModel['acc_avlog'];
      $updateUser->acc_inv = $updateModel['acc_inv'];
      $updateUser->acc_emp = $updateModel['acc_emp'];
      $updateUser->acc_useradm = $updateModel['acc_useradm'];
      $updateUser->acc_crud_timesheet = $updateModel['acc_crud_timesheet'];
      $updateUser->acc_view_timesheet = $updateModel['acc_view_timesheet'];
      $updateUser->acc_gen_timesheet = $updateModel['acc_gen_timesheet'];
      $updateUser->acc_crud_schedule = $updateModel['acc_crud_schedule'];

      //save the updated user to the database
      $updateUser->save();

      //send the response
      return $updateUser->toJson();
  }

  public function destroy($id) {
    try {
      $deleteUser = User::find($id);
      $deleteUser->delete();
      //Destroy must return the object that was destroyed for backbone to not throw an error.
      return $deleteUser->toJson();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  #
  # remove javascript formatting from phone numbers
  # only selects numbers
  #
  private static function getAllNumbers($phoneNumber) {
    $nums = preg_replace('/\D+/', '', $phoneNumber);
    return $nums;
  }
}
