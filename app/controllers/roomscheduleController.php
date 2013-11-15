<?php
 
use Illuminate\Database\Eloquent\Collection as BaseCollection;

class RoomScheduleController extends BaseController {
  
  public function getIndex()
  {
    $theArray = Classroom::all();
    $jsonArray = $theArray->toJson();
    return $jsonArray;
  }

  public function postNew()
  {
    $NewModels = Input::get("models");
    foreach ($NewModels as $model) {

      $newClassroom = new Classroom;
      $newClassroom->RoomId = $model['RoomId'];
      $newClassroom->Title = $model['Title'];
      $newClassroom->Start = date('Y-m-d H:i:s',(strtotime($model['Start'])-18000));
      $newClassroom->End = date('Y-m-d H:i:s',(strtotime($model['End'])-18000));
      $newClassroom->Attendee = $model['Attendee'];
      $newClassroom->RecurrenceId = $model['RecurrenceId'];
      $newClassroom->RecurrenceRule = $model['RecurrenceRule'];
      $newClassroom->RecurrenceException = $model['RecurrenceException'];

      $newClassroom->save();

      return $newClassroom->toJson();

    }
  }

  public function putUpdate()
  {
    $modelArray = array();
    $updateModels = Input::get("models");
    foreach ($updateModels as $model) {
      
      $updateClassroom = Classroom::find($model['id']);
      $updateClassroom->RoomId = $model['RoomId'];
      $updateClassroom->Title = $model['Title'];
      $updateClassroom->Start = date('Y-m-d H:i:s',(strtotime($model['Start'])-18000));
      $updateClassroom->End = date('Y-m-d H:i:s',(strtotime($model['End'])-18000));
      $updateClassroom->Attendee = $model['Attendee'];
      $updateClassroom->RecurrenceId = $model['RecurrenceId'];
      $updateClassroom->RecurrenceRule = $model['RecurrenceRule'];
      $updateClassroom->RecurrenceException = $model['RecurrenceException'];

      $updateClassroom->save();

      array_push($modelArray, $updateClassroom);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }

  public function deleteClassroom()
  {
    $theModel = Input::get("models");
    return json_encode($theModel);
  }

}
?>