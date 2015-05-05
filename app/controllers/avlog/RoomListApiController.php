<?php
class CeasRoomListApiController extends BaseController {

  //gets a list of all the room number based on a room type
  public function index() {
    return CeasRoom::where('type', '=', Input::get('type'))->get();
  }

}