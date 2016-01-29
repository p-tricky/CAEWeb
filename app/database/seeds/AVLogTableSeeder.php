<?php

class AVLogTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('av_log')->delete();
        
    $uids = DB::table('users')->whereIn('position_id', array(2,3,6))->lists('id');
    $rooms = DB::table('ceas_rooms')->lists('name');
    $faker = Faker\Factory::create();
    foreach(range(1,50) as $id)
    {
      AVLog::create([
        'message' => $faker->realText(100),
        'uid' => $faker->randomElement($uids),
        'room_name' => $faker->randomElement($rooms)
      ]);
    }

  }

}

