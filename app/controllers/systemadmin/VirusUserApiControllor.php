<?php
class VirusUserApiController extends BaseController {

  public function index() {
    try {
      $scanUsers = ScansUser::orderBy('total', 'DESC')->get();
      return $scanUsers->toJSON();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  public function store() {
  	try {
  		$addModel = Input::json()->all();

  		$addUser = new ScansUser;
  		$addUser->user_name = $addModel['user_name'];
  		$addUser->total = $addModel['total'];
  		$addUser->last_scanned = $addModel['last_scanned'];

  		$addUser->save();

  		return $addUser->toJSON();
  	} catch (Exception $e)
  	{
  		return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
  	}
  	
  }

  public function update($id) {
  	$updateModel = Input::json()->all();

  	$updateUser = ScansUser::find($id);
  	$updateUser->name = $updateModel['name'];
  	$updateUser->total = $updateModel['total'];
  	$updateUser->last_scanned = $updateModel['last_scanned'];

  	$updateUser->save();

  	return $updateUser->toJSON();
  }

  public function destroy($id) {
  	$destroyUser = ScansUser::find($id);
  	$destroyUser->delete();
  	return $destroyUser->toJSON();
  }

  
}
