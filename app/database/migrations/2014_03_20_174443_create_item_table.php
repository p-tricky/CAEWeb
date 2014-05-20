<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
	  Schema::create('item', function($table) {
	    $table->increments('id');
	    $table->string('name',15);
	    $table->string('description',100);
	    $table->integer('quantity');
	    $table->integer('vendor_id');
	    $table->integer('email_threshold');
	    $table->string('item_url',150);
	    $table->integer('on_order_quantity');
	    $table->boolean('active');
	    $table->dateTime('updated_at');
	    $table->dateTime('created_at');
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
