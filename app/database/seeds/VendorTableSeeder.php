<?php

class VendorTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('vendor')->delete();
        
		\DB::table('vendor')->insert(array (
			0 => 
			array (
				'id' => '1',
				'name' => 'Office Depot',
				'url' => 'http://www.officedepot.com',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			1 => 
			array (
				'id' => '2',
				'name' => 'Konica Minolta',
				'url' => 'http://www.konica-minolta.com',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			2 => 
			array (
				'id' => '3',
				'name' => 'Staples',
				'url' => 'http://www.staples.com/',
				'updated_at' => '2015-03-05 14:39:32',
				'created_at' => '2015-03-05 14:39:32',
			),
		));
	}

}
