<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLabCheckoutsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('lab_checkouts', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 50);
			$table->string('lab', 10);
			$table->string('phone_number', 15);
			$table->string('email', 50);
			$table->date('checkout_date');
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
		Schema::drop('lab_checkouts');
	}

}
