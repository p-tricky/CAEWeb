<?php 

class TimesheetApiController extends BaseController
{
	//copied from ShiftApiController.php
	public function getAllShifts(){

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
        $end = date('Y-m-d', strtotime($end . ' + 1 day'));

        //get shifts in specified range
        $shifts = Shift::where('clockOut', '<=', $end)->where('clockIn', '>=', $start)->orderBy('eid')->orderBy('clockIn')->get();
        return $shifts->toJSON();
	}

	public function getUserName() {
		$userId = Input::get('id');
		$user = User::where('id', '=', $userId)->pluck('fullname');
		return $user;
	}
}
