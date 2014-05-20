<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
	  Schema::create('vendor', function($table) {
	    $table->increments('id');
	    $table->string('name',20);
	    $table->string('url',150);
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
	  Schema::drop('vendor');
	}

}
