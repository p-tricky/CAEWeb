<?php 

class TimesheetApiController extends BaseController
{
	//copied from ShiftApiController.php
	public function getAllShifts(){

		//get pay period
		$day = date('w');
        $startofweeks = strtotime('2015-01-05 00:00:00');
        $today = strtotime(date('m/d/Y h:m:s'));
        $weeknum = floor(($today - $startofweeks) / (60 * 60 * 24 * 7));

        if($weeknum%2==0) { //even week = first week of pay period
            if ($day == 0)
            {
                $payPeriodStart = date('m/d/Y', strtotime('-6 days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+7 days'));
            }
            else
            {
                $payPeriodStart = date('m/d/Y', strtotime('-' . ($day - 1) . ' days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+' . (14 - $day) . ' days'));
            }
            
        }
        else {
            if ($day == 0)
            {
                $payPeriodStart = date('m/d/Y', strtotime('-13 days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+0 days'));
            }
            else
            {
                $payPeriodStart = date('m/d/Y', strtotime('-' . ($day + 6) . ' days'));
                $payPeriodEnd = date('m/d/Y', strtotime('+' . (7 - $day) . ' days'));
            }            
        }

        //set query values to either defaulting pay period range or input filter range
        $start = Input::get('start', $payPeriodStart);
        $end = Input::get('end', $payPeriodEnd);

        //sets the start and end date differently since Firefox wouldn't recognize some strings
        $start = date('Y-m-d', strtotime($start));
        $end = date('Y-m-d', strtotime($end));
        $end = date('Y-m-d', strtotime($end . ' + 1 day'));
        $end = new DateTime($end);
        //this will make the clockout time anything before 2:30 am on Monday. 
        $end->add(new DateInterval('PT2H30M'));

        //get shifts in specified range
        $shifts = Shift::where('clockOut', '<=', $end)->where('clockIn', '>=', $start)->get();

        //adds the user's name to each shift
        foreach ($shifts as $shift) {
            $shift->name = User::where('id', '=', $shift->eid)->pluck('fullname');
        }

        //sorts the shifts first by user's last name then by clockin
        $shifts = $shifts->sortBy(function($shift){
            //gets the number of names-1. E.g. if the user has first, middle, and last names, it will be 2
            //if the user has two last names it will be 3
            $names = substr_count($shift->name, ' ');
            switch ($names) {
                case 1:
                    //pos is the position of the space before the last name
                    $pos = strpos($shift->name, ' ');
                    break;
                case 2:
                case 3:
                    //has to offset by the index of the first space +1
                    $pos = strpos($shift->name, ' ', strpos($shift->name, ' ')+1);
                    break;
                default:
                    //if someone has more than names, it will just sort by the second name 
                    $pos = strpos($shift->name, ' ');
                    break;
            }
            //this will return the last name concatinated with the clockin. This is the string that its sorted by
            return substr($shift->name , $pos) . $shift->clockIn;
        });

        //removes the index values from each item. If left, Backbone wont recognize it properly
        $shifts->values();

        //returns the shifts
        return $shifts->toJSON();
	}

    //returns the user name based on an id
    //currently unused but will be left in for future use
	public function getUserName() {
        //gets the id from the input
		$userId = Input::get('id');
        //selects the user and gets just the "fullname" then returns it
		$user = User::where('id', '=', $userId)->pluck('fullname');
		return $user;
	}
}
