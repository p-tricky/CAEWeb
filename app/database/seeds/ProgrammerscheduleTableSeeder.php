<?php

class ProgrammerscheduleTableSeeder extends Seeder {

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
		\DB::table('programmerschedule')->delete();
        
		\DB::table('programmerschedule')->insert(array (
			0 => 
			array (
				'id' => '1',
				'Title' => '',
				'Availability' => '0',
				'Start' => $today->setTime(4,0)->format('Y-m-d h:i:s'),
				'End' => $today->setTime(11,0)->format('Y-m-d h:i:s'),
				'Employee' => '2',
				'RecurrenceId' => '',
				'RecurrenceRule' => 'FREQ=WEEKLY;UNTIL='.$this->formatUntilString($today, '+2 weeks').';BYDAY=MO,WE,FR',
				'RecurrenceException' => '',
				'created_at' => (new DateTime())->format('Y-m-d h:i:s'),
				'updated_at' => (new DateTime())->format('Y-m-d h:i:s'),
			),
			1 => 
			array (
				'id' => '2',
				'Title' => '',
				'Availability' => '0',
				'Start' => $today->setTime(3,0)->format('Y-m-d h:i:s'),
				'End' => $today->setTime(7,30)->format('Y-m-d h:i:s'),
				'Employee' => '2',
				'RecurrenceId' => '',
				'RecurrenceRule' => 'FREQ=WEEKLY;UNTIL='.$this->formatUntilString($today, '+6 months').';BYDAY=TU,TH',
				'RecurrenceException' => '',
				'created_at' => (new DateTime())->format('Y-m-d h:i:s'),
				'updated_at' => (new DateTime())->format('Y-m-d h:i:s'),
			),
			2 => 
			array (
				'id' => '3',
				'Title' => '',
				'Availability' => '1',
				'Start' => $today->setTime(7,30)->format('Y-m-d h:i:s'),
				'End' => $today->setTime(11,00)->format('Y-m-d h:i:s'),
				'Employee' => '2',
				'RecurrenceId' => '',
				'RecurrenceRule' => 'FREQ=WEEKLY;UNTIL='.$this->formatUntilString($today, '+6 months').';BYDAY=TU,TH',
				'RecurrenceException' => '',
				'created_at' => (new DateTime())->format('Y-m-d h:i:s'),
				'updated_at' => (new DateTime())->format('Y-m-d h:i:s'),
			),
		));
	}

}

