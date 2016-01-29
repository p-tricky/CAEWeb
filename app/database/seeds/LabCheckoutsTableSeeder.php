<?php

class LabCheckoutsTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('lab_checkouts')->delete();
        
    $faker = Faker\Factory::create();
    foreach(range(1,20) as $id)
    {
      $hundredDaysAgo = new DateTime(date('Y-m-d h:i:s', strtotime('-100 days')));
      $randDays = $faker->unique()->numberBetween(0, 103);
      LabCheckouts::create([
        'checkout_date' => $hundredDaysAgo->modify("+$randDays days"),
        'name' => $faker->name(),
        'phone_number' => $faker->phoneNumber(),
        'email' => $faker->email(),
        'lab' => $faker->randomLetter() . '-' . $faker->randomNumber(3),
      ]);
    }

  }

}

