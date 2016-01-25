<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('item', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 25);
			$table->string('description', 100);
			$table->integer('quantity');
			$table->integer('vendor_id');
			$table->integer('email_threshold');
			$table->string('item_url', 150);
			$table->integer('on_order_quantity');
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
		Schema::drop('item');
	}

}
