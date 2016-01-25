<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVirusUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('virus_users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('user_name')->unique('user_name');
			$table->integer('total')->unsigned();
			$table->date('last_scanned');
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
		Schema::drop('virus_users');
	}

}
