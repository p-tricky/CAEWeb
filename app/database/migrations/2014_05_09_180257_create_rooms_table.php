<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
	  Schema::create('ceas_rooms', function($table) {
	    $table->increments('id');
	    $table->string('name');
	    $table->integer('capacity');
	    $table->integer('type');
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
	  Schema::drop('ceas_rooms');
	}

}
