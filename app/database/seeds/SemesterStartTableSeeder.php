<?php

class SemesterStartTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
    $lastFallStart = Date('Y-m-d', strtotime('september ' . Date('Y', strtotime('last year')) . ' first monday'));
    $lastFallEnd = Date('Y-m-d', strtotime('december 25 ' . Date('Y', strtotime('last year')) . ' -2 weeks next monday'));
    $fallStart = Date('Y-m-d', strtotime('september first monday'));
    $fallEnd = Date('Y-m-d', strtotime('december 25 first monday'));
    $nextFallStart = Date('Y-m-d', strtotime('september ' . Date('Y', strtotime('next year')) . ' first monday'));
    $nextFallEnd = Date('Y-m-d', strtotime('december 25 ' . Date('Y', strtotime('next year')) . ' -2 weeks next monday'));
    $lastSpringStart = Date('Y-m-d', strtotime('january ' . Date('Y', strtotime('last year')) . ' second monday'));
    $lastSpringEnd = Date('Y-m-d', strtotime('may ' . Date('Y', strtotime('last year')) . ' first monday'));
    $springStart = Date('Y-m-d', strtotime('january second monday'));
    $springEnd = Date('Y-m-d', strtotime('may first monday'));
    $nextSpringStart = Date('Y-m-d', strtotime('january ' . Date('Y', strtotime('next year')) . ' second monday'));
    $nextSpringEnd = Date('Y-m-d', strtotime('may ' . Date('Y', strtotime('next year')) . ' first monday'));
    $lastSummerStart = Date('Y-m-d', strtotime("$lastSpringEnd +1 weeks next monday"));
    $lastSummerEnd = Date('Y-m-d', strtotime("$lastFallStart -2 weeks next monday"));
    $summerStart = Date('Y-m-d', strtotime("$springEnd + 1 weeks next monday"));
    $summerEnd = Date('Y-m-d', strtotime("$fallStart -2 weeks next monday"));
    $nextSummerStart = Date('Y-m-d', strtotime("$nextSpringEnd +1 weeks next monday"));
    $nextSummerEnd = Date('Y-m-d', strtotime("$nextFallStart -2 weeks next monday"));
		\DB::table('semester_start')->delete();
        
    $semesters = array (
			0 => 
			array (
				'id' => 'fall'.explode('-', $lastFallStart)[0],
				'start_date' => $lastFallStart,
				'end_date' => $lastFallEnd,
				'updated_at' => '2014-07-08 00:00:00',
				'created_at' => '2014-07-08 00:00:00',
			),
			1 => 
			array (
				'id' => 'fall'.explode('-', $fallStart)[0],
				'start_date' => $fallStart,
				'end_date' => $fallEnd,
				'updated_at' => '2014-07-08 00:00:00',
				'created_at' => '2014-07-08 00:00:00',
			),
			2 => 
			array (
				'id' => 'fall'.explode('-', $nextFallStart)[0],
				'start_date' => $nextFallStart,
				'end_date' => $nextFallEnd,
				'updated_at' => '2014-07-08 00:00:00',
				'created_at' => '2014-07-08 00:00:00',
			),
			3 => 
			array (
				'id' => 'spring'.explode('-', $lastSpringStart)[0],
				'start_date' => $lastSpringStart,
				'end_date' => $lastSpringEnd,
				'updated_at' => '2014-07-08 00:00:00',
				'created_at' => '2014-07-08 00:00:00',
			),
			4 => 
			array (
				'id' => 'spring'.explode('-', $springStart)[0],
				'start_date' => $springStart,
				'end_date' => $springEnd,
				'updated_at' => '2014-07-08 00:00:00',
				'created_at' => '2014-07-08 00:00:00',
			),
			5 => 
			array (
				'id' => 'spring'.explode('-', $nextSpringStart)[0],
				'start_date' => $nextSpringStart,
				'end_date' => $nextSpringEnd,
				'updated_at' => '2014-11-03 17:20:13',
				'created_at' => '2014-11-03 17:20:13',
			),
			6 => 
			array (
				'id' => 'summer'.explode('-', $lastSummerStart)[0],
				'start_date' => $lastSummerStart,
				'end_date' => $lastSummerEnd,
				'updated_at' => '2015-11-30 10:30:00',
				'created_at' => '2015-11-30 10:30:00',
			),
			7 => 
			array (
				'id' => 'summer'.explode('-', $summerStart)[0],
				'start_date' => $summerStart,
				'end_date' => $summerEnd,
				'updated_at' => '2014-07-08 00:00:00',
				'created_at' => '2014-07-08 00:00:00',
			),
			8 => 
			array (
				'id' => 'summer'.explode('-', $nextSummerStart)[0],
				'start_date' => $nextSummerStart,
				'end_date' => $nextSummerEnd,
				'updated_at' => '2014-07-08 00:00:00',
				'created_at' => '2014-07-08 00:00:00',
			),
    );

    \DB::table('semester_start')->insert($semesters);
	}

}
