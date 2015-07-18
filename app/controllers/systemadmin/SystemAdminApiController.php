<?php
class SystemAdminApiController extends BaseController {

  public function index() {
    try {
      $scans = Scans::orderBy('scan_date')->get();
      return $scans->toJSON();
    } catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
  }

}
