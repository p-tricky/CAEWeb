<?php

use Illuminate\Database\Eloquent\Collection as BaseCollection;

class AttendantScheduleApiController extends BaseController {

  public function getIndex()
  {
    $theArray = AttendantSchedule::all();
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

    $newAttendantSchedule = new AttendantSchedule;
    $newAttendantSchedule->Title = $NewModel['Title'];
    $newAttendantSchedule->Availability = $NewModel['Availability'];
    $newAttendantSchedule->Employee = $NewModel['Employee'];
    $newAttendantSchedule->Start = $startDatetime->format('Y-m-d H:i:s');
    $newAttendantSchedule->End = $endDatetime->format('Y-m-d H:i:s');
    $newAttendantSchedule->RecurrenceId = $NewModel['RecurrenceId'];
    if (array_key_exists('RecurrenceRule',$NewModel)) {
      $newAttendantSchedule->RecurrenceRule = $NewModel['RecurrenceRule'];
    }
    $newAttendantSchedule->RecurrenceException = $NewModel['RecurrenceException'];

    $newAttendantSchedule->save();

    return $newAttendantSchedule->toJson();
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
      
      $updateAttendantSchedule = AttendantSchedule::find($model['id']);
      $updateAttendantSchedule->Title = $model['Title'];
      $updateAttendantSchedule->Availability = $model['Availability'];
      $updateAttendantSchedule->Start = $startDatetime->format('Y-m-d H:i:s');
      $updateAttendantSchedule->End = $endDatetime->format('Y-m-d H:i:s');
      $updateAttendantSchedule->Employee = $model['Employee'];
      $updateAttendantSchedule->RecurrenceId = $model['RecurrenceId'];
      if (array_key_exists('RecurrenceRule', $model)) {
        $updateAttendantSchedule->RecurrenceRule = $model['RecurrenceRule'];
      }
      $updateAttendantSchedule->RecurrenceException = $model['RecurrenceException'];

      $updateAttendantSchedule->save();

      array_push($modelArray, $updateAttendantSchedule);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }

  public function deleteDestroy()
  {
    $modelArray = array();
    $deleteModels = Input::json('models');
    foreach ($deleteModels as $model) {
      $deleteAttendantSchedule = AttendantSchedule::find($model['id']);
      $deleteAttendantSchedule->delete();
      array_push($modelArray, $deleteAttendantSchedule);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }
}