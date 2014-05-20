InventoryApp.module('ViewOrdersTab', function (ViewOrdersTab, App, Backbone, Marionette, $, _) {
  ViewOrdersTab.OrderModel = Backbone.Model.extend({
    defaults : {
      'id' : null
    },

    urlRoot : 'api/orders',

    closeOrder: function() {
      this.set({
        'status' : 0
      });
      this.save();
      if (this.isValid()) {
      //  app.logCollection.logTransaction("Quantity Adjusted by " + adjustment, this);
      }
    }
    
  });

  ViewOrdersTab.OrderCollection = Backbone.Collection.extend({
    model : ViewOrdersTab.OrderModel,
    url : 'api/orders',

    initialize: function() {
      //this.on('add',this.sortCollection,this);
    },

    sortCollection: function() {
      console.log('Added One');
    },

    comparator: function(order) {
     return -(Number(order.get('id')));
    }

  });

  ViewOrdersTab.OrderItem = Backbone.Model.extend({
    defaults : {
      'id' : null,
      'item_id' : '0',
      'order_qty' : '0',
      'item_url' : ''
    }
  });

});