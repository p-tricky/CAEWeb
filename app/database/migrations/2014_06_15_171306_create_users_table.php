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
			$t->string('username', 16);
			$t->integer('position_id')->unsigned();
			$t->string('email','40');
			$t->string('phone','10');
			$t->string('schedule_color','6');
			$t->boolean('acc_room');
			$t->boolean('acc_avlog');
			$t->boolean('acc_inv');
			$t->boolean('acc_emp');
			$t->boolean('acc_useradm');
			$t->boolean('acc_crud_timesheet');
			$t->boolean('acc_view_timesheet');
			$t->boolean('acc_gen_timesheet');
			$t->boolean('acc_crud_schedule');
			$t->timestamps();
			$t->foreign('position_id')->references('id')->on('positions');
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