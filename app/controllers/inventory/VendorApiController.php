<?php
class VendorApiController extends BaseController {
  public function getVendors() {
    try {
      $vendorList = Vendor::all();
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
}