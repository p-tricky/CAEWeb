<?php

class AssetsTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('assets')->delete();
        
    $brands = array('Dell', 'Asus', 'Acer', 'Samsung', 'Sony', 'HP');
    $rooms = DB::table('ceas_rooms')->lists('name');
    $dids = DB::table('department')->lists('id');
    $types = array('PC', 'Laptop', 'Monitor', 'TV', 'Server', 'Other');
    $faker = Faker\Factory::create();
    foreach(range(1,25) as $id)
    {
      Asset::create([
        'brand_name' => $faker->randomElement($brands),
        'room' => $faker->randomElement($rooms),
        'active' => $faker->optional($weight=.4, $default='1')->randomElement(array('0', '1')),
        'mac_address' => $faker->macAddress,
        'ip_address' => $faker->ipv4,
        'assignee_name' => $faker->name,
        'asset_type' => $faker->randomElement($types),
        'department_id' => $faker->randomElement($dids),
        'serial_number' => $faker->randomNumber(9),
        'asset_tag' => $faker->md5,
        'description' => $faker->realText(50),

      ]);
    }

  }

}

