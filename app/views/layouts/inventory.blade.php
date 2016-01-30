<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
  <title>CAE Web</title>
  <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
  
  <link type="text/css" href="../css/layouts.css" rel="stylesheet" />
  <link rel="stylesheet" href="../css/tabs.css">
  <link rel="stylesheet" href="../css/inventory/inventory.css" type="text/css" media="screen" charset="utf-8">
  <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/themes/humanity/jquery-ui.css" />

  <!--Load jQuery dependency -->
  <script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>  
  <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>


  <!--Load Libs for applicaion -->
  <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js"></script>
  <script src="../js/backbone.marionette.min.js"></script>
  <script src="../js/handlebars-v1.3.0.js"></script>

  <!--Initialize the Marionette app object -->
  <script src="../js/inventory/inventoryInit.js"></script>

  <!--Create modules in the app object that contain controllers -->
  <script src="../js/inventory/controllers/inventoryController.js"></script>
  <script src="../js/inventory/controllers/ordersController.js"></script>
  <script src="../js/inventory/controllers/placeOrdersController.js"></script>
  <script src="../js/inventory/controllers/viewLogController.js"></script>
  <script src="../js/inventory/controllers/vendorController.js"></script>
  
    <!--Create backbone models inside modules -->
  <script src="../js/inventory/models/itemModel.js"></script>
  <script src="../js/inventory/models/orderModel.js"></script>
  <script src="../js/inventory/models/vendorModel.js"></script>
  <script src="../js/inventory/models/logModel.js"></script>

  <!--Create Initial Tab view for app -->
  <script src="../js/inventory/views/inventoryTabView.js"></script>

  <!--Create all the item views -->
  <script src="../js/inventory/views/InventoryViews/inventoryItemView.js"></script>
  <script src="../js/inventory/views/InventoryViews/inventoryCompositeView.js"></script>
  <script src="../js/inventory/views/InventoryViews/itemDetailsModalVendorListView.js"></script>
  <script src="../js/inventory/views/InventoryViews/itemDetailsModalView.js"></script>
  <script src="../js/inventory/views/InventoryViews/itemAddModalView.js"></script>
  <script src="../js/inventory/views/InventoryViews/vendorAddModalView.js"></script>

  <!--Create all of the accept order views -->
  <script src="../js/inventory/views/OrderViews/orderItemView.js"></script>
  <script src="../js/inventory/views/OrderViews/orderCompositeView.js"></script>
  <script src="../js/inventory/views/OrderViews/orderDetailsModalView.js"></script>

  <!--Create all of the place order views -->
  <script src="../js/inventory/views/PlaceOrderViews/placeOrderItemView.js"></script>
  <script src="../js/inventory/views/PlaceOrderViews/placeOrderCompositeView.js"></script>
  <!--<script src="../js/inventory/views/PlaceOrderViews/orderDetailsModalView.js"></script>-->

  <!--Create all of the view log views -->
  <script src="../js/inventory/views/LogViews/viewLogItemView.js"></script>
  <script src="../js/inventory/views/LogViews/viewLogCompositeView.js"></script>

  <!--Create all of the vendor views -->
  <script src="../js/inventory/views/VendorViews/vendorItemView.js"></script>
  <script src="../js/inventory/views/VendorViews/vendorListView.js"></script>
  <script src="../js/inventory/views/VendorViews/vendorAddModalView.js"></script>
  <script src="../js/inventory/views/VendorViews/vendorDetailsModalView.js"></script>

  <!--Define util for templates, and main to kick the main application off -->
  <script src="../js/inventory/util.js"></script>
  <script src="../js/inventory/main.js"></script>
  
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
