<!DOCTYPE html>
<!-- 01100011 01100001 01100101 -->
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
	<title>CAE Web</title>
	<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
	
	<link type="text/css" href="css/layouts.css" rel="stylesheet" />

	<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
</head>
<?php   $url_home = URL::route('home');
	    $url_logout = URL::route('logout');
	    $url_login = URL::route('login');
	    $url_schedule = URL::to('/roomschedule');
	    $url_inventory = URL::to('/inventory');
	    $url_avlog = URL::to('/avlog');
	    $url_employee = URL::to('/employee');
        $url_user_admin = URL::to('/useradmin');
        $url_system_admin = URL::to('/systemadmin');
        $url_asset_management = URL::to('/assets');
?>
<body class="nosidebar">
	<div id="header-wrapper">
		<div id="header">
			<div id="header-logo">
				<a title="CAE" href="<?php echo $url_home; ?>">
						<img src="img/caeweb.png" alt="CAE" id="logo" height="55"/>
				</a>
			</div>
			<div id="header-greet">
				@if(Auth::check())
                	<p> </br>Welcome,
                	<?php
                    echo Auth::user()->fullname;
                	?> - <a href="<?php echo $url_logout; ?>">Logout</a></br>
                @else
                    <p> </br>@yield('logininfo', 'Welcome, CAE User!') </p>
                @endif

			</div>
			<div id="header-menu">
				<ul id="jsddm">
		          <li><a href="<?php echo $url_home; ?>">Home</a></li>
          		  <li><a href="<?php echo $url_asset_management; ?>">Assets</a></li>
		          <li><a href="<?php echo $url_schedule; ?>">Room Scheduling</a></li>
		          <li><a href="<?php echo $url_avlog; ?>">Audio/Visual</a></li>
		          <li><a href="<?php echo $url_inventory; ?>">Inventory</a></li>
          		  <li><a href="<?php echo $url_system_admin; ?>">System Admin</a></li>
		          <li><a href="<?php echo $url_employee; ?>">Employee</a></li>
		          <li><a href="<?php echo $url_user_admin; ?>">User Admin</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div id="content-wrapper">
		<div id="content">
			<!-- check for flash notification message -->
	        @if(Session::has('flash_notice'))
	            <div class="flash_notice" id="flash_notice">{{ Session::get('flash_notice') }}</div>
	        @endif

			@yield('content')
		</div>
	</div>
	<div id="footer-wrapper">
		<div id="footer">
		</div>
	</div>
</body>
</html>
