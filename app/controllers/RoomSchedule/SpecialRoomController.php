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

    $startDatetime = new DateTime();
    $endDatetime = new DateTime();

    $Eastern = new DateTimeZone('America/Detroit');
    $startDatetime->setTimezone($Eastern);
    $endDatetime->setTimezone($Eastern);

    $startDatetime->setTimestamp(strtotime($NewModel['Start']));
    $endDatetime->setTimestamp(strtotime($NewModel['End']));

    $newSpecialRoom = new SpecialRoom;
    $newSpecialRoom->RoomId = $NewModel['RoomId'];
    $newSpecialRoom->Title = $NewModel['Title'];
    $newSpecialRoom->Start = $startDatetime->format('Y-m-d H:i:s');
    $newSpecialRoom->End = $endDatetime->format('Y-m-d H:i:s');
    $newSpecialRoom->Attendee = $NewModel['Attendee'];
    $newSpecialRoom->Host = $NewModel['Host'];
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

      $startDatetime = new DateTime();
      $endDatetime = new DateTime();

      $Eastern = new DateTimeZone('America/Detroit');
      $startDatetime->setTimezone($Eastern);
      $endDatetime->setTimezone($Eastern);

      $startDatetime->setTimestamp(strtotime($model['Start']));
      $endDatetime->setTimestamp(strtotime($model['End']));
      
      $updateSpecialRoom = SpecialRoom::find($model['id']);
      $updateSpecialRoom->RoomId = $model['RoomId'];
      $updateSpecialRoom->Title = $model['Title'];
      $updateSpecialRoom->Start = $startDatetime->format('Y-m-d H:i:s');
      $updateSpecialRoom->End = $endDatetime->format('Y-m-d H:i:s');
      $updateSpecialRoom->Attendee = $model['Attendee'];
      $updateSpecialRoom->Host = $model['Host'];
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