<?php
class ShiftApiController extends BaseController {

    public function getShifts(){
        //get logged-in user info
        $uHelper = new UserHelper();
        $uModel = $uHelper->getUserModel();
        $userid = $uModel->id;
        
        //get pay period
        $today = date('w');
        $thisweek = date('W');

        if($thisweek%2==0) { //even week = first week of pay period
            //if today is Sunday, then it calculates the pay period in a different way because the 0 and week number
            if ($today == 0)
            {
                $payPeriodStart = date('m/d/Y', strtotime('-6 days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+7 days'));
            }
            //if its any other day of the week
            else
            {
                $payPeriodStart = date('m/d/Y', strtotime('-' . ($today - 1) . ' days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+' . (14 - $today) . ' days'));
            }
            
        }
        else {
            if ($today == 0)
            {
                $payPeriodStart = date('m/d/Y', strtotime('-13 days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+0 days'));
            }
            else
            {
                $payPeriodStart = date('m/d/Y', strtotime('-' . ($today + 6) . ' days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+' . (7 - $today) . ' days'));
            }            
        }

        //set query values to either defaulting pay period range or input filter range
        $start = Input::get('start', $payPeriodStart);
        $end = Input::get('end', $payPeriodEnd);

        //sets the start and end date differently since Firefox wouldn't recognize some strings
        $start = date('Y-m-d', strtotime($start));
        $end = date('Y-m-d', strtotime($end));    
        $end = date('Y-m-d', strtotime($end . ' + 1 day'));

        //used to set the shift number for easy css coloring and formatting
        $shiftNumber = 1;

        //get shifts in specified range
        //will always add on a still clocked in shift
        $shifts = Shift::where(function($query) use ($userid, $start, $end) {
            $query->where('eid', '=', $userid)->where('clockOut', '<=', $end)->where('clockIn', '>=', $start);
        })->orWhere(function($query) use ($userid){
            $query->where('eid', '=', $userid)->where('clockout', '=', '0000-00-00 00:00:00');
        })->orderBy('clockIn')->get();
        foreach($shifts as $shift) {
            $startTime = new DateTime($shift->clockIn);
            $endTime = new DateTime($shift->clockOut);

            $nullTime = new DateTime("0000-00-00 00:00:00");
            if ($endTime == $nullTime)
                $shift->timeRec = 'N/A';
            else 
            {
                $shiftDaysToHours = $startTime->diff($endTime)->d * 24;
                $timeRecHours = $startTime->diff($endTime)->h + $shiftDaysToHours;
                if ($timeRecHours < 10)
                    $timeRecHours = "0" . $timeRecHours;
                $timeRecMinutes = $startTime->diff($endTime)->i;
                if ($timeRecMinutes < 10)
                    $timeRecMinutes = "0" . $timeRecMinutes;
                $shift->timeRec = $timeRecHours . ':' . $timeRecMinutes; 
            }

            //sets the shift number
            $shift->shiftNum = $shiftNumber;
            //increments the shift number
            $shiftNumber+=1;
        }
        return $shifts->toJSON();
    }

    //returns the start and end of the current pay period
    public function getPayPeriod() {
        //get pay period
        $today = date('w');
        $thisweek = date('W');

        if($thisweek%2==0) { //even week = first week of pay period
            if ($today == 0)
            {
                $payPeriodStart = date('m/d/Y', strtotime('-6 days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+7 days'));
            }
            else
            {
                $payPeriodStart = date('m/d/Y', strtotime('-' . ($today - 1) . ' days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+' . (14 - $today) . ' days'));
            }
            
        }
        else {
            if ($today == 0)
            {
                $payPeriodStart = date('m/d/Y', strtotime('-13 days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+0 days'));
            }
            else
            {
                $payPeriodStart = date('m/d/Y', strtotime('-' . ($today + 6) . ' days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+' . (7 - $today) . ' days'));
            }            
        }

        $payPeriodData = array(
            "start" => $payPeriodStart,
            "end" => $payPeriodEnd
            );

        return json_encode($payPeriodData);

    }

    public function getServerTime() {
        return json_encode(new DateTime());
    }

