<?php
 
use Illuminate\Database\Eloquent\Collection as BaseCollection;

class KioskApiController extends BaseController {
  public function getRoomSchedule()
  {
    $NOW = new DateTime();
    $EPOCH = new DateTime('1970-01-01 00:00:00');

    $room = Input::get('room');
    $startdate = Input::get('startdate', $EPOCH->format('Y-m-d'));
    $starttime = Input::get('starttime', $EPOCH->format('H:i:s'));
    $enddate = Input::get('enddate', $NOW->format('Y-m-d'));
    $endtime = Input::get('endtime', $NOW->format('H:i:s'));
    $startTimestamp = strtotime($startdate);
    $endTimestamp = strtotime($enddate);

    $events = Classroom::all();
    $returnEvents = array();

    foreach ($events as $event) {
      if ($event->RecurrenceRule !== "") {
        $instance = $this->parseEvent($event);
        $eventsArray = $this->expandEvents($instance, $startTimestamp, $endTimestamp);
        //return json_encode($eventsArray);
        //array_push($returnEvents, $instance);
        foreach ($eventsArray as $singleEvent) {
          array_push($returnEvents, $singleEvent);
        }
      }
    }
    return json_encode($returnEvents);
  }

  private function expandEvents($event, $filterStart, $filterEnd) {
    $returnEvents = array();
    if ($event['freq'] === 'daily') {
      //Repeats Daily
      return expandDailyEvents($event, $filterStart, $filterEnd);
    } elseif ($event['freq'] === 'weekly') {
      //Repeats Weekly
      return $this->expandWeeklyEvents($event, $filterStart, $filterEnd);
    } else {
      //Every week forever
    }
  }

  private function expandDailyEvents($event, $filterStart, $filterEnd) {

  }

  private function expandWeeklyEvents($event, $filterStart, $filterEnd) {
    $dayArray = array('MO' => '1', 'TU' => '2', 'WE' => '3', 'TH' => '4', 'FR' => '5', 'SA' => '6', 'SU' => '7');
    //$dayArray = array('1' => 'MO', '2' => 'TU', '3' => 'WE', '4' => 'TH', '5' => 'FR', '6' => 'SA', '7' => 'SU');
    $current = 1;
    $eventsArray = array();
    //Determine the end date for processing
    if (isset($event['until'])) {
      if (strtotime($event['until']) > $filterEnd) {
        $end = $filterEnd;
      } else {
        $end = strtotime($event['until']);
      }
    } else {
      $end = $filterEnd;
    }

    if ($filterStart < strtotime($event['start']) || isset($event['count']) || $event['interval'] > 1) {
      $start = strtotime($event['start']);
    } else {
      $start = $filterStart;
    }

    $durationMS = strtotime($event['end']) - strtotime($event['start']);

    while ($start < $end) {
      //add event to array
      foreach ($event['weekDays'] as $eventDay) {
        if (date('N', $start) === $dayArray[$eventDay]) {

          $eventStartEndDate = date('Y-m-d', $start);
          $eventStartTime = date('H:i:s', strtotime($event['start']));
          $eventEndTime = date('H:i:s', strtotime($event['end']));
          $eventStartDateTime = date('c',strtotime($eventStartEndDate . ' ' . $eventStartTime));
          $eventEndDateTime = date('c',strtotime($eventStartEndDate . ' ' . $eventEndTime));

          if ($event['attendee'] === '1') {
            $eventType = "Class";
          } else {
            $eventType = "Event";
          }

          $eventToAdd = array('start' => $eventStartDateTime,
                              'end' => $eventEndDateTime,
                              'title' => $event['title'],
                              'roomId' => $event['roomId'],
                              'type' => $eventType,
                              'host' => $event['host']);
          array_push($eventsArray, $eventToAdd);
          $current = $current + 1;
        }
      }

      if (isset($event['count'])) {
        if ($event['count'] < $current) {
          break;
        }
      }

      //get next event
      $start = $start + 86400;
    }
    return $eventsArray;

  }



  private function parseEvent($event) {
    $instance = array();

    $rules = explode(';', $event->RecurrenceRule);

    foreach ($rules as $property) {
      $splits = explode('=', $property);
      $values = explode(',', $splits[1]);

      switch (strtoupper($splits[0])) {
        case 'FREQ':
          $instance['freq'] = strtolower($values[0]);
          break;

        case 'UNTIL':
          $until = strtotime($values[0]);
          $instance['until'] = date('Y-m-d H:i:s', $until);
          break;

        case 'COUNT':
          $instance['count'] = $values[0];
          break;

        case 'INTERVAL':
          $instance['interval'] = $values[0];
          break;

        case 'BYSECOND':
          # code...
          break;

        case 'BYMINUTE':
          # code...
          break;

        case 'BYHOUR':
          # code...
          break;

        case 'BYMONTHDAY':
          # code...
          break;

        case 'BYYEARDAY':
          # code...
          break;

        case 'BYMONTH':
          # code...
          break;

        case 'BYDAY':
          $days = array();
          foreach ($values as $day) {
            array_push($days, $day);
          }
          $instance['weekDays'] = $days;
          break;

        case 'BYSETPOS':
          # code...
          break;

        case 'BYWEEKNO':
          # code...
          break;

        case 'WKST':
          # code...
          break;

        default:
          # code...
          break;
      }
    }
    $instance['start'] = $event->Start;
    $instance['end'] = $event->End;
    $instance['roomId'] = $event->RoomId;
    $instance['title'] = $event->Title;
    $instance['attendee'] = $event->Attendee;
    $instance['host'] = $event->Host;
    return $instance;
  }
}