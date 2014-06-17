<?php

use Illuminate\Database\Migrations\Migration;

class CreateAdminScheduleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('adminschedule', function($table) {
			$table->increments('id');
			$table->string('Title');
			$table->integer('Availability');
			$table->dateTime('Start');
			$table->dateTime('End');
			$table->integer('Employee');
			$table->string('RecurrenceId')->nullable;
			$table->string('RecurrenceRule')->nullable;
			$table->string('RecurrenceException')->nullable;
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