<?php

use Illuminate\Database\Eloquent\Collection as BaseCollection;

class ProgrammerScheduleApiController extends BaseController {

  public function getIndex()
  {
    $theArray = ProgrammerSchedule::all();
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

    $newProgrammerSchedule = new ProgrammerSchedule;
    $newProgrammerSchedule->Title = $NewModel['Title'];
    $newProgrammerSchedule->Availability = $NewModel['Availability'];
    $newProgrammerSchedule->Employee = $NewModel['Employee'];
    $newProgrammerSchedule->Start = $startDatetime->format('Y-m-d H:i:s');
    $newProgrammerSchedule->End = $endDatetime->format('Y-m-d H:i:s');
    $newProgrammerSchedule->RecurrenceId = $NewModel['RecurrenceId'];
    if (array_key_exists('RecurrenceRule',$NewModel)) {
      $newProgrammerSchedule->RecurrenceRule = $NewModel['RecurrenceRule'];
    }
    $newProgrammerSchedule->RecurrenceException = $NewModel['RecurrenceException'];

    $newProgrammerSchedule->save();

    return $newProgrammerSchedule->toJson();
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
      
      $updateProgrammerSchedule = ProgrammerSchedule::find($model['id']);
      $updateProgrammerSchedule->Title = $model['Title'];
      $updateProgrammerSchedule->Availability = $model['Availability'];
      $updateProgrammerSchedule->Start = $startDatetime->format('Y-m-d H:i:s');
      $updateProgrammerSchedule->End = $endDatetime->format('Y-m-d H:i:s');
      $updateProgrammerSchedule->Employee = $model['Employee'];
      $updateProgrammerSchedule->RecurrenceId = $model['RecurrenceId'];
      if (array_key_exists('RecurrenceRule', $model)) {
        $updateProgrammerSchedule->RecurrenceRule = $model['RecurrenceRule'];
      }
      $updateProgrammerSchedule->RecurrenceException = $model['RecurrenceException'];

      $updateProgrammerSchedule->save();

      array_push($modelArray, $updateProgrammerSchedule);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }

  public function deleteDestroy()
  {
    $modelArray = array();
    $deleteModels = Input::json('models');
    foreach ($deleteModels as $model) {
      $deleteProgrammerSchedule = ProgrammerSchedule::find($model['id']);
      $deleteProgrammerSchedule->delete();
      array_push($modelArray, $deleteProgrammerSchedule);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }
}