@extends('layouts.nosidebar')

@section('content')	
	<!-- check for login error flash var -->
    @if(Session::has('flash_error'))
        <div class="flash_notice"  id="flash_error">{{ Session::get('flash_error') }}</div>
    @endif

	<div class="contentwrapper" style="color: white; padding: 0px 20px; margin: 0px auto;">
	<p>
		EMPLOYEE TAB
	</p>
@endsection