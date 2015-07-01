<?php
 
use Illuminate\Database\Eloquent\Collection as BaseCollection;

class RoomListController extends BaseController {

    public function getClassroomList() {
        $rooms = CeasRooms::where('type', '=', '1')->orderBy('name')->get();
        return $rooms->toJson();
    }

    public function getComputerClassroomList() {
        $rooms = CeasRooms::where('type', '=', '2')->orderBy('name')->get();
        return $rooms->toJson();
    }

    public function getBreakoutRoomList() {
        $rooms = CeasRooms::where('type', '=', '3')->orderBy('name')->get();
        return $rooms->toJson();
    }

    public function getSpecialRoomList() {
        $rooms = CeasRooms::where('type', '=', '4')->orderBy('name')->get();
        return $rooms->toJson();
    }

}