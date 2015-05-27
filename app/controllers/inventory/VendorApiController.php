<?php
class VendorApiController extends BaseController {
  public function index() {
    try {
      $vendorList = Vendor::all();
      $vendorNumber = 0;
      foreach ($vendorList as $vendor) {
        $vendor->venNum = $vendorNumber;
        $vendorNumber++;
      }
      return $vendorList->toJson();
    } catch(Exception $e) {
      return '{"error":{"text":' . $e->getMessage() . '}}';
    }
  }

  public function store() {
  	try{
  		$newVendor = new Vendor;
  		$newVendor->name = Input::get('name');
  		$newVendor->url = Input::get('url');

  		$newVendor->save();

  		return $newVendor->toJson();
  	} catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');   	
  	}
  }

  public function update($id) {
    try{
      $updateModel = Input::json()->all();

      $updateVendor = Vendor::find($id);
      $updateVendor->name = $updateModel['name'];
      $updateVendor->url = $updateModel['url'];

      $updateVendor->save();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');    
    }
  }
}