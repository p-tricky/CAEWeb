<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomTypeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
	  Schema::create('ceas_room_types', function($table) {
	    $table->increments('id');
	    $table->string('name');
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
	  Schema::drop('ceas_room_types');
	}

}
