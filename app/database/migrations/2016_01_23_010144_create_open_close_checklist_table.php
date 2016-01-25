<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOpenCloseChecklistTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('open_close_checklist', function(Blueprint $table)
		{
			$table->increments('id');
			$table->date('task_date')->unique('task_date');
			$table->boolean('cico_system_on');
			$table->boolean('printers_on');
			$table->boolean('print_stations_on');
			$table->boolean('open_main_doors');
			$table->boolean('open_side_doors');
			$table->string('opened_by', 20);
			$table->boolean('cico_system_off');
			$table->boolean('printers_off');
			$table->boolean('print_stations_off');
			$table->boolean('close_main_doors');
			$table->boolean('close_side_doors');
			$table->boolean('refill_printer_paper');
			$table->boolean('push_in_chairs');
			$table->boolean('turn_off_machines');
			$table->boolean('recycle_prints');
			$table->boolean('lock_cae_office_doors');
			$table->string('closed_by', 20);
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
		Schema::drop('open_close_checklist');
	}

}
