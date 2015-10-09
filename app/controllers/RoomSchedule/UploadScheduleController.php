<?php
 
use Illuminate\Database\Eloquent\Collection as BaseCollection;
require_once(base_path() . '/vendor/autoload.php'); //import Excell helper classes


class UploadScheduleController extends BaseController {

  public function fillInSchedule() {
    $response = array("nonExistantRooms" => []);
    $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
    if (!preg_match('/^(csv|xlsx?)$/im', $ext)) 
      return Response::json(array(
        'message' => "Only xls, xlsx, and csv files are accepted."
      ), 400);
    $uploadName = $_FILES['file']['tmp_name'];
    $excelReader = PHPExcel_IOFactory::createReaderForFile($uploadName);
    $excelReader->setReadDataOnly();
    $excelReader->setLoadSheetsOnly('Sheet1');
    $excelObj = $excelReader->load($uploadName);
    $spreadsheet = $excelObj->getActiveSheet()->toArray(null, true,true,true);

    $formattedArray = $this->parseSpreadsheet($spreadsheet);
    $this->createEvents($formattedArray, $response);
    
    return Response::json($response, 200);
        
  }

  // fill in database from schedule
  // $classData contains $classes
  // $classes contain $classBlocks
  // each $classBlock is the equivalent of
  //    a single class meeting.
  //    so if cs 101 meets 9-11 MWF
  //    cs 101 will have 3 class blocks,
  //    one for M, one for W, and one for F
  private function createEvents($classData, &$response)
  {
    foreach ($classData as $class=>$classBlocks)
      foreach ($classBlocks as $classBlock)
        $this->createEvent($class, $classBlock, $response);
        
  }

