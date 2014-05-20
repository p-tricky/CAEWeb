<?php
class CeasRoomListApiController extends BaseController {

  public function index() {
    return CeasRoom::where('type', '=', Input::get('type'))->get();
  }

}