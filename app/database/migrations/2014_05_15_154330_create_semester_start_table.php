<?php

use Illuminate\Database\Migrations\Migration;

class CreateSemesterStartTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('semester_start', function($table) {
			$table->string('id');
			$table->date('start_date');
			$table->date('end_date');
			$table->dateTime('updated_at');
			$table->dateTime('created_at');
			$table->primary('id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('semester_start');
	}

}