<?php

class AttendantscheduleTableSeeder extends Seeder {

  private function formatUntilString($date, $modStr) 
  {
    $newDate = new DateTime($date->format('Y-m-d h:i:s'));
    $newDate->modify($modStr);
    $dateStr = $newDate->format('Ymd').'T'.'080000Z';
    return $dateStr;
  }

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
    $today = new DateTime();
		\DB::table('attendantschedule')->delete();
        
		\DB::table('attendantschedule')->insert(array (
			0 => 
			array (
				'id' => '1',
				'Title' => '',
				'Availability' => '0',
				'Start' => $today->setTime(5,0)->format('Y-m-d h:i:s'),
				'End' => $today->setTime(9,0)->format('Y-m-d h:i:s'),
				'Employee' => '1',
				'RecurrenceId' => '',
				'RecurrenceRule' => 'FREQ=WEEKLY;UNTIL='.$this->formatUntilString($today, '+2 weeks').';BYDAY=MO,FR',
				'RecurrenceException' => '',
				'created_at' => (new DateTime())->format('Y-m-d h:i:s'),
				'updated_at' => (new DateTime())->format('Y-m-d h:i:s'),
			),
			1 => 
			array (
				'id' => '2',
				'Title' => '',
				'Availability' => '0',
				'Start' => '2014-07-15 03:00:00',
				'End' => '2014-07-15 09:30:00',
				'Start' => $today->setTime(3,0)->format('Y-m-d h:i:s'),
				'End' => $today->setTime(9,30)->format('Y-m-d h:i:s'),
				'Employee' => '1',
				'RecurrenceId' => '',
				'RecurrenceRule' => 'FREQ=WEEKLY;UNTIL='.$this->formatUntilString($today, '+6 months').';BYDAY=SA',
				'RecurrenceException' => '',
				'created_at' => (new DateTime())->format('Y-m-d h:i:s'),
				'updated_at' => (new DateTime())->format('Y-m-d h:i:s'),
			),
			2 => 
			array (
				'id' => '3',
				'Title' => '',
				'Availability' => '0',
				'Start' => $today->setTime(5,30)->format('Y-m-d h:i:s'),
				'End' => $today->setTime(19,30)->format('Y-m-d h:i:s'),
				'Employee' => '1',
				'RecurrenceId' => '',
				'RecurrenceRule' => 'FREQ=WEEKLY;UNTIL='.$this->formatUntilString($today, '+12 weeks').';BYDAY=TU,TH',
				'RecurrenceException' => '',
				'created_at' => (new DateTime())->format('Y-m-d h:i:s'),
				'updated_at' => (new DateTime())->format('Y-m-d h:i:s'),
			),
		));
	}

}
