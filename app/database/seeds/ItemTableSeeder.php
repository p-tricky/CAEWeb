<?php

class ItemTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('item')->delete();
        
		\DB::table('item')->insert(array (
			0 => 
			array (
				'id' => '4',
				'name' => 'Black Toner',
				'description' => 'Black toner for CAE X and Y',
				'quantity' => '8',
				'vendor_id' => '2',
				'email_threshold' => '4',
				'item_url' => 'http://www.konica-minolta.com',
				'on_order_quantity' => '0',
				'active' => '1',
				'updated_at' => '2016-01-14 08:09:20',
				'created_at' => '2014-07-08 17:52:17',
			),
			1 => 
			array (
				'id' => '5',
				'name' => 'Magenta Toner',
				'description' => 'Magenta toner for CAE X and Y',
				'quantity' => '5',
				'vendor_id' => '2',
				'email_threshold' => '2',
				'item_url' => 'http://www.konica-minolta.com',
				'on_order_quantity' => '0',
				'active' => '1',
				'updated_at' => '2016-01-14 08:09:28',
				'created_at' => '2014-07-08 17:52:17',
			),
			2 => 
			array (
				'id' => '6',
				'name' => 'Yellow Toner',
				'description' => 'Yellow toner for CAE X and Y',
				'quantity' => '6',
				'vendor_id' => '2',
				'email_threshold' => '2',
				'item_url' => 'http://www.konica-minolta.com',
				'on_order_quantity' => '0',
				'active' => '1',
				'updated_at' => '2016-01-14 08:09:42',
				'created_at' => '2014-07-08 17:52:17',
			),
			3 => 
			array (
				'id' => '7',
				'name' => 'Cyan Toner',
				'description' => 'Cyan toner for CAE X and Y',
				'quantity' => '4',
				'vendor_id' => '2',
				'email_threshold' => '2',
				'item_url' => 'http://www.konica-minolta.com',
				'on_order_quantity' => '0',
				'active' => '1',
				'updated_at' => '2015-09-24 08:01:10',
				'created_at' => '2014-07-08 17:52:17',
			),
			4 => 
			array (
				'id' => '10',
				'name' => 'Paper',
				'description' => '8.5 X 11 Paper for the printers',
				'quantity' => '15',
				'vendor_id' => '3',
				'email_threshold' => '7',
				'item_url' => 'staples.com',
				'on_order_quantity' => '0',
				'active' => '1',
				'updated_at' => '2016-01-20 08:14:03',
				'created_at' => '2015-05-21 15:13:13',
			),
			5 => 
			array (
				'id' => '11',
				'name' => 'Staples',
				'description' => 'Staples for the automatic stapler',
				'quantity' => '29',
				'vendor_id' => '3',
				'email_threshold' => '5',
				'item_url' => 'staples.com',
				'on_order_quantity' => '0',
				'active' => '1',
				'updated_at' => '2015-05-21 15:17:08',
				'created_at' => '2015-05-21 15:17:08',
			),
			6 => 
			array (
				'id' => '12',
				'name' => 'Waste Toner',
				'description' => 'Waste Toner for the printers in the main lab',
				'quantity' => '2',
				'vendor_id' => '2',
				'email_threshold' => '2',
				'item_url' => 'https://www.mykmbs.com/mykmbs/login.jspx',
				'on_order_quantity' => '0',
				'active' => '1',
				'updated_at' => '2016-01-20 10:27:51',
				'created_at' => '2015-05-21 15:19:59',
			),
			7 => 
			array (
				'id' => '13',
				'name' => 'Toner Recyclin ',
				'description' => 'Toner recycling boxes',
				'quantity' => '2',
				'vendor_id' => '2',
				'email_threshold' => '1',
				'item_url' => 'https://www.mykmbs.com/mykmbs/login.jspx',
				'on_order_quantity' => '0',
				'active' => '1',
				'updated_at' => '2015-11-11 08:13:17',
				'created_at' => '2015-05-21 15:21:54',
			),
			8 => 
			array (
				'id' => '14',
				'name' => 'Screen Cleaner',
				'description' => 'Bottles of screen cleaner for computer monitors',
				'quantity' => '3',
				'vendor_id' => '3',
				'email_threshold' => '1',
				'item_url' => 'staples.com',
				'on_order_quantity' => '0',
				'active' => '1',
				'updated_at' => '2016-01-14 08:10:26',
				'created_at' => '2015-05-21 15:25:23',
			),
		));
	}

}
