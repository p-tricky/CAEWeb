//Define module for the view orders tab to live in.
InventoryApp.module('ViewOrdersTab', function (ViewOrdersTab, App, Backbone, Marionette, $, _) {
  //Define a order model to be used when viewing orders, and creating new orders.
  ViewOrdersTab.OrderModel = Backbone.Model.extend({
    //Define defaults for new models
    defaults : {
      'id' : null
    },

    //url to persistace data to
    urlRoot : 'api/orders',

    //Function to close out an order
    closeOrder: function() {
      //Set the status property to zero
      this.set({
        'status' : 0
      });
      //Save the model
      this.save();
    }
    
  });

  //Define a order collection based on the above model
  ViewOrdersTab.OrderCollection = Backbone.Collection.extend({
    //Define which model to use for the collection
    model : ViewOrdersTab.OrderModel,
    //url used to persist data to the server
    url : 'api/orders',

    //comparator function used to sort the collection when .sort is called on the collection
    comparator: function(order) {
     return -(Number(order.get('id')));
    }

  });

  //Define a model to be used when a new order is being created.
  //This model represents a single item within an order.
  ViewOrdersTab.OrderItem = Backbone.Model.extend({
    //Define defaults for new models that are created
    defaults : {
      'id' : null,
      'item_id' : '0',
      'order_qty' : '0',
      'item_url' : ''
    }
  });

});