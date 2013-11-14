<?php
  
class RoomScheduleController extends BaseController {
  
  public function getIndex()
  {
    $theArray = Classroom::all();
    $jsonArray = $theArray->toJson();
    return $jsonArray;
  }

  public function postNew()
  {
    $theModels = Input::get("models");
    foreach ($theModels as $model) {
      //if ($model['id'] == 0) {
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
      //}
    }
  }

  public function putUpdate()
  {
    $theModel = Input::get("models");
    $modelId = $theModel[0]['id'];
    return $modelId;
  }

  public function deleteClassroom()
  {
    $theModel = Input::get("models");
    return json_encode($theModel);
  }

}
?>