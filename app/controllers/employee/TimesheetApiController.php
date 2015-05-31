<?php 

class TimesheetApiController extends BaseController
{
	//copied from ShiftApiController.php
	public function getAllShifts(){

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

        //get shifts in specified range
        $shifts = Shift::where('clockOut', '<=', $end)->where('clockIn', '>=', $start)->orderBy('eid')->orderBy('clockIn')->get();
        return $shifts->toJSON();
	}

    //returns the user name based on an id
	public function getUserName() {
        //gets the id from the input
		$userId = Input::get('id');
        //selects the user and gets just the "fullname" then returns it
		$user = User::where('id', '=', $userId)->pluck('fullname');
		return $user;
	}
}
