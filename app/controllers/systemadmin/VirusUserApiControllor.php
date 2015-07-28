<?php
class VirusUserApiController extends BaseController {

  public function index() {
    try {
      $sortBy = Input::get('sort', 'totalDesc');
      switch ($sortBy)
      {
        case "nameAsc":
          $scanUsers = ScansUser::orderBy('user_name')->get();
          break;
        case "nameDesc":
          $scanUsers = ScansUser::orderBy('user_name', 'DESC')->get();
          break;
        case "totalAsc":
          $scanUsers = ScansUser::orderBy('total')->get();
          break;
        case "totalDesc":
          $scanUsers = ScansUser::orderBy('total', 'DESC')->get();
          break;
        case "dateAsc":
          $scanUsers = ScansUser::orderBy('last_scanned')->get();
          break;
        case "dateDesc":
          $scanUsers = ScansUser::orderBy('last_scanned', 'DESC')->get();
          break;
      }
      
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