  private function createEvent($class, $classBlock, &$response) {
    $startDatetime = new DateTime();
    $endDatetime = new DateTime();
    
    // get the dayBefore the first and the day after the last day of the
    // semester
    $semester = $this->getSemester(null);
    $dayBeforeSemesterStart = strtotime('-1 day', strtotime($semester['start_date']));
    $dayAfterLastDayOfSemester = strtotime('+1 day', strtotime($semester['end_date']));

    // get the first day of the semester
    $firstDayOfClass = strtotime('next '. $classBlock['day'], $dayBeforeSemesterStart);
    // calculate lo
    // all the db times are 4 hours behind. not sure why
    $startDatetime->setTimestamp($firstDayOfClass + 60*(60*($classBlock['startT']['H']-4)+$classBlock['startT']['M']));
    $endDatetime->setTimestamp($firstDayOfClass + 60*(60*($classBlock['endT']['H']-4)+$classBlock['endT']['M']));

    $room = CeasRooms::where('name', '=', $classBlock['room'])->first();
    if ($room) {
      switch($room->type)
      {
      case "1":
        $newClassroom = new Classroom;
        break;
      case "2":
        $newClassroom = new ComputerClassroom;
        break;
      case "3":
        $newClassroom = new BreakoutRoom;
        break;
      case "4":
        $newClassroom = new SpecialRoom;
        break;
      default:
        return;

      }

      $newClassroom->RoomId = $room->id;
      $newClassroom->Title = $class;
      $newClassroom->Start = $startDatetime->format('Y-m-d H:i:s');
      $newClassroom->End = $endDatetime->format('Y-m-d H:i:s');
      $newClassroom->RecurrenceRule = "FREQ=WEEKLY;UNTIL=".date("Y-m-d\TH:i:s\Z", $dayAfterLastDayOfSemester).";BYDAY=".substr($classBlock['day'], 0, 2);
      $newClassroom->save();
    } else {
      if (!in_array($classBlock['room'], $response["nonExistantRooms"]))
        array_push($response["nonExistantRooms"], $classBlock['room']);
    }
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


  private function getSemester($selectedSemester)
  {
    $now = date("Y-m-d H:i:s");
    $semester = Semester::where('start_date', '<', $now)->orderBy('start_date', 'desc')->first();
    return $semester;
  }


  //
  // inputs the spreadsheet
  // returns an array formatted like so:
  //   Array
  //   (
  //       [AE4600] => Array
  //           (
  //               [0] => Array
  //                   (
  //                       [startT] => Array
  //                           (
  //                               [H] => 8
  //                               [M] => 30
  //                           )
  //                       [endT] => Array
  //                           (
  //                               [H] => 10
  //                               [M] => 30
  //                           )
  //                       [room] => C-122
  //                       [day] => MO
  //                   )
  //               [1] => Array
  //                   (
  //                       [startT] => Array
  //                           (
  //                               [H] => 8
  //                               [M] => 30
  //                           )
  //                       [endT] => Array
  //                           (
  //                               [H] => 10
  //                               [M] => 30
  //                           )
  //                       [room] => C-122
  //                       [day] => WE
  //                   )
  //               [2] => ...
  //       [ECE 3710] => ...
  // Yes, it's ugly. I'm sorry.
  //
  private function parseSpreadsheet(&$spreadSheet)
  {
    $formattedArray = array(); //return value
    // this function has some local vars:
    // $day holds current day
    // $roomList holds is an associative array where column is key and room is val
    //    array('C' => 'C-208', 'D' => 'C-220'...
    // afternoon boolean tells program whether or not to add 12 hours to time
    // startTime and endTime are assigned to every class
    $day = $roomList = $afternoon = $startTime = $endTime = false; 
    foreach ($spreadSheet as $rowNum=>$row)
    {
      if (trim($row['A']) == "skip") continue;  //skip rows where the first col is "skip"
      elseif (!$day and !$roomList) {           //if day and roomList aren't set keep looking for the header
        //header is the row with cols formatted like |<day name>|Room|<room name>|<room name>|...
        $this->setDayAndRoomList($row, $day, $roomList);  //checks to see if the row is a header, if so it sets day and roomList
      }
      else 
      // the day and roomList have been set, so lets add some classes
      {
        $this->setTimes($rowNum, $spreadSheet, $startTime, $endTime, $afternoon);  //looks in time col for current classes start and end time
        if ($startTime and $endTime) //if we found a start time and end time for this row of schedule, add classes in the row to the formatted array
        {
          foreach($roomList as $col=>$room)
          {
            $className = trim($row[$col]);
            if ($className) 
              $this->addClassInfo($className, $day, $room, $startTime, $endTime, $formattedArray);
          }
        } else { //we didn't find start time and end time for this row, so this schedule block must have ended
          $day = $roomList = $afternoon = $startTime = $endTime = false; //reset local vars
          $this->setDayAndRoomList($row, $day, $roomList); //check to see if row is header for the next block
        }
      }
    }
    return $formattedArray;
  }

  // like a lot of the parse spreadsheet functions this uses pass by reference
  // we pass the formatted class array ($cArray) by reference so that the
  // changes we make to it persist outside the scope of this function
  private function addClassInfo($cName, $cDay, $cRoom, $cStartT, $cEndT, &$cArray) 
  {
    // if we don't have an existing time block for the class, add one
    if (!isset($cArray[$cName]))
      $cArray[$cName] = [
        ['startT' => $cStartT, 
         'endT'   => $cEndT, 
         'room'   => $cRoom, 
         'day'  => $cDay]
      ];
    else {
      // we are either extending an existing class block or creating a new class
      // block entirely
      $startNewClassBlock = true;
      // cycle through all the existing  time blocks for that class
      foreach ($cArray[$cName] as &$classBlock) {
        // if the new entries startT and day matches an existing class block's endT and day, 
        if ($classBlock['endT'] == $cStartT and $classBlock['day'] == $cDay and $classBlock['room'] == $cRoom) {
          // then extend the existing class block 
          // and signal that a new class block shouldn't be created
          $classBlock['endT'] = $cEndT;
          $startNewClassBlock = false;
          break;
        }
      }
      if ($startNewClassBlock) 
        array_push($cArray[$cName], 
          ['startT' => $cStartT, 
           'endT'   => $cEndT, 
           'room'   => $cRoom, 
           'day'  => $cDay]);
    }
  }

  //pass $day and $roomList by reference so that changes persist
  //if the first 2 cells in the row match |<day name>|Room| format
  //then add the following cells to the room list
  public function setDayAndRoomList($row, &$day, &$roomList)
  {
    if (($day = $this->getDay($row['A'])) and $this->isRoom($row['B'])) {
      foreach(array_slice($row, 2) as $col=>$room) {
        if ($room == "") break;
        $roomList[$col] = $room;
      } 
    } else {
      $day = false;
      $roomList = false;
    }
  }

  // set $startTime, $endTime, and $afternoon variables for the parseSpreadsheet function
  // the $startTime and $endTime are associative arrays. 9:20 would give:
  // [ 'H' => 9, 'M' => 20 ]
  // afternoon is a boolean
  //
  // all of the class times should be in column B of the spreadsheet (row['B'])
  // the start time for the classes in the row is held in column 'B'
  // the end time is held in the next row that does not contain skip in the first col
  private function setTimes($curRowNum, &$excelSpreadsheet, &$startTime, &$endTime, &$afternoon)
  {
    $nextRowNum = $curRowNum + 1;
    // cycle through rows until we find one that does not contain "skip" in first cell
    // make sure to check that things are set isset so that we don't go off end of spreadsheet and get null errors
    while (isset($excelSpreadsheet[$nextRowNum]) and trim($excelSpreadsheet[$nextRowNum]['A']) == "skip") $nextRowNum++;
    if (isset($excelSpreadsheet[$nextRowNum])) {
      $curRowTimeCell = trim($excelSpreadsheet[$curRowNum]['B']);
      $nextRowTimeCell = trim($excelSpreadsheet[$nextRowNum]['B']);
      // check that time cells match the HH:MM format
      if (preg_match('/^\d{1,2}:\d{2}$/m', $curRowTimeCell) and preg_match('/^\d{1,2}:\d{2}$/m', $nextRowTimeCell))
      {
        $startA = explode(':', $curRowTimeCell);
        $endA = explode(':', $nextRowTimeCell);
        $startTime = ['H'=>(int)$startA[0],
                      'M'=>(int)$startA[1]];
        $endTime = ['H'=>(int)$endA[0],
          'M'=>(int)$endA[1]];
        if ($afternoon) //if afternoon is set, then we need to add 12 hrs so class times don't conflict with am classes
        {
          if ($startTime['H'] < 12) $startTime['H'] += 12;
          if ($endTime['H'] < 12) $endTime['H'] += 12;
        } elseif ($endTime['H'] < $startTime['H']) {
          $endTime['H'] += 12;
          $afternoon = true;
        }
      } else {
        // the 'B' cols didn't match the HH:MM format
        // we can assume the current schedule block has ended
        // unset variables so that parse spreadshet function knows to start
        // looking for new schedule block
        $startTime = $endTime = $afternoon = false; 
      }
    }
    // we went of the end of the spreadsheet
    else $startTime = $endTime = $afternoon = false;
  }

  // cells containing room text mark the start of the roomList
  // this function does a case insensitive match on the $room string
  // a tailing . is optional
  // some accepted $room strings are "Room", "room.", "RoOm."
  private function isRoom($room) 
  {
    $room = trim($room); //trim surrounding white space
    if (preg_match( '/^room\.?$/im', $room))
      return true;
    else
      return false;
  }

  //checks to see if column contains a day
  //acceptable formats for days are case insensitive and may have a single
  //trailing period
  //for example, some of the acceptable monday strings are:
  //  "monday."
  //  "MondAy"
  //  "MON."
  //  "mon"
  private function getDay($day) 
  {
    $day = trim($day); // trim surrounding white space
    if (preg_match( '/^mon(day)?\.?$/im', $day)) return 'Monday';
    if (preg_match( '/^tues(day)?\.?$/im', $day)) return 'Tuesday';
    if (preg_match( '/^wed(nesday)?\.?$/im', $day)) return 'Wednesday';
    if (preg_match( '/^thu(r(sday)?)?\.?$/im', $day)) return 'Thurseday';
    if (preg_match( '/^fri(day)?\.?$/im', $day)) return 'Friday';
    if (preg_match( '/^sat(urday)?\.?$/im', $day)) return 'Saturday';
    if (preg_match( '/^sun(day)?\.?$/im', $day)) return 'Sunday';
    return false;
  }

  //returns the semsters that will populate the drop down for upload schedule
  public function getSemesters() {
    $semesters = Semester::select('id')->get();
    $output = array();
    foreach ($semesters as $id => $semester) {
      if (strpos($semester, "i2") === false)
      {
        $temp = strtoupper(substr($semester['id'], 0,1)) . substr($semester['id'], 1, strlen($semester['id'])-5) . " " . substr($semester['id'], -4, 4);
        $output[$semester['id']] = $temp;
      }
      else if (strpos($semester, "ii2") === false)
      {
        $temp = strtoupper(substr($semester['id'], 0,1)) . substr($semester['id'], 1, strlen($semester['id'])-6) . " " . strtoupper(substr($semester['id'], -5, 1)) . " " . substr($semester['id'], -4, 4);
        $output[$semester['id']] = $temp;      
      }
      else
      {        
        $temp = strtoupper(substr($semester['id'], 0,1)) . substr($semester['id'], 1, strlen($semester['id'])-7) . " " . strtoupper(substr($semester['id'], -6, 2)) . " " . substr($semester['id'], -4, 4);
        $output[$semester['id']] = $temp;
      }
    }
    return json_encode($output);
  }
}
