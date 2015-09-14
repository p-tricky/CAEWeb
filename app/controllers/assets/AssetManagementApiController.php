<?php
class AssetManagementApiController extends BaseController {

	public function index() 
	{
		try {
			$sortBy = Input::get('sort');
			switch ($sortBy)
			{
				case 'brandAsc':
					$assets = Asset::orderby('brand_name');
					break;
				case 'brandDesc':
					$assets = Asset::orderBy('brand_name', 'DESC');
					break;
				case 'nameAsc':
					$assets = Asset::orderby('assignee_name');
					break;
				case 'nameDesc':
					$assets = Asset::orderby('assignee_name', 'DESC');
					break;
				case 'roomAsc':
					$assets = Asset::orderby('room');
					break;
				case 'roomDesc':
					$assets = Asset::orderby('room', 'DESC');
					break;
				case 'typeAsc':
					$assets = Asset::orderby('asset_type');
					break;
				case 'typeDesc':
					$assets = Asset::orderby('asset_type', 'DESC');
					break;
				default:
					$assets = Asset::orderby('id');
					break;

			}
			
      $assets = $assets->where('active', '=', '1')->get();
			foreach ($assets as $asset) {
				$asset->department_name = Department::where('id', '=', $asset->department_id)->pluck('name');
			}

			if ($sortBy == 'dptAsc') {
				$assets = $assets->sortBy(function($asset){
        	return $asset->department_name . $asset->id;
        });
        $assets->values();
			} else if ($sortBy == 'dptDesc') {
				$assets = $assets->sortBy(function($asset){
        	return $asset->department_name . $asset->id;
        });
        $assets = $assets->reverse();
        $assets->values();
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
      
      $inactiveAsset = Asset::where('serial_number', '=', $newModel['serial_number'])
        ->where('asset_type', '=', $newModel['asset_type'])
        ->get();

      if (!$inactiveAsset->isEmpty()) {
        return Response::json(array('error' => 'Asset already exists', 
          'inactiveAsset' => $inactiveAsset->toArray()), 500);
      }

			$newAsset = new Asset;
			$newAsset->brand_name = $newModel['brand_name'];
			$newAsset->serial_number = $newModel['serial_number'];
			$newAsset->description = $newModel['description'];
			$newAsset->room = $newModel['room'];
			$newAsset->department_id = $newModel['department_id'];
			$newAsset->mac_address = $newModel['mac_address'];
			$newAsset->ip_address = $newModel['ip_address'];
			$newAsset->asset_type = $newModel['asset_type'];
			$newAsset->assignee_name = $newModel['assignee_name'];
			$newAsset->active = 1;


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
			$updateAsset->ip_address = $updateModel['ip_address'];
			$updateAsset->asset_type = $updateModel['asset_type'];
			$updateAsset->assignee_name = $updateModel['assignee_name'];
			$updateAsset->active = 1;

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
			$deleteAsset->active = 0;
      $deleteAsset->save();
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
