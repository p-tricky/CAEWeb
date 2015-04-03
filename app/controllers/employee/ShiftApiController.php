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

        if($thisweek%2 == 0) { //even week = first week of pay period
            $payPeriodStart = date('Y-m-d', strtotime('-' . ($today - 1) . ' days'));
            $payPeriodEnd = date('Y-m-d', strtotime('+' . (14 - $today) . ' days'));
        }
        else {
            $payPeriodStart = date('Y-m-d', strtotime('-' . ($today + 6) . ' days'));
            $payPeriodEnd = date('Y-m-d', strtotime('+' . (7 - $today) . ' days'));
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
        $shifts = Shift::where('eid', '=', $userid)->where('clockOut', '<=', $end)->where('clockIn', '>=', $start)->orderBy('clockIn')->get();
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
            $payPeriodStart = date('m/d/Y', strtotime('-' . ($today - 1) . ' days'));
            $payPeriodEnd = date('m/d/Y', strtotime('+' . (14 - $today) . ' days'));
        }
        else {
            $payPeriodStart = date('m/d/Y', strtotime('-' . ($today + 6) . ' days'));
            $payPeriodEnd = date('m/d/Y', strtotime('+' . (7 - $today) . ' days'));
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

    //will update the clockin and clockout times for a shift by id 
    public function updateShift() {
        //gets the input values
        $shiftId = Input::get('id');
        $clockin = Input::get('clockin');
        $clockout = Input::get('clockout');

        //sets the new values and saves
        $thisShift = Shift::find($shiftId);
        $thisShift->clockIn = $clockin;
        $thisShift->clockout = $clockout;
        $thisShift->save();
    }

}
