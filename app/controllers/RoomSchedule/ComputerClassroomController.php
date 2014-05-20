<?php
 
use Illuminate\Database\Eloquent\Collection as BaseCollection;

class ComputerClassroomController extends BaseController {
  public function getIndex()
  {
    $theArray = ComputerClassroom::all();
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

    $newComputerClassroom = new ComputerClassroom;
    $newComputerClassroom->RoomId = $NewModel['RoomId'];
    $newComputerClassroom->Title = $NewModel['Title'];
    $newComputerClassroom->Start = $startDatetime->format('Y-m-d H:i:s');
    $newComputerClassroom->End = $endDatetime->format('Y-m-d H:i:s');
    $newComputerClassroom->Attendee = $NewModel['Attendee'];
    $newComputerClassroom->Host = $NewModel['Host'];
    $newComputerClassroom->RecurrenceId = $NewModel['RecurrenceId'];
    if (array_key_exists('RecurrenceRule',$NewModel)) {
      $newComputerClassroom->RecurrenceRule = $NewModel['RecurrenceRule'];
    }
    $newComputerClassroom->RecurrenceException = $NewModel['RecurrenceException'];

    $newComputerClassroom->save();

    return $newComputerClassroom->toJson();
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
      
      $updateComputerClassroom = ComputerClassroom::find($model['id']);
      $updateComputerClassroom->RoomId = $model['RoomId'];
      $updateComputerClassroom->Title = $model['Title'];
      $updateComputerClassroom->Start = $startDatetime->format('Y-m-d H:i:s');
      $updateComputerClassroom->End = $endDatetime->format('Y-m-d H:i:s');
      $updateComputerClassroom->Attendee = $model['Attendee'];
      $updateComputerClassroom->Host = $model['Host'];
      $updateComputerClassroom->RecurrenceId = $model['RecurrenceId'];
      if (array_key_exists('RecurrenceRule', $model)) {
        $updateComputerClassroom->RecurrenceRule = $model['RecurrenceRule'];
      }
      $updateComputerClassroom->RecurrenceException = $model['RecurrenceException'];

      $updateComputerClassroom->save();

      array_push($modelArray, $updateComputerClassroom);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }

  public function deleteDestroy()
  {
    $modelArray = array();
    $deleteModels = Input::json('models');
    foreach ($deleteModels as $model) {
      $deleteComputerClassroom = ComputerClassroom::find($model['id']);
      $deleteComputerClassroom->delete();
      array_push($modelArray, $deleteComputerClassroom);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }
}