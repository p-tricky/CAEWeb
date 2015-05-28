<?php
class VendorApiController extends BaseController {
  //will return the full list of vendors
  public function index() {
    try {
      $vendorList = Vendor::all();
      //venNum will be used for css coloring 
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

  //this is called when a new vendor is added
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

  //this is called when updating a vendor
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