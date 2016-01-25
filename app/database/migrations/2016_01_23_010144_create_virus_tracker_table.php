<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVirusTrackerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('virus_tracker', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('uid')->unsigned()->index('uid');
			$table->string('mac_addr');
			$table->date('scan_date');
			$table->string('room_number');
			$table->string('cpu_desc');
			$table->integer('troj_mal')->unsigned();
			$table->integer('pups')->unsigned();
			$table->text('notes', 65535);
			$table->string('scanned_by');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('virus_tracker');
	}

}
