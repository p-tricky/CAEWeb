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
    $NewModel = Input::json('models.0');

    $newClassroom = new Classroom;
    $newClassroom->RoomId = $NewModel['RoomId'];
    $newClassroom->Title = $NewModel['Title'];
    $newClassroom->Start = date('Y-m-d H:i:s',(strtotime($NewModel['Start'])-18000));
    $newClassroom->End = date('Y-m-d H:i:s',(strtotime($NewModel['End'])-18000));
    $newClassroom->Attendee = $NewModel['Attendee'];
    $newClassroom->RecurrenceId = $NewModel['RecurrenceId'];
    if (array_key_exists('RecurrenceRule',$NewModel)) {
      $newClassroom->RecurrenceRule = $NewModel['RecurrenceRule'];
    }
    $newClassroom->RecurrenceException = $NewModel['RecurrenceException'];

    $newClassroom->save();

    return $newClassroom->toJson();
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

  public function deleteDestroy()
  {
    $modelArray = array();
    $deleteModels = Input::get('models');
    foreach ($deleteModels as $model) {
      $deleteClassroom = Classroom::find($model['id']);
      $deleteClassroom->delete();
      array_push($modelArray, $deleteClassroom);
      $returnModels = BaseCollection::make($modelArray);
    }
    echo $returnModels->toJson();
  }

}
?>