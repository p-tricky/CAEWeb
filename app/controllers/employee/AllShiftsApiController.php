<?php
class AllShiftsApiController extends BaseController {
    //will get shifts for all users
	public function getShifts(){
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

        //defines how to sort the shifts, defaulting to order them first by user, then by clockin time.
        $sortBy = Input::get('sort', 'default');

        //will pull shifts in a certain manner depending on how its sorted
        switch ($sortBy) {
            //sorts by the user name in ascending order
            case 'nameAsc':
                $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->get();
                $shifts = $this->setProperties($shifts);
                $shifts = $shifts->sortBy(function($shift){
                    return $shift->name . $shift->clockIn;
                });
                //when sortBy() is called, it adds element numbers to all the objects which backbone collection wont recognize. 
                //This is why you have to call values(), to remove the element numbers from the objects.
                $shifts->values();
                break;
            //sorts by the user name in ascending order
            case 'nameDes':
                $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->get();
                $shifts = $this->setProperties($shifts);
                $shifts = $shifts->sortBy(function($shift){
                    return $shift->name . $shift->clockIn;
                });
                //this will reverse the order to get the collection in descending order
                $shifts = $shifts->reverse();
                //when sortBy() is called, it adds element numbers to all the objects which backbone collection wont recognize. 
                //This is why you have to call values(), to remove the element numbers from the objects.
                $shifts->values();
                break;
            //sorts by clock in with the most recent on top
            case "timeInAsc":
                $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->orderBy('clockIn')->get();
                $shifts = $this->setProperties($shifts);
                break;
            //sorts by clocked in with the most recent at the bottom
            case "timeInDes":
                $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->orderBy('clockIn', 'DESC')->get();
                $shifts = $this->setProperties($shifts);
                break;
            //sorts by clocked out with the most recent at the top
            case "timeOutAsc":
                $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->orderBy('clockOut')->get();
                $shifts = $this->setProperties($shifts);
                break;
            //sorts by clocked out with the most recent at the bottom
            case "timeOutDes":
                $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->orderBy('clockOut', 'DESC')->get();
                $shifts = $this->setProperties($shifts);
                break;
            //sorts by time recorded with the longest at the top
            case "timeRecAsc":
                $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->get();
                $shifts = $this->setProperties($shifts);
                $shifts = $shifts->sortBy(function($shift){
                    return $shift->timeRec;
                });
                //when sortBy() is called, it adds element numbers to all the objects which backbone collection wont recognize. 
                //This is why you have to call values(), to remove the element numbers from the objects.
                $shifts->values();
                break;
            //sorts by time recorded with the longest at the bottom
            case "timeRecDes":
                $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->get();
                $shifts = $this->setProperties($shifts);
                $shifts = $shifts->sortBy(function($shift){
                    return $shift->timeRec;
                });
                //this will reverse the order to get the collection in descending order
                $shifts = $shifts->reverse();
                //when sortBy() is called, it adds element numbers to all the objects which backbone collection wont recognize. 
                //This is why you have to call values(), to remove the element numbers from the objects.
                $shifts->values();
                break;
            //gets all the shifts that are clocked out first then appends the shifts that are still clocked in
            case "clockedInAsc":
                $shifts1 = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->where('clockOut', '=', '0000-00-00 00:00:00')->orderBy('eid')->orderBy('clockIn')->get();
                $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->where('clockOut', '!=', '0000-00-00 00:00:00')->orderBy('eid')->orderBy('clockIn')->get();
                foreach ($shifts1 as $shift) {
                    $shifts->push($shift);
                }
                $shifts = $this->setProperties($shifts);
                break;
            //gets all the shifts that are clocked in first then appends the shifts that are clocked out
            case "clockedInDes":
                $shifts1 = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->where('clockOut', '!=', '0000-00-00 00:00:00')->orderBy('eid')->orderBy('clockIn')->get();
                $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->where('clockOut', '=', '0000-00-00 00:00:00')->orderBy('eid')->orderBy('clockIn')->get();
                foreach ($shifts1 as $shift) {
                    $shifts->push($shift);
                }
                $shifts = $this->setProperties($shifts);
                break;
            //default sorting, order them first by user, then by clockin time.
            case "default":
                $shifts = Shift::where('clockIn', '<=', $end)->where('clockIn', '>=', $start)->orderBy('eid')->orderBy('clockIn')->get();
                $shifts = $this->setProperties($shifts);
                break;
        }

        //if a search criteria is passed in, it sets $search to that string or a blank string
        $search = Input::get('search', '');

        //if search isn't empty
        if ($search != '') 
        {
            //for each shift, it the shift contains the string, then it adds the shiftNum to it 
            foreach ($shifts as $shift) {
                if (stripos($shift->name, $search) !== false || stripos($shift->clockIn, $search) !== false || stripos($shift->clockOut, $search) !== false || stripos($shift->timeRec, $search!== false ))  
                {
                    //sets the shift number
                    $shift->shiftNum = $shiftNumber;
                    //increments the shift number
                    $shiftNumber+=1;
                }
                //if the shift doesn't contain the string, then it removes it from the object
                else
                {
                    $shifts->forget($shiftNumber-1);
                    $shifts->values();
                }
            }

        }
        //if search is empty
        else 
        {
            //adds shiftNum to each shift
            foreach ($shifts as $shift) {
                //sets the shift number
                $shift->shiftNum = $shiftNumber;
                //increments the shift number
                $shiftNumber+=1;
            }
        }

        //returns shifts, even if empty
        return $shifts->toJSON();
        
    }

    //foreach shift, sets the timeRecorded and the user's name 
    private function setProperties($shifts) {
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
        }
        return $shifts;
    }
}