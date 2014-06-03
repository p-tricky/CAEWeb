InventoryApp.addRegions({
  tabArea: '#tabsDiv'
});

InventoryApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

InventoryApp.InventoryAppController = {
    currentinventory : function() {
      InventoryApp.tabDiv = new InventoryApp.InventoryTab.InventoryView({'tabName':'currentInventoryTab'});
      InventoryApp.tabArea.show(InventoryApp.tabDiv);
      InventoryApp.InventoryTab.InventoryController.getInventory(InventoryApp.InventoryTab.InventoryController.showInventoryTable);
    },

    vieworders : function() {
      InventoryApp.tabDiv = new InventoryApp.InventoryTab.InventoryView({'tabName':'viewOrdersTab'});
      InventoryApp.tabArea.show(InventoryApp.tabDiv);
      InventoryApp.ViewOrdersTab.ViewOrdersController.getOrders(InventoryApp.ViewOrdersTab.ViewOrdersController.showOrdersTable);
    },

    placeorder : function() {
      InventoryApp.tabDiv = new InventoryApp.InventoryTab.InventoryView({'tabName':'placeOrderTab'});
      InventoryApp.tabArea.show(InventoryApp.tabDiv);
      InventoryApp.InventoryTab.InventoryController.getInventory(InventoryApp.PlaceOrdersTab.PlaceOrdersController.showPlaceOrderTable);
    },

    viewlog : function() {
      InventoryApp.tabDiv = new InventoryApp.InventoryTab.InventoryView({'tabName':'viewLogTab'});
      InventoryApp.tabArea.show(InventoryApp.tabDiv);
      InventoryApp.ViewLogTab.ViewLogController.getLog(InventoryApp.ViewLogTab.ViewLogController.showLog);
    }
};

InventoryApp.Router = new Marionette.AppRouter({
  controller:InventoryApp.InventoryAppController,
  appRoutes:{
    "currentinventory" : "currentinventory",
    "vieworders" : "vieworders",
    "placeorder" : "placeorder",
    "viewlog" : "viewlog"
  }
});

InventoryApp.on('initialize:after', function() {
  tpl.loadTemplates(['currentInventoryTab','placeOrderTab','viewLogTab','viewOrdersTab'], function() {
    //start the backbone history
    InventoryApp.ViewLogTab.logCollection = new InventoryApp.ViewLogTab.LogCollection();
    InventoryApp.ViewLogTab.logCollection.fetch({success : function() {
      var result = Backbone.history.start({pushState: true, root: "/caeweb/inventory/"});//, silent:true});
    }});
  });
});

InventoryApp.start();