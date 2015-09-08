<?php
class VirusUserApiController extends BaseController {

  //function to get all of the scan users, sorted based on input
  public function index() {
    try {
      //get the requested sort from input, defaulting to total descending
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
      
      //returns the scan users
      return $scanUsers->toJSON();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

  //function that is called when a new scan user is created 
  public function store() {
  	try {
      //get the input for the new user
  		$addModel = Input::json()->all();

      //make a new user and then set the properties
  		$addUser = new ScansUser;
  		$addUser->user_name = $addModel['user_name'];
  		$addUser->total = $addModel['total'];
  		$addUser->last_scanned = $addModel['last_scanned'];

      //save the new user and return it 
  		$addUser->save();
  		return $addUser->toJSON();
  	} catch (Exception $e)
  	{
  		return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
  	}
  	
  }

  //function to update an existing scan user
  public function update($id) {
    try {
      //get the json input
      $updateModel = Input::json()->all();

      //find the existing scan user and set the properties from the input
      $updateUser = ScansUser::find($id);
      $updateUser->user_name = $updateModel['user_name'];
      $updateUser->total = $updateModel['total'];
      $updateUser->last_scanned = $updateModel['last_scanned'];

      //save the user
      $updateUser->save();

      //return it to Backbone
      return $updateUser->toJSON();
    }
    catch (Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  	
  }

  //function to delete a scan user
  public function destroy($id) {
    //find and delete the scan user
  	$destroyUser = ScansUser::find($id);
  	$destroyUser->delete();
    //return the user
  	return $destroyUser->toJSON();
  }

  
}
