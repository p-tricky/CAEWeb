<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
  <title>CAE Web</title>
  <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
  
 <link type="text/css" href="../css/layouts.css" rel="stylesheet" />
  <link rel="stylesheet" href="../css/tabs.css">
  <link rel="stylesheet" href="../css/assets/assetManagement.css" type="text/css" media="screen" charset="utf-8">

  <!--Load jQuery dependency -->
  <script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>

  <!--Load Libs for applicaion -->
  <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js"></script>
  <script src="../js/backbone.marionette.min.js"></script>
  <script src="../js/handlebars-v1.3.0.js"></script>

  <!--Load jQuery for ui for dialog modals-->
  <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>
  <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/themes/humanity/jquery-ui.css" />

  <!--Initialize the Marionette app object -->
  <script src="../js/assets/assetManagementInit.js"></script>

  <!--Create modules in the app object that contain controllers -->
  <script src="../js/assets/controllers/assetManagementController.js"></script>

  <!--Create backbone models inside modules -->
  <script src="../js/assets/models/assetModel.js"></script>
  <script src="../js/assets/models/departmentModel.js"></script>

  <!--Create Initial Tab view for app -->
  <script src="../js/assets/views/assetSectionsView.js"></script>
  <script src="../js/assets/views/assetManagementTabView.js"></script>
  <script src="../js/assets/views/assetDepartmentItemView.js"></script>
  <script src="../js/assets/views/assetDepartmentCompositeView.js"></script>
  <script src="../js/assets/views/assetItemView.js"></script>
  <script src="../js/assets/views/assetCompositeView.js"></script>
  <script src="../js/assets/views/assetAddModalView.js"></script>
  <script src="../js/assets/views/assetDetailsModalView.js"></script>
  <script src="../js/assets/views/assetFilterView.js"></script>

  <!--Define util for templates, and main to kick the main application off -->
  <script src="../js/assets/util.js"></script>
  <script src="../js/assets/main.js"></script>
  
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
  <div  id="fade">
  </div>
  <div id="header-wrapper">
    <div id="header">
      <div id="header-logo">
        <a title="CAE" href="<?php echo $url_home; ?>">
            <img src="../img/caeweb.png" alt="CAE" id="logo" height="55"/>
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
      <div id="tabsDiv">
        <div id="innerTabsDiv">
          {{ $contentTabHolder }}
        </div>
      </div>
    </div>
  </div>
  <div id="footer-wrapper">
    <div id="footer">
    </div>
  </div>
</body>
</html>
