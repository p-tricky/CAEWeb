<?php
class ShiftApiController extends BaseController {

    public function getAllShifts(){
        $shifts = Shift::all();
        foreach($shifts as $shift) {
            $startTime = new DateTime($shift->clockIn);
            $endTime = new DateTime($shift->clockOut);

            $nullTime = new DateTime("0000-00-00 00:00:00");
            if ($endTime == $nullTime)
                $shift->timeRec = 'N/A';
            else 
            {
                $shiftDays = $startTime->diff($endTime)->d * 24;
                $shift->timeRec = $startTime->diff($endTime)->h + $shiftDays . ':' . $startTime->diff($endTime)->i; 
            }
        }
        return $shifts->toJSON();
    }

    public function getShiftsInRange($start, $end) {
        $shifts = Shift::where('clockOut', '<=', $end)->where('clockIn', '>=', $start)->get();

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
        $shiftDays = $endTime->diff($startTime)->d * 24;
        $lastShift->timeRec = $endTime->diff($startTime)->h + $shiftDays . ':' . $endTime->diff($startTime)->i;

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
