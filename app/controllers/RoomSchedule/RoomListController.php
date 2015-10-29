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

    public function getOtherRoomList()
    {
        $rooms = CeasRooms::where('type', '=', '5')->orderBy('name')->get();
        return $rooms->toJson();
    }

    public function getAllRoomList() {
        $rooms = CeasRooms::orderby('name')->where('type', '<', 5)->get();
        return $rooms->toJSON();
    }

    public function deleteEvents() {
        $input = Input::all();
        $semester = Semester::find($input['semester']);
        switch ($input['roomType']) {
            case 'Classroom':
                $events = Classroom::where('Start', '>', $semester->start_date)->where('End', '<', $semester->end_date)->get();
                break;
            case 'Breakout':
                $events = BreakoutRoom::where('Start', '>', $semester->start_date)->where('End', '<', $semester->end_date)->get();
                break;
            case 'Computer':
                $events = ComputerClassroom::where('Start', '>', $semester->start_date)->where('End', '<', $semester->end_date)->get();
                break;
            case 'Special':
                $events = SpecialRoom::where('Start', '>', $semester->start_date)->where('End', '<', $semester->end_date)->get();
                break;
        }
        foreach ($events as $event) {
            $event->delete();
        }
    }

    public function createRoom() {
        $newModelName = Input::get('name');

        $existingRoom = CeasRooms::where('name', '=', $newModelName)->first();
        if ($existingRoom == null)
        {
            $newRoom = new CeasRooms;
            $newRoom->name = $newModelName;
            $newRoom->capacity = 0;
            $newRoom->type = 5;
            $newRoom->save();

            return $newRoom->toJSON();
        }
        else
            return "Room Already Exists";
    }

}