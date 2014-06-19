<?php

use Illuminate\Database\Eloquent\Collection as BaseCollection;

class AdminScheduleApiController extends BaseController {

  public function getIndex()
  {
    $theArray = AdminSchedule::all();
    //This is some date adjustment that must be done to compensate for the time listing only
    //going up to 12:00am. The javascript side has altered the views to display 11:30pm as
    //12:30am. This date manipulation is to make sure that the dates and times are converted and
    //stored as the actual scheduled dates, and then retrieved and converted to the altered dates.

    foreach ($theArray as $sEvent) {
      $tempDate = strtotime($sEvent->Start);
      $tempDate = $tempDate - 3600;
      $sEvent->Start = date('Y-m-d H:i:s',$tempDate);
      $tempDate = strtotime($sEvent->End);
      $tempDate = $tempDate - 3600;
      $sEvent->End = date('Y-m-d H:i:s',$tempDate);
    }
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

    //The following two lines are adding an hour so that they work with the above
    //mentioned javascript date manipulation
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

    $tempDate = strtotime($newAdminSchedule->Start);
    $tempDate = $tempDate - 3600;
    $newAdminSchedule->Start = date('Y-m-d H:i:s',$tempDate);
    $tempDate = strtotime($newAdminSchedule->End);
    $tempDate = $tempDate - 3600;
    $newAdminSchedule->End = date('Y-m-d H:i:s',$tempDate);

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

      //The following two lines are adding an hour so that they work with the above
      //mentioned javascript date manipulation
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

      $tempDate = strtotime($updateAdminSchedule->Start);
      $tempDate = $tempDate - 3600;
      $updateAdminSchedule->Start = date('Y-m-d H:i:s',$tempDate);
      $tempDate = strtotime($updateAdminSchedule->End);
      $tempDate = $tempDate - 3600;
      $updateAdminSchedule->End = date('Y-m-d H:i:s',$tempDate);

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