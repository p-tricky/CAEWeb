<?php

class PositionsTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('positions')->delete();
        
		\DB::table('positions')->insert(array (
			0 => 
			array (
				'position_name' => 'guest',
				'created_at' => '2015-08-12 00:00:00',
				'updated_at' => '2015-08-12 00:00:00',
			),
			1 => 
			array (
				'position_name' => 'attendant',
				'created_at' => '2014-07-08 17:52:18',
				'updated_at' => '2014-07-08 17:52:18',
			),
			2 => 
			array (
				'position_name' => 'administrator',
				'created_at' => '2014-07-08 17:52:18',
				'updated_at' => '2014-07-08 17:52:18',
			),
			3 => 
			array (
				'position_name' => 'programmer',
				'created_at' => '2014-07-08 17:52:18',
				'updated_at' => '2014-07-08 17:52:18',
			),
			4 => 
			array (
				'position_name' => 'director',
				'created_at' => '2014-07-08 17:52:18',
				'updated_at' => '2014-07-08 17:52:18',
			),
			5 => 
			array (
				'position_name' => 'building cordinator',
				'created_at' => '2014-07-08 17:52:18',
				'updated_at' => '2014-07-08 17:52:18',
			),
		));
	}

}
