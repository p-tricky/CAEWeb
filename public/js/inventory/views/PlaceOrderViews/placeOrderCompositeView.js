//Define module for the place orders tab to live in.
InventoryApp.module('PlaceOrdersTab', function (PlaceOrdersTab, App, Backbone, Marionette, $, _) {
  //Define a composite view to display the place order table
  PlaceOrdersTab.PlaceOrderCompositeView = Backbone.Marionette.CompositeView.extend({
    
    //Define the item view that will work in conjuction with this view to make the table
    itemView: InventoryApp.PlaceOrdersTab.PlaceOrdersItemView,

    //Function that will be called when this view is instanciated
    initialize : function(options) {
      //fetch any options out of the parameters
      this.options = options || {};
      //use the tpl function to get the template name out of the options and then
      //pass the template to handlebars before it assigns the template to the view
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //Define an id for this view
    id:'placeOrderTable',

    //Define the item view container that all the item views will be rendered in
    itemViewContainer: "tbody",

    //Define any events that might occur.
    events: {
      'click #placeOrder' : 'placeOrder'
    },

    //Function that will run when the place order button is clicked
    placeOrder: function() {
      //Disable the place order button to prevent trolls from spamming it
      $('#placeOrder').prop('disabled',true);
      //Call the getOrders method to ensure that the orders collection is in memory.
      //Pass the create order method as the callback to the get orders function.
      App.ViewOrdersTab.ViewOrdersController.getOrders(PlaceOrdersTab.PlaceOrdersController.createOrders);
    }
    
  });
});