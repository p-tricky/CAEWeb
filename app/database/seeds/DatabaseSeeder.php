<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		// $this->call('UserTableSeeder');
		$this->call('PositionsTableSeeder');
		$this->call('UsersTableSeeder');
		$this->call('AdminscheduleTableSeeder');
		$this->call('ProgrammerscheduleTableSeeder');
		$this->call('AttendantscheduleTableSeeder');
		$this->call('CeasRoomTypesTableSeeder');
		$this->call('CeasRoomsTableSeeder');
		$this->call('ItemTableSeeder');
		$this->call('VendorTableSeeder');
		$this->call('SemesterStartTableSeeder');
		$this->call('DepartmentTableSeeder');
		$this->call('ShiftsTableSeeder');
		$this->call('OpenCloseChecklistTableSeeder');
		$this->call('LabCheckoutsTableSeeder');
		$this->call('VirusUserTableSeeder');
		$this->call('VirusTrackerTableSeeder');
		$this->call('OrdersTableSeeder');
		$this->call('OrderItemsTableSeeder');
		$this->call('AVLogTableSeeder');
		$this->call('AssetsTableSeeder');
	}

}
