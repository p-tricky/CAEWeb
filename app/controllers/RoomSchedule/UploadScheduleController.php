<?php
 
use Illuminate\Database\Eloquent\Collection as BaseCollection;

class UploadScheduleController extends BaseController {
  /*
  //global variable for this class
  //excel reader
  $data = null;
  //which semester this is for
  $semester = null;
  //starting line number for each day
  $days = null;
  */

  public function fillInSchedule() {

    //require_once "../reader.php";

    // info is stored in the $_FILES array
    // upload a small file and view the uploadschedule response to see the
    // contents of $_FILES and the file
    echo '$_Files: ' . print_r($_FILES, true);

    $uploadName = $_FILES['file']['tmp_name'];
    $upload = fopen($uploadName, 'r');
    echo fread($upload, filesize($uploadName));
    fclose($upload);

    /*
    //this is the way I plan on writing the program
    //Note: psudocode. most likely improper syntax
    if ($this->data = $this->validateFile($file) == false)
      return "Error: Invalid file";
    else
    {
      $selectedSemester = $this->data->sheets[0]['cells'][1]['G'];
      $this->getSemester($selectedSemester);

      $classrooms = $this->getClassRooms();

      foreach ($this->days as $day)
      {
        foreach($classrooms as $cell => $classroom)
        {
          $this->createEvents($day, $cell, $classroom)
        }
      }
    }

    //close the file
    
    */
  }

  private function createEvents($day, $cell, $classroom)
  {
    //get class name for this event

    //create a model that can be added to the database

    //check to see if that model exists
    //if so, then add another BYDAY to it

    //Otherwise, create the RecurrenceRule and save the model
  }

  private function checkDuplicates($modelToBeAdded, $table) {
    switch($table)
    {
      case "Classrooms":
        $existingModel = Classroom::where('title', '=', $modelToBeAdded->title)->where('Start', '=', $modelToBeAdded->Start)->where('End', '=', $modelToBeAdded->End)-get();
        break;
      case "Breakout Rooms":
        $existingModel = BreakoutRoom::where('title', '=', $modelToBeAdded->title)->where('Start', '=', $modelToBeAdded->Start)->where('End', '=', $modelToBeAdded->End)-get();
        break;
      case "Computer Classrooms":
        $existingModel = ComputerClassroom::where('title', '=', $modelToBeAdded->title)->where('Start', '=', $modelToBeAdded->Start)->where('End', '=', $modelToBeAdded->End)-get();
        break;
      case "Special Rooms":
        $existingModel = SpecialRoom::where('title', '=', $modelToBeAdded->title)->where('Start', '=', $modelToBeAdded->Start)->where('End', '=', $modelToBeAdded->End)-get();
        break;
    }

    if ($existingModel != '[]')
    {
      return $existingModel;
    }
    else
    {
      return false;
    }
  }

  private function validateFile($file)
  {
    /*
    //Note: rough psudocode. improper syntax
    if (!file.endsWith ".xls")
      return false;
    else
    {
      $this->data = new Spreadsheet_Excel_Reader();
      $this->data->read($file);
      //check for header data
      //check that lab type is in 1D
      //check that semester is in 1G
      //check for days in A#
    }
    */
  }

  private function getSemester($selectedSemester)
  {
    //replaces spaces
    str_replace(' ', '', $selectedSemester);
    //converts to all lowercase. this should match the id in the database
    $selectedSemester = strtolower($selectedSemester);
    $this->semester = Semester::where('id', '=', $selectedSemester)->first();
  }

  private function getClassRooms()
  {
    //the first set of classrooms should be in 2C and continue until there is an empty cell. 
    //store the classrooms in an array and return the array
    //array should look like ['C' -> 'D-210', 'D' -> 'D-212'] where the letter is the cell letter and the data is the room number
  }
}
