<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('username', 16)->unique();
			$table->string('password', 60);
			$table->string('fullname', 40);
			$table->integer('position_id')->unsigned()->index('users_position_id_foreign');
			$table->string('email', 40);
			$table->string('phone', 10);
			$table->string('schedule_color', 7);
			$table->boolean('acc_crud_assets');
			$table->boolean('acc_room');
			$table->boolean('acc_avlog');
			$table->boolean('acc_inv');
			$table->boolean('acc_emp');
			$table->boolean('acc_useradm');
			$table->boolean('acc_crud_timesheet');
			$table->boolean('acc_view_timesheet');
			$table->boolean('acc_gen_timesheet');
			$table->boolean('acc_crud_schedule');
			$table->boolean('acc_notifications');
			$table->boolean('acc_super_user');
			$table->boolean('acc_sysadm');
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
		Schema::drop('users');
	}

}
