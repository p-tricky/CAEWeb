<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAssetsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('assets', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('brand_name', 50);
			$table->string('serial_number', 50);
			$table->string('asset_tag', 25)->nullable();
			$table->string('description');
			$table->string('room', 10);
			$table->integer('department_id')->unsigned();
			$table->string('mac_address', 50)->nullable();
			$table->string('ip_address', 50)->nullable();
			$table->string('asset_type', 50);
			$table->string('assignee_name', 50)->nullable();
			$table->boolean('active');
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
		Schema::drop('assets');
	}

}
