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

    $startDatetime = new DateTime();
    $endDatetime = new DateTime();

    $Eastern = new DateTimeZone('America/Detroit');
    $startDatetime->setTimezone($Eastern);
    $endDatetime->setTimezone($Eastern);

    $startDatetime->setTimestamp(strtotime($NewModel['Start']));
    $endDatetime->setTimestamp(strtotime($NewModel['End']));

    $newBreakoutRoom = new BreakoutRoom;
    $newBreakoutRoom->RoomId = $NewModel['RoomId'];
    $newBreakoutRoom->Title = $NewModel['Title'];
    $newBreakoutRoom->Start = $startDatetime->format('Y-m-d H:i:s');
    $newBreakoutRoom->End = $endDatetime->format('Y-m-d H:i:s');
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

      $startDatetime = new DateTime();
      $endDatetime = new DateTime();

      $Eastern = new DateTimeZone('America/Detroit');
      $startDatetime->setTimezone($Eastern);
      $endDatetime->setTimezone($Eastern);

      $startDatetime->setTimestamp(strtotime($model['Start']));
      $endDatetime->setTimestamp(strtotime($model['End']));
      
      $updateBreakoutRoom = BreakoutRoom::find($model['id']);
      $updateBreakoutRoom->RoomId = $model['RoomId'];
      $updateBreakoutRoom->Title = $model['Title'];
      $updateBreakoutRoom->Start = $startDatetime->format('Y-m-d H:i:s');
      $updateBreakoutRoom->End = $endDatetime->format('Y-m-d H:i:s');
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