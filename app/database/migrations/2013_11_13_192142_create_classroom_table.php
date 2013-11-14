<?php

use Illuminate\Database\Migrations\Migration;

class CreateClassroomTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('classrooms', function($table) {
			$table->increments('id');
			$table->integer('RoomId');
			$table->string('Title');
			$table->dateTime('Start');
			$table->dateTime('End');
			$table->integer('Attendee');
			$table->string('RecurrenceId')->nullable;
			$table->string('RecurrenceRule')->nullable;
			$table->string('RecurrenceException')->nullable;
			$table->date('updated_at');
			$table->date('created_at');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('classrooms');
	}

}