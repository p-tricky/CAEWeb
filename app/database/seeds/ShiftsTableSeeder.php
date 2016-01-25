<?php

class ShiftsTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
    $monday = Date('Y-m-d', strtotime('-2 days'));
    $tuesday = Date('Y-m-d', strtotime('-1 days'));
		\DB::table('shifts')->delete();
        
		\DB::table('shifts')->insert(array (
			0 => 
			array (
				'id' => '1',
				'eid' => '1',
				'clockIn' => "$monday 08:00:00",
				'clockOut' => "$monday 13:00:00",
				'created_at' => '2015-05-26 08:04:58',
				'updated_at' => '2015-05-26 12:51:33',
			),
			1 => 
			array (
				'id' => '2',
				'eid' => '1',
				'clockIn' => "$tuesday 08:05:37",
				'clockOut' => "$tuesday 17:02:57",
				'created_at' => '2015-05-26 08:10:37',
				'updated_at' => '2015-05-26 17:02:57',
			),
			2 => 
			array (
				'id' => '3',
				'eid' => '2',
				'clockIn' => "$tuesday 08:22:32",
				'clockOut' => "$tuesday 14:06:51",
				'created_at' => '2015-05-26 08:22:32',
				'updated_at' => '2015-05-26 14:06:51',
			),
			3 => 
			array (
				'id' => '4',
				'eid' => '2',
				'clockIn' => "$monday 09:30:00",
				'clockOut' => "$monday 16:18:27",
				'created_at' => '2015-05-26 11:21:09',
				'updated_at' => '2015-05-26 16:18:27',
			),
			4 => 
			array (
				'id' => '5',
				'eid' => '3',
				'clockIn' => "$monday 11:38:57",
				'clockOut' => "$monday 15:28:26",
				'created_at' => '2015-05-26 11:38:57',
				'updated_at' => '2015-05-26 15:28:26',
			),
		));
	}

}