    //called when a user clocks out
    public function clockOut() {
        //gets the last shift for the user. This is the one that is clocked in
        $lastShift = Shift::find(Input::get('id'));
        $now = new DateTime();
        $cin = new DateTime($lastShift->clockIn);
        $maxcout = date_add($cin, date_interval_create_from_date_string('1 day'));
        if ($maxcout < $now) $now = $maxcout;
        //sets the clockout time and saves it
        $lastShift->clockOut = $now->format('Y-m-d H:i:s');
        $lastShift->save();

        //This will calculate the time recorded for the shift and then return that
        $startTime = new DateTime($lastShift->clockIn);
        $endTime = new DateTime($lastShift->clockOut);
        $shiftDaysToHours = $endTime->diff($startTime)->d * 24;

        $timeRecHours = $endTime->diff($startTime)->h + $shiftDaysToHours;
        if ($timeRecHours < 10)
            $timeRecHours = "0" . $timeRecHours;
        $timeRecMinutes = $endTime->diff($startTime)->i;
        if ($timeRecMinutes < 10)
            $timeRecMinutes = "0" . $timeRecMinutes;

        $lastShift->timeRec = $timeRecHours . ':' . $timeRecMinutes;

        return $lastShift->toJSON();
    }

    //called when a user clocks in
    public function clockIn() {
        //makes a new shift
        $newShift = new Shift;

        //gets the current userHelperModel
        $uHelper = new UserHelper();
        $uModel = $uHelper->getUserModel();

        //sets the user id for the shift
        $newShift->eid = $uModel->id;

        //sets the clockin time
        $now = new DateTime();
        $newShift->clockIn = $now->format('Y-m-d H:i:s');
        $newShift->save();

        //sets the time recorded and clockout time to 0
        $newShift->timeRec = 'N/A';
        $newShift->clockOut = '0000-00-00 00:00:00';

        return $newShift->toJSON();
    }

    //deletes a shift by the id
    public function deleteShift() {
        $shiftId = Input::get('id');
        echo $shiftId;
        Shift::where('id', '=', $shiftId)->delete();
    }

    //There is a 24 hour time limit on shifts.  If someone has been
    //clocked in for more than 24 hours, we assume that that person
    //forgot to clock out
    public function endForgottenShifts() {
      $today = new DateTime();
      $yesterday = date_sub($today, date_interval_create_from_date_string('1 day'));
      $forgottenShifts = Shift::where('clockOut', '=', '0000-00-00 00:00:00')
        ->where('clockIn', '<', $yesterday)
        ->get();
      foreach($forgottenShifts as $shift) {
        $cin = new DateTime($shift->clockIn);
        $cout = date_add($cin, date_interval_create_from_date_string('1 day'));
        $shift->clockOut = $cout->format('Y-m-d H:i:s');
        $shift->save();
      }
      //if the forgotten shifts is empty, then no email is sent
      if (!$forgottenShifts->isEmpty())
        Shift::sendNotificationEmail($forgottenShifts);
    }

    //will update the clockin and clockout times for a shift by id 
    public function updateShift() {
        //gets the input values
        $shiftId = Input::get('id');
        $clockin = Input::get('clockin');
        $clockout = Input::get('clockout');

        // if clockout = 0000-00...
        // then the shift has not been clocked out yet.
        // saving shifts before clocking out is fine, but
        // it breaks things when checking error checking.
        // We reset clockout to 0000-0... before saving.
        if ($clockout == '0000-00-00 00:00:00')
          $clockout = (new DateTime())->format('Y-m-d H:i:s');

        // need date time for comparisons
        $clockinAsDateTime = new DateTime($clockin);
        $clockoutAsDateTime = new DateTime($clockout);
        $curDateTime = new DateTime();

        // can't clock negative hours
        if ($clockoutAsDateTime < $clockinAsDateTime)
          return json_encode(['error' => 'negative hours', 'info' => 'Clock in time must be before the current time and before the clock out time.']);

        // wait til you have worked shift to clock it
        if ($clockoutAsDateTime > $curDateTime && $clockinAsDateTime > $curDateTime)
          return json_encode(['error' => 'future shift', 'info' => 'Please log only shifts that you have worked, not ones that you expect to work.']);

        // can't clock more than 24 hours
        $min_clockin = date_sub($clockoutAsDateTime, date_interval_create_from_date_string('1 day'));
        if ($clockinAsDateTime < $min_clockin)
          return json_encode(['error' => 'too long', 'info' => 'The max shift time is 24 hours']);

        //if we have met all previous requirements, get shift from db
        $thisShift = Shift::find($shiftId);
        
        // Before saving we should make sure no one is over clocking (i.e.,
        // the updated shift times don't overlap with existing shift times);
        // To do this we query for conflicting shifts and reject if query
        // returns shifts. The query is pretty ugly, but it's really not 
        // very complex. 4 steps total:
        //  1) Get shifts for the user who is updating his/her shifts.
        //  2) Filter out the id of the shift that we are updating. Obviously
        //     the updated shift will conflict with itself, but that's not a 
        //     problem
        //  3) Find any shifts with clockin or clockout times that fall within the
        //     updated shift times. If updated shift time is 2-3pm, this finds any
        //     shift whose clockin or clockout is between 2pm and 3pm.
        //  4) Find any shifts that extend the updated shift times. If updated
        //     shift time is 2-3pm and another shift is 1:30-3:30pm this finds
        //     it.
        $conflictingShiftClockInTimes = Shift::where('eid', $thisShift->eid) //1
          ->whereNotIn('id', array($thisShift->id)) //2
          ->where(function($query) use($clockin, $clockout)
          {
            $query->whereBetween('clockIn', [$clockin, $clockout])   //3
                  ->orWhereBetween('clockOut', [$clockin, $clockout])
                  ->orWhere(function($query) use ($clockin, $clockout)
                  {
                    $query->where('clockOut', '>', $clockout) //4
                          ->where('clockIn', '<', $clockin);
                  });
          })
          ->select('clockIn')
          ->get();

        // if there are conflicting shifts return them as a string
        if (!$conflictingShiftClockInTimes->isEmpty()) {
          $conflicts = "";
          foreach($conflictingShiftClockInTimes as $time) $conflicts .= $time->clockIn . "<br>";
          return json_encode(['error' => 'conflict', 'info' => $conflicts]);
        }
        $thisShift->clockIn = $clockin;
        $thisShift->clockout = Input::get('clockout');
        $thisShift->save();
        return json_encode(['error' => 'none']);
    }

