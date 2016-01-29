<?php

class OrdersTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('orders')->delete();
        
    $faker = Faker\Factory::create();
    foreach(range(1,10) as $id)
    {                
      Order::create([
        'status' => $faker->randomElement(array('0', '1')),
      ]);
    }

  }

}

