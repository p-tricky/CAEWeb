InventoryApp.module('ViewOrdersTab', function (ViewOrdersTab, App, Backbone, Marionette, $, _) {
  ViewOrdersTab.OrderDetailsModalView = Backbone.Marionette.ItemView.extend({

    tagName : "div",

    initialize : function() {
      this.template = Handlebars.compile(tpl.get('currentOrders/orderDetailsModal'));
    },

    events : {
      'click .acceptOrder' : 'acceptOrder',
      'click .cancel' : 'cancelAction'
    },

    acceptOrder : function() {
      var that = this;
      _.each(this.model.get('items'), function(orderItem,orderIndex,orderList) {
        InventoryApp.InventoryTab.InventoryController.getInventory(function() {
          //console.log(orderItem);
          var itemToUpdate = InventoryApp.InventoryTab.currentInventory.get(orderItem.item_id);
          itemToUpdate.addOrderQty(orderItem.order_qty);
        });
        that.model.closeOrder();
      });
      var result = true;
      if (result) {
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        App.tabDiv.modalArea.close();
      }
    },

    cancelAction : function() {
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      App.tabDiv.modalArea.close();
    }
  });
});