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
}