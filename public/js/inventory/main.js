//Define the region where the tabs will go.
InventoryApp.addRegions({
  tabArea: '#tabsDiv'
});

//Define a method that can be used to navigate the app to a particular URL.
InventoryApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

//Define the main controller to be used with the router listed below.
InventoryApp.InventoryAppController = {
    //function to be called when the currentinventory route is in the url
    currentinventory : function() {
      //Create a new tab view passing the currentInventory tab as the tabname.
      InventoryApp.tabDiv = new InventoryApp.InventoryTab.InventoryView({'tabName':'currentInventoryTab'});
      InventoryApp.tabArea.show(InventoryApp.tabDiv); //show the tab
      //Call the function to get the inventory, and pass the show inventory function as the callback to call on success.
      InventoryApp.InventoryTab.InventoryController.getInventory(InventoryApp.InventoryTab.InventoryController.showInventoryTable);
    },

    //function to be called when the vieworders route is in the url
    vieworders : function() {
      //Create a new tab view passing the viewOrders tab as the tabname.
      InventoryApp.tabDiv = new InventoryApp.InventoryTab.InventoryView({'tabName':'viewOrdersTab'});
      InventoryApp.tabArea.show(InventoryApp.tabDiv); //show the tab
      //Call theh function to get the orders, and pass the show orders function as the callback on success.
      InventoryApp.ViewOrdersTab.ViewOrdersController.getOrders(InventoryApp.ViewOrdersTab.ViewOrdersController.showOrdersTable);
    },

    //function to be called when the placeorder route is in the url
    placeorder : function() {
      //Create a new tab view passing the placeOrder tab as the tabname.
      InventoryApp.tabDiv = new InventoryApp.InventoryTab.InventoryView({'tabName':'placeOrderTab'});
      InventoryApp.tabArea.show(InventoryApp.tabDiv); //show the tab
      //Call the function to get the inventory, and pass the show orders function as the callback to call on sucess.
      InventoryApp.InventoryTab.InventoryController.getInventory(InventoryApp.PlaceOrdersTab.PlaceOrdersController.showPlaceOrderTable);
    },

    //function to be called when the viewlog route is in the url
    viewlog : function() {
      //Create a new tab view passing the viewLog tab as the tabname.
      InventoryApp.tabDiv = new InventoryApp.InventoryTab.InventoryView({'tabName':'viewLogTab'});
      InventoryApp.tabArea.show(InventoryApp.tabDiv); //show the tab
      //Call the function to get the log, and pass the show log function as the callback to call on success.
      //The log should not need to be created and fetched since the log is created and fetched in the initalize
      //function below. However just in case it fails, or is not in memory, this will ensure that it is before
      //it gets displayed.
      InventoryApp.ViewLogTab.ViewLogController.getLog(InventoryApp.ViewLogTab.ViewLogController.showLog);
    },

    vendor : function() {
      InventoryApp.tabDiv = new InventoryApp.InventoryTab.InventoryView({'tabName':'vendorTab'});
      InventoryApp.tabArea.show(InventoryApp.tabDiv);
      InventoryApp.VendorTab.VendorController.getVendors(InventoryApp.VendorTab.VendorController.showVendors);
    }
};

//Define the router that will listen to the URL, and call the correct associated function.
InventoryApp.Router = new Marionette.AppRouter({
  controller:InventoryApp.InventoryAppController,
  appRoutes:{
    "currentinventory" : "currentinventory",
    "vieworders" : "vieworders",
    "placeorder" : "placeorder",
    "viewlog" : "viewlog",
    "vendor" : "vendor"
  } 
});

//Setup the things that need to start when the App is started. This includes getting inital templates, and starting the history.
InventoryApp.on('initialize:after', function() {
  //load any inital templates that may be needed.
  tpl.loadTemplates(['currentInventoryTab','placeOrderTab','viewLogTab','viewOrdersTab','vendorTab'], function() {
    //Create a new Log collection for the logging of the app.
    InventoryApp.ViewLogTab.logCollection = new InventoryApp.ViewLogTab.LogCollection();
    //Fetch the log, and on success of the fetch, call the history.start to start the backbone history
    InventoryApp.ViewLogTab.logCollection.fetch({success : function() {
      var result = Backbone.history.start({pushState: true, root: "/caeweb/inventory/"});//, silent:true});
    }});
  });
});

//Start the Marionette app. This will cause the initalize defined above to run, and the router to start listening to the URLs.
InventoryApp.start();