<?php

use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function($t)
		{
			$t->increments('id');
			$t->string('username', 16);
			$t->string('password', 64);
			$t->boolean('acc_dir');
			$t->boolean('acc_room');
			$t->boolean('acc_audio');
			$t->boolean('acc_inv');
			$t->boolean('acc_emp');
			$t->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}