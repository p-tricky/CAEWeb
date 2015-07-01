<?php
class CeasRoomListApiController extends BaseController {

  //gets a list of all the room number based on a room type
  public function index() {
  	$rooms = CeasRoom::where('type', '=', Input::get('type'))->orderBy('name')->get();
  	$roomNumber = 0;
  	foreach ($rooms as $room) {
  		$room->roomNum = $roomNumber;
  		$roomNumber++;
  	}
    return $rooms;
  }

}