    //will update the clockin and clockout times for a shift by id 
    public function newShift() {
        //gets the input values
        $eid = Input::get('eid');
        $clockin = Input::get('clockin');
        $clockout = Input::get('clockout');

        // need date time for comparisons
        $clockinAsDateTime = new DateTime($clockin);
        $clockoutAsDateTime = new DateTime($clockout);
        $curDateTime = new DateTime();

        // can't clock negative hours
        if ($clockoutAsDateTime < $clockinAsDateTime)
          return json_encode(['error' => 'negative hours', 'info' => 'Clock in time must be before the current time and before the clock out time.']);

        // wait til you have worked shift to clock it
        if ($clockoutAsDateTime > $curDateTime && $clockinAsDateTime > $curDateTime)
          return json_encode(['error' => 'future shift', 'info' => 'Please log only shifts that you have worked, not ones that you expect to work.']);

        // can't clock more than 24 hours
        $min_clockin = date_sub($clockoutAsDateTime, date_interval_create_from_date_string('1 day'));
        if ($clockinAsDateTime < $min_clockin)
          return json_encode(['error' => 'too long', 'info' => 'The max shift time is 24 hours']);

        // Before saving we should make sure no one is over clocking (i.e.,
        // the new shift times don't overlap with existing shift times);
        // To do this we query for conflicting shifts and reject if the query
        // returns shifts. The query is pretty ugly, but it's really not 
        // very complex. 4 steps total:
        //  1) Get shifts for the user who is updating his/her shifts.
        //  2) Find any shifts with clockin or clockout times that fall within the
        //     updated shift times. If updated shift time is 2-3pm, this finds any
        //     shift whose clockin or clockout is between 2pm and 3pm.
        //  3) Find any shifts that extend the updated shift times. If updated
        //     shift time is 2-3pm and another shift is 1:30-3:30pm this finds
        //     it.
        $conflictingShiftClockInTimes = Shift::where('eid', $eid) //1
          ->where(function($query) use($clockin, $clockout)
          {
            $query->whereBetween('clockIn', [$clockin, $clockout])   //2
                  ->orWhereBetween('clockOut', [$clockin, $clockout])
                  ->orWhere(function($query) use ($clockin, $clockout)
                  {
                    $query->where('clockOut', '>', $clockout) //3
                          ->where('clockIn', '<', $clockin);
                  });
          })
          ->select('clockIn')
          ->get();

        // if there are conflicting shifts return them as a string
        if (!$conflictingShiftClockInTimes->isEmpty()) {
          $conflicts = "";
          foreach($conflictingShiftClockInTimes as $time) $conflicts .= $time->clockIn . "<br>";
          return json_encode(['error' => 'conflict', 'info' => $conflicts]);
        }
        $newShift = new Shift;
        $newShift->eid = $eid;
        $newShift->clockIn = $clockin;
        $newShift->clockout = $clockout;
        $newShift->save();
        return json_encode(['error' => 'none']);
    }


}
