InventoryApp.module('ViewOrdersTab', function (ViewOrdersTab, App, Backbone, Marionette, $, _) {
  
  ViewOrdersTab.ViewOrdersController = {

    getOrders : function(callback) {
      if (typeof ViewOrdersTab.currentOrders === "undefined") {
        console.log('Getting Order Data');
        ViewOrdersTab.currentOrders = new InventoryApp.ViewOrdersTab.OrderCollection();
        ViewOrdersTab.currentOrders.fetch({success : callback});
      } else {
        callback();
      }
    },

    showOrdersTable : function(callback) {
      var tabContentDiv = new ViewOrdersTab.OrderCompositeView({collection: ViewOrdersTab.currentOrders,'contentName':'currentOrders/orderTable'});
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    showOrderDetailsModal : function(theModel) {
      $('#fade').addClass('fade');
      $('#modalBox').addClass('modalBox');
      var modalView = new ViewOrdersTab.OrderDetailsModalView({model:theModel});
      App.tabDiv.modalArea.show(modalView);
      if (theModel.get('status') === 0) {
        $('.acceptOrder').hide();
      }
    }
  };
});