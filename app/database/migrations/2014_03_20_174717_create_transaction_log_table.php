<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionLogTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
	  Schema::create('trans_log', function($table) {
	    $table->increments('id');
	    $table->integer('user_id');
	    $table->integer('item_id');
	    $table->string('action');
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
	  Schema::drop('trans_log');
	}

}
