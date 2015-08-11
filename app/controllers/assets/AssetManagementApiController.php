<?php
class AssetManagementApiController extends BaseController {

	public function index() 
	{
		try {
			$assets = Asset::orderby('id')->get();
			foreach ($assets as $asset) {
				$asset->department_name = Department::where('id', '=', $asset->department_id)->pluck('name');
			}
			return $assets->toJSON();

		} catch(Exception $e) {
      		return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    	}
	}

	public function store()
	{
		try {
			$newModel = Input::json()->all();

			$newAsset = new Asset;
			$newAsset->brand_name = $newModel['brand_name'];
			$newAsset->serial_number = $newModel['serial_number'];
			$newAsset->description = $newModel['description'];
			$newAsset->room = $newModel['room'];
			$newAsset->department_id = $newModel['department_id'];
			$newAsset->mac_address = $newModel['mac_address'];
			$newAsset->asset_type = $newModel['asset_type'];
			$newAsset->assignee_name = $newModel['assignee_name'];

			$newAsset->save();
			return $newAsset->toJSON();
			

		} catch(Exception $e) {
      		return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    	}
	}

	public function update($id)
	{
		try {
			$updateModel = Input::json()->all();

			$updateAsset = Asset::find($id);
			$updateAsset->brand_name = $updateModel['brand_name'];
			$updateAsset->serial_number = $updateModel['serial_number'];
			$updateAsset->description = $updateModel['description'];
			$updateAsset->room = $updateModel['room'];
			$updateAsset->department_id = $updateModel['department_id'];
			$updateAsset->mac_address = $updateModel['mac_address'];
			$updateAsset->asset_type = $updateModel['asset_type'];
			$updateAsset->assignee_name = $updateModel['assignee_name'];

			$updateAsset->save();
			return $updateAsset->toJSON();
			

		} catch(Exception $e) {
      		return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    	}
	}

	public function destroy($id)
	{
		try {
			$deleteAsset = Asset::find($id);
			$deleteAsset->delete();
			return $deleteAsset->toJSON();			

		} catch(Exception $e) {
      		return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    	}
	}

	public function getDepartments()
	{
		try {
			$departments = Department::orderby('name')->get();
			return $departments->toJSON();

		} catch(Exception $e) {
      		return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    	}
	}

}
