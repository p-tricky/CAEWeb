<?php 

use Illuminate\Database\Eloquent\Collection as BaseCollection;

class TimesheetApiController extends BaseController
{
	//copied from ShiftApiController.php
	//needs a loop to get all employees
	public function getAllShifts(){

		$userid = Auth::user()->id;

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

        $start = date('Y-m-d', strtotime($start));
        $end = date('Y-m-d', strtotime($end));

        //get shifts in specified range
        $shifts = Shift::where('clockOut', '<=', $end)->where('clockIn', '>=', $start)->orderBy('eid')->get();
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
        }
        return $shifts->toJSON();
	}

	public function getUserName() {
		$userId = Input::get('id');
		$user = User::where('id', '=', $userId)->pluck('fullname');
		return $user;
	}
}
