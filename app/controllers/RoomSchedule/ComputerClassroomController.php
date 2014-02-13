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

    $newComputerClassroom = new ComputerClassroom;
    $newComputerClassroom->RoomId = $NewModel['RoomId'];
    $newComputerClassroom->Title = $NewModel['Title'];
    $newComputerClassroom->Start = date('Y-m-d H:i:s',(strtotime($NewModel['Start'])-18000));
    $newComputerClassroom->End = date('Y-m-d H:i:s',(strtotime($NewModel['End'])-18000));
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
      
      $updateComputerClassroom = ComputerClassroom::find($model['id']);
      $updateComputerClassroom->RoomId = $model['RoomId'];
      $updateComputerClassroom->Title = $model['Title'];
      $updateComputerClassroom->Start = date('Y-m-d H:i:s',(strtotime($model['Start'])-18000));
      $updateComputerClassroom->End = date('Y-m-d H:i:s',(strtotime($model['End'])-18000));
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