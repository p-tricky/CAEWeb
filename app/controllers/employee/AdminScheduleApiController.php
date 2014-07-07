<?php

use Illuminate\Database\Eloquent\Collection as BaseCollection;

class AdminScheduleApiController extends BaseController {

  public function getIndex()
  {
    $theArray = AdminSchedule::all();
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

    $newAdminSchedule = new AdminSchedule;
    $newAdminSchedule->Title = $NewModel['Title'];
    $newAdminSchedule->Availability = $NewModel['Availability'];
    $newAdminSchedule->Employee = $NewModel['Employee'];
    $newAdminSchedule->Start = $startDatetime->format('Y-m-d H:i:s');
    $newAdminSchedule->End = $endDatetime->format('Y-m-d H:i:s');
    $newAdminSchedule->RecurrenceId = $NewModel['RecurrenceId'];
    if (array_key_exists('RecurrenceRule',$NewModel)) {
      $newAdminSchedule->RecurrenceRule = $NewModel['RecurrenceRule'];
    }
    $newAdminSchedule->RecurrenceException = $NewModel['RecurrenceException'];

    $newAdminSchedule->save();

    return $newAdminSchedule->toJson();
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
      
      $updateAdminSchedule = AdminSchedule::find($model['id']);
      $updateAdminSchedule->Title = $model['Title'];
      $updateAdminSchedule->Availability = $model['Availability'];
      $updateAdminSchedule->Start = $startDatetime->format('Y-m-d H:i:s');
      $updateAdminSchedule->End = $endDatetime->format('Y-m-d H:i:s');
      $updateAdminSchedule->Employee = $model['Employee'];
      $updateAdminSchedule->RecurrenceId = $model['RecurrenceId'];
      if (array_key_exists('RecurrenceRule', $model)) {
        $updateAdminSchedule->RecurrenceRule = $model['RecurrenceRule'];
      }
      $updateAdminSchedule->RecurrenceException = $model['RecurrenceException'];

      $updateAdminSchedule->save();

      array_push($modelArray, $updateAdminSchedule);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }

  public function deleteDestroy()
  {
    $modelArray = array();
    $deleteModels = Input::json('models');
    foreach ($deleteModels as $model) {
      $deleteAdminSchedule = AdminSchedule::find($model['id']);
      $deleteAdminSchedule->delete();
      array_push($modelArray, $deleteAdminSchedule);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }
}