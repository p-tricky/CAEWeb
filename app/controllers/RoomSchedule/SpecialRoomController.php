<?php
 
use Illuminate\Database\Eloquent\Collection as BaseCollection;

class SpecialRoomController extends BaseController {
  public function getIndex()
  {
    $theArray = SpecialRoom::all();
    $jsonArray = $theArray->toJson();
    return $jsonArray;
  }

  public function postNew()
  {
    $NewModel = Input::json('models.0');

    $newSpecialRoom = new SpecialRoom;
    $newSpecialRoom->RoomId = $NewModel['RoomId'];
    $newSpecialRoom->Title = $NewModel['Title'];
    $newSpecialRoom->Start = date('Y-m-d H:i:s',(strtotime($NewModel['Start'])-18000));
    $newSpecialRoom->End = date('Y-m-d H:i:s',(strtotime($NewModel['End'])-18000));
    $newSpecialRoom->Attendee = $NewModel['Attendee'];
    $newSpecialRoom->RecurrenceId = $NewModel['RecurrenceId'];
    if (array_key_exists('RecurrenceRule',$NewModel)) {
      $newSpecialRoom->RecurrenceRule = $NewModel['RecurrenceRule'];
    }
    $newSpecialRoom->RecurrenceException = $NewModel['RecurrenceException'];

    $newSpecialRoom->save();

    return $newSpecialRoom->toJson();
  }

  public function putUpdate()
  {
    $modelArray = array();
    $updateModels = Input::json('models');
    foreach ($updateModels as $model) {
      
      $updateSpecialRoom = SpecialRoom::find($model['id']);
      $updateSpecialRoom->RoomId = $model['RoomId'];
      $updateSpecialRoom->Title = $model['Title'];
      $updateSpecialRoom->Start = date('Y-m-d H:i:s',(strtotime($model['Start'])-18000));
      $updateSpecialRoom->End = date('Y-m-d H:i:s',(strtotime($model['End'])-18000));
      $updateSpecialRoom->Attendee = $model['Attendee'];
      $updateSpecialRoom->RecurrenceId = $model['RecurrenceId'];
      if (array_key_exists('RecurrenceRule', $model)) {
        $updateSpecialRoom->RecurrenceRule = $model['RecurrenceRule'];
      }
      $updateSpecialRoom->RecurrenceException = $model['RecurrenceException'];

      $updateSpecialRoom->save();

      array_push($modelArray, $updateSpecialRoom);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }

  public function deleteDestroy()
  {
    $modelArray = array();
    $deleteModels = Input::json('models');
    foreach ($deleteModels as $model) {
      $deleteSpecialRoom = SpecialRoom::find($model['id']);
      $deleteSpecialRoom->delete();
      array_push($modelArray, $deleteSpecialRoom);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }  
}