<?php

class DepartmentTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('department')->delete();
        
		\DB::table('department')->insert(array (
			0 => 
			array (
				'id' => '1',
				'name' => 'IEE&EM',
				'created_at' => '2015-08-05 16:30:00',
				'updated_at' => '2015-08-05 16:30:00',
			),
			1 => 
			array (
				'id' => '2',
				'name' => 'EDMMS',
				'created_at' => '2015-08-05 16:30:00',
				'updated_at' => '2015-08-05 16:30:00',
			),
			2 => 
			array (
				'id' => '3',
				'name' => 'ChP',
				'created_at' => '2015-08-05 16:30:00',
				'updated_at' => '2015-08-05 16:30:00',
			),
			3 => 
			array (
				'id' => '4',
				'name' => 'STEP',
				'created_at' => '2015-08-05 16:30:00',
				'updated_at' => '2015-08-05 16:30:00',
			),
			4 => 
			array (
				'id' => '5',
				'name' => 'ECE',
				'created_at' => '2015-08-05 16:30:00',
				'updated_at' => '2015-08-05 16:30:00',
			),
			5 => 
			array (
				'id' => '6',
				'name' => 'CS',
				'created_at' => '2015-08-05 16:30:00',
				'updated_at' => '2015-08-05 16:30:00',
			),
			6 => 
			array (
				'id' => '7',
				'name' => 'MAE',
				'created_at' => '2015-08-05 16:30:00',
				'updated_at' => '2015-08-05 16:30:00',
			),
			7 => 
			array (
				'id' => '8',
				'name' => 'Civil',
				'created_at' => '2015-08-05 16:30:00',
				'updated_at' => '2015-08-05 16:30:00',
			),
			8 => 
			array (
				'id' => '9',
				'name' => 'DEAN',
				'created_at' => '2015-08-05 16:30:00',
				'updated_at' => '2015-08-05 16:30:00',
			),
			9 => 
			array (
				'id' => '10',
				'name' => 'CAE',
				'created_at' => '2015-08-05 16:30:00',
				'updated_at' => '2015-08-05 16:30:00',
			),
			10 => 
			array (
				'id' => '11',
				'name' => 'Adv',
				'created_at' => '2015-08-05 16:30:00',
				'updated_at' => '2015-08-05 16:30:00',
			),
		));
	}

}
