<?php
 
use Illuminate\Database\Eloquent\Collection as BaseCollection;

class BreakoutRoomController extends BaseController {
  public function getIndex()
  {
    $theArray = BreakoutRoom::all();
    $jsonArray = $theArray->toJson();
    return $jsonArray;
  }

  public function postNew()
  {
    $NewModel = Input::json('models.0');

    $newBreakoutRoom = new BreakoutRoom;
    $newBreakoutRoom->RoomId = $NewModel['RoomId'];
    $newBreakoutRoom->Title = $NewModel['Title'];
    $newBreakoutRoom->Start = date('Y-m-d H:i:s',(strtotime($NewModel['Start'])-18000));
    $newBreakoutRoom->End = date('Y-m-d H:i:s',(strtotime($NewModel['End'])-18000));
    $newBreakoutRoom->Attendee = $NewModel['Attendee'];
    $newBreakoutRoom->Host = $NewModel['Host'];
    $newBreakoutRoom->RecurrenceId = $NewModel['RecurrenceId'];
    if (array_key_exists('RecurrenceRule',$NewModel)) {
      $newBreakoutRoom->RecurrenceRule = $NewModel['RecurrenceRule'];
    }
    $newBreakoutRoom->RecurrenceException = $NewModel['RecurrenceException'];

    $newBreakoutRoom->save();

    return $newBreakoutRoom->toJson();
  }

  public function putUpdate()
  {
    $modelArray = array();
    $updateModels = Input::json('models');
    foreach ($updateModels as $model) {
      
      $updateBreakoutRoom = BreakoutRoom::find($model['id']);
      $updateBreakoutRoom->RoomId = $model['RoomId'];
      $updateBreakoutRoom->Title = $model['Title'];
      $updateBreakoutRoom->Start = date('Y-m-d H:i:s',(strtotime($model['Start'])-18000));
      $updateBreakoutRoom->End = date('Y-m-d H:i:s',(strtotime($model['End'])-18000));
      $updateBreakoutRoom->Attendee = $model['Attendee'];
      $updateBreakoutRoom->Host = $model['Host'];
      $updateBreakoutRoom->RecurrenceId = $model['RecurrenceId'];
      if (array_key_exists('RecurrenceRule', $model)) {
        $updateBreakoutRoom->RecurrenceRule = $model['RecurrenceRule'];
      }
      $updateBreakoutRoom->RecurrenceException = $model['RecurrenceException'];

      $updateBreakoutRoom->save();

      array_push($modelArray, $updateBreakoutRoom);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }

  public function deleteDestroy()
  {
    $modelArray = array();
    $deleteModels = Input::json('models');
    foreach ($deleteModels as $model) {
      $deleteBreakoutRoom = BreakoutRoom::find($model['id']);
      $deleteBreakoutRoom->delete();
      array_push($modelArray, $deleteBreakoutRoom);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }
}