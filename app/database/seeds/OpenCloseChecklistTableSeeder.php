<?php

class OpenCloseChecklistTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('open_close_checklist')->delete();
        
    $faker = Faker\Factory::create();
    foreach(range(1,50) as $id)
    {
      $hundredDaysAgo = new DateTime(date('Y-m-d h:i:s', strtotime('-100 days')));
      $randDays = $faker->unique()->numberBetween(0, 103);
      OpenCloseChecklist::create([
        'task_date' => $hundredDaysAgo->modify("+$randDays days"),
        'cico_system_on' => $faker->randomElement(array('0', '1')),
        'printers_on' => $faker->randomElement(array('0', '1')),
        'print_stations_on' => $faker->randomElement(array('0', '1')),
        'open_side_doors' => $faker->randomElement(array('0', '1')),
        'cico_system_off' => $faker->randomElement(array('0', '1')),
        'printers_off' => $faker->randomElement(array('0', '1')),
        'print_stations_off' => $faker->randomElement(array('0', '1')),
        'close_main_doors' => $faker->randomElement(array('0', '1')),
        'close_side_doors' => $faker->randomElement(array('0', '1')),
        'refill_printer_paper' => $faker->randomElement(array('0', '1')),
        'push_in_chairs' => $faker->randomElement(array('0', '1')),
        'turn_off_machines' => $faker->randomElement(array('0', '1')),
        'recycle_prints' => $faker->randomElement(array('0', '1')),
        'lock_cae_office_doors' => $faker->randomElement(array('0', '1')),
        'opened_by' => $faker->randomElement(array('Alice', 'Asok')),
        'closed_by' => $faker->randomElement(array('Alice', 'Asok')),
      ]);
    }

  }

}

