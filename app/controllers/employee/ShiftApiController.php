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

        $start = date('Y-m-d', strtotime($start));
        $end = date('Y-m-d', strtotime($end));

        //get shifts in specified range
        $shifts = Shift::where('eid', '=', $userid)->where('clockOut', '<=', $end)->where('clockIn', '>=', $start)->get();
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

    public function clockOut() {
        $lastShift = Shift::find(Input::get('id'));
        $now = new DateTime();
        $lastShift->clockOut = $now->format('Y-m-d H:i:s');
        $lastShift->save();

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

    public function clockIn() {
        $newShift = new Shift;

        $uHelper = new UserHelper();
        $uModel = $uHelper->getUserModel();

        $newShift->eid = $uModel->id;

        $now = new DateTime();
        $newShift->clockIn = $now->format('Y-m-d H:i:s');
        $newShift->save();

        $newShift->timeRec = 'N/A';
        $newShift->clockOut = '0000-00-00 00:00:00';

        return $newShift->toJSON();
    }

}
