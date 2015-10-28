<?php
class OpenCloseChecklistApiController extends BaseController {

	public function index() {
		try {
			return;
		} catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
	}

	public function store() {
		try {

		} catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
	}

	public function update($id) {
		try {

		} catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
	}

	public function destroy($id) {
		try {

		} catch(Exception $e) {
      return json_encode('{"error":{"text":' . $e->getMessage() . '}}');
    }
	}
}