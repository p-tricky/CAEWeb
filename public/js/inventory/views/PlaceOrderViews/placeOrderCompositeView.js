InventoryApp.module('PlaceOrdersTab', function (PlaceOrdersTab, App, Backbone, Marionette, $, _) {
  PlaceOrdersTab.PlaceOrderCompositeView = Backbone.Marionette.CompositeView.extend({
    
    itemView: InventoryApp.PlaceOrdersTab.PlaceOrdersItemView,

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    id:'placeOrderTable',

    itemViewContainer: "tbody",

    events: {
      'click #placeOrder' : 'placeOrder'
    },

    placeOrder: function() {
      $('#placeOrder').prop('disabled',true);
      App.ViewOrdersTab.ViewOrdersController.getOrders(PlaceOrdersTab.PlaceOrdersController.createOrders);
    }
    
  });
});