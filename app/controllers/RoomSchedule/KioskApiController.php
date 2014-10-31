<?php
 
use Illuminate\Database\Eloquent\Collection as BaseCollection;

class KioskApiController extends BaseController {
  public function getRoomSchedule()
  {
    $NOW = new DateTime();
    $EPOCH = new DateTime('1970-01-01 00:00:00');

    $room = Input::get('room');
    $startdate = Input::get('startdate', $EPOCH->format('Y-m-d H:i:s'));
    //$starttime = Input::get('starttime', $EPOCH->format('H:i:s'));
    $enddate = Input::get('enddate', $NOW->format('Y-m-d H:i:s'));
    //$endtime = Input::get('endtime', $NOW->format('H:i:s'));
    $roomNumber = Input::get('room', 'all');

    $jsonpCallback = Input::get('callback', '');

    $startTimestamp = strtotime($startdate);
    $endTimestamp = strtotime($enddate);

    if ($roomNumber === 'all') {
      $events = Classroom::all();
    } else {
      $events = $this->getEventsForRoom($roomNumber);
    }
    $returnEvents = array();

    foreach ($events as $event) {
      if ($event->RecurrenceRule !== "") {
        $instance = $this->parseEvent($event);
        $eventsArray = $this->expandEvents($instance, $startTimestamp, $endTimestamp);

        foreach ($eventsArray as $singleEvent) {
          array_push($returnEvents, $singleEvent);
        }
      } else {
        if ($startTimestamp <= strtotime($event->Start) && $endTimestamp >= strtotime($event->End)) {
          $nonRecurEvent = $this->formatEvent($event);
          array_push($returnEvents, $nonRecurEvent);
        }
      }
    }

    //Check to see if the result should be jsonp
    if ($jsonpCallback !== '') {
      return Response::json($returnEvents)->setCallback($jsonpCallback);
    } else {
      return json_encode($returnEvents);
    }
  }

  private function getEventsForRoom($roomNumber) {
    $roomInfo = CeasRooms::where('name', '=', $roomNumber)->first();
    if ($roomInfo !== null) {
      switch($roomInfo->type) {
        case 1:
        $events = Classroom::where('RoomId', '=', $roomInfo->id)->get();
        break;

        case 2:
        $events = ComputerClassroom::where('RoomId', '=', $roomInfo->id)->get();
        break;

        case 3:
        $events = BreakoutRoom::where('RoomId', '=', $roomInfo->id)->get();
        break;

        case 4:
        $events = SpecialRoom::where('RoomId', '=', $roomInfo->id)->get();
        break;

        default:
        $events = array();
        break;
      }
      return $events;
    } else {
      return array();
    }
  }

  private function formatEvent($event) {
    $eventType = $this->getEventType($event->Attendee);
    return array('start' => $event->Start,
                  'end' => $event->End,
                  'title' => $event->Title,
                  'roomId' => $event->RoomId,
                  'type' => $eventType,
                  'host' => $event->Host);
  }

  private function expandEvents($event, $filterStart, $filterEnd) {
    $returnEvents = array();
    if ($event['freq'] === 'daily') {
      //Repeats Daily
      return $this->expandDailyEvents($event, $filterStart, $filterEnd);
    } elseif ($event['freq'] === 'weekly') {
      //Repeats Weekly
      return $this->expandWeeklyEvents($event, $filterStart, $filterEnd);
    } else {
      //Should never get here. If so event won't be in result.
    }
  }

  private function expandDailyEvents($event, $filterStart, $filterEnd) {
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
    $eventOriginalStart = $start;

    //$durationMS = strtotime($event['end']) - strtotime($event['start']);

    while ($start < $end) {
      //add event to array

      $eventStartEndDate = date('Y-m-d', $start);
      $eventStartTime = date('H:i:s', strtotime($event['start']));
      $eventEndTime = date('H:i:s', strtotime($event['end']));
      $eventStartDateTime = date('c',strtotime($eventStartEndDate . ' ' . $eventStartTime));
      $eventEndDateTime = date('c',strtotime($eventStartEndDate . ' ' . $eventEndTime));

      if ($filterStart <= $start) {
        $eventType = $this->getEventType($event['attendee']);

        $eventToAdd = array('start' => $eventStartDateTime,
                            'end' => $eventEndDateTime,
                            'title' => $event['title'],
                            'roomId' => $event['roomId'],
                            'type' => $eventType,
                            'host' => $event['host']);
        array_push($eventsArray, $eventToAdd);
      }

      $current = $current + 1;

      if (isset($event['count'])) {
        if ($event['count'] < $current) {
          break;
        }
      }

      //get next event
      $start = $start + 86400;
      if (isset($event['interval'])) {
        $start = $start + (86400 * ($event['interval'] - 1));
      }
    } //End While loop
    return $eventsArray;
  }

  private function expandWeeklyEvents($event, $filterStart, $filterEnd) {
    $dayArray = array('MO' => '1', 'TU' => '2', 'WE' => '3', 'TH' => '4', 'FR' => '5', 'SA' => '6', 'SU' => '7');
    
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

    //Setup some event specific variables for future use
    $eventStart = strtotime($event['start']);
    if (isset($event['count'])) {
      $eventCountIsSet = true;
    } else {
      $eventCountIsSet = false;
    }
    if (isset($event['interval'])) {
      $eventInterval = $event['interval'];
    } else {
      $eventInterval = 1;
    }

    //TODO: Consider when an event has a interval > 1 and the start filter is not on a week when the event should be displayed. Could have an offset issue.
    if ($filterStart < $eventStart || $eventCountIsSet || $eventInterval > 1) {
      $start = $eventStart;
    } else {
      $start = $filterStart;
    }

    //$durationMS = strtotime($event['end']) - strtotime($event['start']);
    //$startDay = date('N', $start);
    $startDay = '1';

    while ($start <= $end) {
      //add event to array
      foreach ($event['weekDays'] as $eventDay) {
        if (date('N', $start) === $dayArray[$eventDay]) {

          $eventStartEndDate = date('Y-m-d', $start);
          $eventStartTime = date('H:i:s', strtotime($event['start']));
          $eventEndTime = date('H:i:s', strtotime($event['end']));
          $eventStartDateTime = date('c',strtotime($eventStartEndDate . ' ' . $eventStartTime));
          $eventEndDateTime = date('c',strtotime($eventStartEndDate . ' ' . $eventEndTime));

          $eventType = $this->getEventType($event['attendee']);

          if ($start >= $filterStart) {
            $eventToAdd = array('start' => $eventStartDateTime,
                                'end' => $eventEndDateTime,
                                'title' => $event['title'],
                                'roomId' => $event['roomId'],
                                'type' => $eventType,
                                'host' => $event['host']);
            array_push($eventsArray, $eventToAdd);
          }
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
      if (date('N', $start) === $startDay && isset($event['interval'])) {
        $start = $start + (86400 * 7 * ($event['interval'] - 1));
      }
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

        case 'BYDAY':
          $days = array();
          foreach ($values as $day) {
            array_push($days, $day);
          }
          $instance['weekDays'] = $days;
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

  private function getEventType($type) {
    if ($type === '1') {
      return "Class";
    } else {
      return "Event";
    }
  }
}