<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAdminscheduleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('adminschedule', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('Title');
			$table->integer('Availability');
			$table->dateTime('Start');
			$table->dateTime('End');
			$table->integer('Employee');
			$table->string('RecurrenceId');
			$table->string('RecurrenceRule');
			$table->string('RecurrenceException');
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
		Schema::drop('adminschedule');
	}

}
