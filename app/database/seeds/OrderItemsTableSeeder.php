<?php

class OrderItemsTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('order_item')->delete();
        
    $oids = DB::table('orders')->lists('id');
    $iids = DB::table('item')->lists('id');
    $faker = Faker\Factory::create();
    foreach(range(1,30) as $id)
    {
      Order_Item::create([
        'order_qty' => $faker->numberBetween(1, 20),
        'order_id' => $faker->randomElement($oids),
        'item_id' => $faker->randomElement($iids),
      ]);
    }

  }

}

