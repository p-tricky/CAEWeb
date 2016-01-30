<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
  <title>CAE Web</title>
  <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
  
  <link type="text/css" href="../css/layouts.css" rel="stylesheet" />
  <link rel="stylesheet" href="../css/tabs.css">
  <link rel="stylesheet" href="../css/employee/employee.css" type="text/css" charset="utf-8">

  <link rel="stylesheet" href="../css/roomschedule/kendo/kendo.common.css" type="text/css" charset="utf-8" />
  <link rel="stylesheet" href="../css/roomschedule/kendo/kendo.default.css" type="text/css" charset="utf-8">
  
  <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/themes/humanity/jquery-ui.css" />
  
  <!--Load jQuery dependency -->
  <script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>

  <!--Load Kendo Libs for application-->
  <script type="text/javascript" src="../js/employee/kendo/kendo.core.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.data.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.popup.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.list.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.dropdownlist.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.calendar.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.datepicker.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.timepicker.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.datetimepicker.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.userevents.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.numerictextbox.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.validator.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.binder.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.editable.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.multiselect.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.draganddrop.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.window.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.scheduler.recurrence.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.scheduler.view.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.scheduler.dayview.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.scheduler.agendaview.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.scheduler.monthview.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.scheduler.js"></script>
  <script type="text/javascript" src="../js/employee/kendo/kendo.colorpicker.js"></script>

  <!--Load Libs for applicaion -->
  <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js"></script>
  <script src="../js/backbone.marionette.min.js"></script>
  <script src="../js/handlebars-v1.3.0.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>
  <script src="../js/FileSaver.js"></script>
  <script src="../js/jspdf.js"></script>
  <script src="../js/jspdf.plugin.standard_fonts_metrics.js"></script>
  <script src="../js/jspdf.plugin.split_text_to_size.js"></script>
  <script src="../js/jquery-ui-timepicker-addon.js"></script>

  <!--Initialize the Marionette app object -->
  <script src="../js/employee/employeeInit.js"></script>

  <!--Create modules in the app object that contain controllers -->
  <script src="../js/employee/controllers/myHoursController.js"></script>
  <script src="../js/employee/controllers/attendantScheduleController.js"></script>
  <script src="../js/employee/controllers/programmerScheduleController.js"></script>
  <script src="../js/employee/controllers/adminScheduleController.js"></script>
  <script src="../js/employee/controllers/timesheetController.js"></script>
  <script src="../js/employee/controllers/employeeController.js"></script>
  <script src="../js/employee/controllers/shiftManagerController.js"></script>
  <script src="../js/employee/controllers/timesheetController.js"></script>
  
  <!--Create backbone models inside modules -->
  <script src="../js/employee/models/viewableTabsModel.js"></script>
  <script src="../js/employee/models/userPermissionsModel.js"></script>

  <script src="../js/employee/models/HoursModels/shiftModel.js"></script>

  <script src="../js/employee/models/ScheduleModels/adminScheduleModel.js"></script>
  <script src="../js/employee/models/ScheduleModels/attendantScheduleModel.js"></script>
  <script src="../js/employee/models/ScheduleModels/programmerScheduleModel.js"></script>
  <script src="../js/employee/models/ShiftManagerModels/shiftManagerModel.js"></script>
  <script src="../js/employee/models/ShiftManagerModels/userModel.js"></script>
  <script src="../js/employee/models/TimesheetModels/timesheetModel.js"></script> 

  <!--Create Initial Tab view for app -->
  <script src="../js/employee/views/employeeTabView.js"></script>
  <script src="../js/employee/views/tabviews/tabsItemView.js"></script>

  <!--Create myHours view -->
  <script src="../js/employee/views/hoursViews/myHoursView.js"></script>
  <script src="../js/employee/views/hoursViews/clockInOutView.js"></script>
  <script src="../js/employee/views/hoursViews/myShiftModalView.js"></script>
  <script src="../js/employee/views/hoursViews/shiftItemView.js"></script>
  <script src="../js/employee/views/hoursViews/shiftListView.js"></script>
  <script src="../js/employee/views/hoursViews/shiftFilterView.js"></script>

  <!--Create schedule view -->
  <script src="../js/employee/views/scheduleViews/scheduleView.js"></script>
  <script src="../js/employee/views/scheduleViews/admin/employeeSelectSectionItemView.js"></script>
  <script src="../js/employee/views/scheduleViews/admin/employeeSelectSectionCollectionView.js"></script>
  <script src="../js/employee/views/scheduleViews/attendant/employeeSelectSectionItemView.js"></script>
  <script src="../js/employee/views/scheduleViews/attendant/employeeSelectSectionCollectionView.js"></script>
  <script src="../js/employee/views/scheduleViews/programmer/employeeSelectSectionItemView.js"></script>
  <script src="../js/employee/views/scheduleViews/programmer/employeeSelectSectionCollectionView.js"></script>

  <!--Create Timesheet view--> 
  <script src="../js/employee/views/timesheetViews/timesheetView.js"></script>

  <!--Create Shift Manager view-->
  <script src="../js/employee/views/shiftManagerViews/shiftManagerView.js"></script>
  <script src="../js/employee/views/shiftManagerViews/newShiftModalView.js"></script>
  <script src="../js/employee/views/shiftManagerViews/myShiftModalView.js"></script>
  <script src="../js/employee/views/shiftManagerViews/shiftItemView.js"></script>
  <script src="../js/employee/views/shiftManagerViews/shiftListView.js"></script>
  <script src="../js/employee/views/shiftManagerViews/shiftFilterView.js"></script>
  <script src="../js/employee/views/shiftManagerViews/shiftSearchView.js"></script>
  <script src="../js/employee/views/shiftManagerViews/newShiftView.js"></script>
  <script src="../js/employee/views/shiftManagerViews/userItemView.js"></script>
  <script src="../js/employee/views/shiftManagerViews/userCollectionView.js"></script>

  <!--Define util for templates, and main to kick the main application off -->
  <script src="../js/employee/util.js"></script>
  <script src="../js/employee/main.js"></script>
  
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
