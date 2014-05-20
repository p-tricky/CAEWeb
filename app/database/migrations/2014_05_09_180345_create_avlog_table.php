<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAvlogTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
	  Schema::create('av_log', function($table) {
	    $table->increments('id');
	    $table->string('room_name');
	    $table->text('message');
	    $table->string('username');
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
	  Schema::drop('av_log');
	}

}
