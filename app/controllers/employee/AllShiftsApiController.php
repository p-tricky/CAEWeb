<?php
class AllShiftsApiController extends BaseController {
    //will get shifts for all users
	public function getShifts(){
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

        //get shifts in specified range and order them first by user, then by clockin time. 
        $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->orderBy('eid')->orderBy('clockIn')->get();
        //foreach shift, sets the timeRecorded and the shiftNumber 
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

            //sets the name of the user
            $shift->name = User::where('id', '=', $shift->eid)->pluck('fullname');
            //sets the shift number
            $shift->shiftNum = $shiftNumber;
            //increments the shift number
            $shiftNumber+=1;
        }
        return $shifts->toJSON();
    }
}