<?php

class CeasRoomTypesTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('ceas_room_types')->delete();
        
		\DB::table('ceas_room_types')->insert(array (
			0 => 
			array (
				'id' => '1',
				'name' => 'classroom',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			1 => 
			array (
				'id' => '2',
				'name' => 'computer classroom',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			2 => 
			array (
				'id' => '3',
				'name' => 'breakout room',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			3 => 
			array (
				'id' => '4',
				'name' => 'special room',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
		));
	}

}
