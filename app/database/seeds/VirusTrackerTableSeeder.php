<?php

class VirusTrackerTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('virus_tracker')->delete();
        
    $uids = DB::table('virus_users')->lists('id');
    $faker = Faker\Factory::create();
    foreach(range(1,20) as $id)
    {
      $hundredDaysAgo = new DateTime(date('Y-m-d h:i:s', strtotime('-100 days')));
      $randDays = $faker->unique()->numberBetween(0, 103);
      Scans::create([
        'mac_addr' => $faker->macAddress(),
        'scan_date' => $hundredDaysAgo->modify("+$randDays days"),
        'notes' => $faker->realText(200),
        'troj_mal' => $faker->numberBetween(10, 200),
        'pups' => $faker->numberBetween(10, 200),
        'cpu_desc' => $faker->realText(200),
        'scanned_by' => $faker->randomElement(array('Alice', 'Asok')),
        'room_number' => $faker->randomLetter() . '-' . $faker->randomNumber(3),
        'uid' => $faker->randomElement($uids),
      ]);
    }

  }

}

