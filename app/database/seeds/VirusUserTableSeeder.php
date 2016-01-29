<?php

class VirusUserTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('virus_users')->delete();
        
    $faker = Faker\Factory::create();
    foreach(range(1,5) as $id)
    {
      ScansUser::create([
        'user_name' => $faker->name(),
      ]);
    }

  }

}

