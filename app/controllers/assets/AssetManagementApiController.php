<?php
class AssetManagementApiController extends BaseController {

	//this function is used to get the full list of assets
	//it takes sort as a parameter and then returns a sorted list
	public function index() 
	{
		try {
			//gets the passed 'sort' variable
			$sortBy = Input::get('sort');
			//gets the list of assets sorted based on the input
			switch ($sortBy)
			{
				case 'brandAsc':
					$assets = Asset::where('active', '=', '1')->orderby('brand_name');
					break;
				case 'brandDesc':
					$assets = Asset::where('active', '=', '1')->orderBy('brand_name', 'DESC');
					break;
				case 'nameAsc':
					$assets = Asset::where('active', '=', '1')->orderby('assignee_name');
					break;
				case 'nameDesc':
					$assets = Asset::where('active', '=', '1')->orderby('assignee_name', 'DESC');
					break;
				case 'roomAsc':
					$assets = Asset::where('active', '=', '1')->orderby('room');
					break;
				case 'roomDesc':
					$assets = Asset::where('active', '=', '1')->orderby('room', 'DESC');
					break;
				case 'typeAsc':
					$assets = Asset::where('active', '=', '1')->orderby('asset_type');
					break;
				case 'typeDesc':
					$assets = Asset::where('active', '=', '1')->orderby('asset_type', 'DESC');
					break;
				default:
					$assets = Asset::where('active', '=', '1')->orderby('id');
					break;
			}
			
      $assets = $assets->get();
      //sets the department name for each asset
			foreach ($assets as $asset) {
				$asset->department_name = Department::where('id', '=', $asset->department_id)->pluck('name');
			}

			//if the list is sorted by the department name, it has to be sorted after giving it the names
			if ($sortBy == 'dptAsc') {
				$assets = $assets->sortBy(function($asset){
					//sorts by department name then by id
        	return $asset->department_name . $asset->id;
        });
        //this removes the indexes of each asset. Have to do this for Backbone to recognize it
        $assets->values();
			} else if ($sortBy == 'dptDesc') {
				$assets = $assets->sortBy(function($asset){
					//sorts by department name then by id
        	return $asset->department_name . $asset->id;
        });
        //Laravel 4.0 doesn't have sort by descending so this was used instead. 
        //TODO: Laravel 4.2 and on has this feature. Change it if Caeweb is ever updated to a newer version of Laravel
        $assets = $assets->reverse();
        //this removes the indexes of each asset. Have to do this for Backbone to recognize it
        $assets->values();
			}

			//returns the sorted assets list
			return $assets->toJSON();

		} catch(Exception $e) {
      		return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    	}
	}

	//this function is used to see if a new asset already exists but was soft deleted. 
	//if so, it returns the selected asset
  public function findAsset()
  {
  	//input from Backbone
    $queryParams = Input::get('queryParams');
    $foundAsset = Asset::where('serial_number', '=', $queryParams['serial_number'])
      ->where('asset_type', '=', $queryParams['asset_type'])
      ->get();
      //if found, returns the object, else it returns false
    return Response::json($foundAsset);
  }

  //function used to save a new asset
	public function store()
	{
		try {
			//gets the input from Backbone
			$newModel = Input::json()->all(); 
      
      //makes a new asset
			$newAsset = new Asset;
			//sets the properties of the new asset
			$newAsset->brand_name = $newModel['brand_name'];
			$newAsset->serial_number = $newModel['serial_number'];
			$newAsset->asset_tag = $newModel['asset_tag'];
			$newAsset->description = $newModel['description'];
			$newAsset->room = $newModel['room'];
			$newAsset->department_id = $newModel['department_id'];
			$newAsset->mac_address = $newModel['mac_address'];
			$newAsset->ip_address = $newModel['ip_address'];
			$newAsset->asset_type = $newModel['asset_type'];
			$newAsset->assignee_name = $newModel['assignee_name'];
			$newAsset->active = 1;

			//saves the asset to the Database
			$newAsset->save();
			//return the new asset
			return $newAsset->toJSON();

		} catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
	}

	//function to update an existing asset
	public function update($id)
	{
		try {
			//gets the input from Backbone
			$updateModel = Input::json()->all();

			//gets the existing asset
			$updateAsset = Asset::find($id);
			//sets the properties of the existing asset to the new properties
			$updateAsset->brand_name = $updateModel['brand_name'];
			$updateAsset->serial_number = $updateModel['serial_number'];
			$updateModel->asset_tag = $updateModel['asset_tag'];
			$updateAsset->description = $updateModel['description'];
			$updateAsset->room = $updateModel['room'];
			$updateAsset->department_id = $updateModel['department_id'];
			$updateAsset->mac_address = $updateModel['mac_address'];
			$updateAsset->ip_address = $updateModel['ip_address'];
			$updateAsset->asset_type = $updateModel['asset_type'];
			$updateAsset->assignee_name = $updateModel['assignee_name'];
			$updateAsset->active = 1;

			//saves the asset
			$updateAsset->save();
			//returns the asset to Backbone
			return $updateAsset->toJSON();
			

		} catch(Exception $e) {
      		return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
	}

	//function to delete assets. Assets used a soft delete method so deleted assets just set active to 0
	public function destroy($id)
	{
		try {
			//get the asset to be deleted
			$deleteAsset = Asset::find($id);
			//soft delete the asset
			$deleteAsset->active = 0;
      $deleteAsset->save();
      //return the deleted asset
			return $deleteAsset->toJSON();			

		} catch(Exception $e) {
      		return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    	}
	}

	//function to get a list of all the departments. This is used for the drop down when making new assets
	//since departments aren't going to be added, updated, or deleted often (if ever), we don't need a whole controller for them 
	public function getDepartments()
	{
		try {
			//gets all the departments and returns them sorted by name
			$departments = Department::orderby('name')->get();
			return $departments->toJSON();

		} catch(Exception $e) {
      		return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    	}
	}

}
