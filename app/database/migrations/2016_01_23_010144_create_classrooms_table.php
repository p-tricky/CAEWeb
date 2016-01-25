<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateClassroomsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('classrooms', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('RoomId');
			$table->string('Title');
			$table->dateTime('Start');
			$table->dateTime('End');
			$table->integer('Attendee');
			$table->string('Host');
			$table->string('RecurrenceId');
			$table->string('RecurrenceRule');
			$table->string('RecurrenceException');
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
