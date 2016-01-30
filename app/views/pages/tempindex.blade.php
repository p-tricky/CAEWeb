@extends('layouts.nosidebar')

@section('content')
	<!-- check for login error flash var -->
    @if(Session::has('flash_error'))
        <div class="flash_notice" id="flash_error">{{ Session::get('flash_error') }}</div>
    @endif

    <div class="contentwrapper" style="color: white; padding: 0px 20px; margin: 0px auto;">
    <h1>Welcome</h1>
    <p>
        The Computer Aided Engineering Web (CAE Web) provides information about the College of Engineering and Applied Sciences and its resources.
    </p></br>
    <p>
    For help with CAE Web, IT, A/V or building issue(s), please contact: 
        </p><p>
            CAE center staff<br> 
        </p></br> 
    </p>
@endsection
