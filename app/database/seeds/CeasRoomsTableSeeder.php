<?php

class CeasRoomsTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('ceas_rooms')->delete();
        
		\DB::table('ceas_rooms')->insert(array (
			0 => 
			array (
				'id' => '1',
				'name' => 'C-122',
				'capacity' => '36',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			1 => 
			array (
				'id' => '2',
				'name' => 'C-123',
				'capacity' => '42',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			2 => 
			array (
				'id' => '3',
				'name' => 'C-124',
				'capacity' => '34',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			3 => 
			array (
				'id' => '4',
				'name' => 'C-136',
				'capacity' => '36',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			4 => 
			array (
				'id' => '5',
				'name' => 'C-141',
				'capacity' => '30',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			5 => 
			array (
				'id' => '6',
				'name' => 'D-201',
				'capacity' => '50',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			6 => 
			array (
				'id' => '7',
				'name' => 'D-202',
				'capacity' => '38',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			7 => 
			array (
				'id' => '8',
				'name' => 'D-204',
				'capacity' => '36',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			8 => 
			array (
				'id' => '9',
				'name' => 'D-205',
				'capacity' => '36',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			9 => 
			array (
				'id' => '10',
				'name' => 'D-206',
				'capacity' => '28',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			10 => 
			array (
				'id' => '11',
				'name' => 'D-208',
				'capacity' => '50',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			11 => 
			array (
				'id' => '12',
				'name' => 'D-210',
				'capacity' => '32',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			12 => 
			array (
				'id' => '13',
				'name' => 'D-212',
				'capacity' => '32',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			13 => 
			array (
				'id' => '14',
				'name' => 'D-109',
				'capacity' => '150',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			14 => 
			array (
				'id' => '15',
				'name' => 'D-115',
				'capacity' => '80',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			15 => 
			array (
				'id' => '16',
				'name' => 'E-124',
				'capacity' => '24',
				'type' => '1',
				'updated_at' => '2014-07-08 17:52:17',
				'created_at' => '2014-07-08 17:52:17',
			),
			16 => 
			array (
				'id' => '17',
				'name' => 'C-220',
				'capacity' => '26',
				'type' => '2',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			17 => 
			array (
				'id' => '18',
				'name' => 'C-224',
				'capacity' => '26',
				'type' => '2',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			18 => 
			array (
				'id' => '19',
				'name' => 'C-226',
				'capacity' => '28',
				'type' => '2',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			19 => 
			array (
				'id' => '20',
				'name' => 'C-227',
				'capacity' => '24',
				'type' => '2',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			20 => 
			array (
				'id' => '21',
				'name' => 'C-228',
				'capacity' => '24',
				'type' => '2',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			21 => 
			array (
				'id' => '22',
				'name' => 'C-229',
				'capacity' => '24',
				'type' => '2',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			22 => 
			array (
				'id' => '23',
				'name' => 'A-120',
				'capacity' => '16',
				'type' => '3',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			23 => 
			array (
				'id' => '24',
				'name' => 'B-122',
				'capacity' => '16',
				'type' => '3',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			24 => 
			array (
				'id' => '25',
				'name' => 'F-115',
				'capacity' => '16',
				'type' => '3',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			25 => 
			array (
				'id' => '26',
				'name' => 'G-113',
				'capacity' => '16',
				'type' => '3',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			26 => 
			array (
				'id' => '27',
				'name' => 'A-213',
				'capacity' => '16',
				'type' => '3',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			27 => 
			array (
				'id' => '28',
				'name' => 'B-211',
				'capacity' => '16',
				'type' => '3',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			28 => 
			array (
				'id' => '29',
				'name' => 'F-210',
				'capacity' => '16',
				'type' => '3',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			29 => 
			array (
				'id' => '30',
				'name' => 'C-135',
				'capacity' => '0',
				'type' => '4',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			30 => 
			array (
				'id' => '31',
				'name' => 'E-103',
				'capacity' => '0',
				'type' => '4',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			31 => 
			array (
				'id' => '33',
				'name' => 'C-258',
				'capacity' => '0',
				'type' => '4',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			32 => 
			array (
				'id' => '34',
				'name' => 'C-209',
				'capacity' => '0',
				'type' => '4',
				'updated_at' => '2014-07-08 17:52:18',
				'created_at' => '2014-07-08 17:52:18',
			),
			33 => 
			array (
				'id' => '35',
				'name' => 'C-208',
				'capacity' => '24',
				'type' => '2',
				'updated_at' => '2015-06-30 13:00:00',
				'created_at' => '2015-06-30 13:00:00',
			),
		));
	}

}
