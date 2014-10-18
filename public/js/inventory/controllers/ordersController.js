//Define module for the view orders tab to live in.
InventoryApp.module('ViewOrdersTab', function (ViewOrdersTab, App, Backbone, Marionette, $, _) {
  
  //Define controller for the place orders tab functions to live in.
  ViewOrdersTab.ViewOrdersController = {

    //Function to fetch the orders from the server if they are not already in the client side
    getOrders : function(callback) {
      //If the order collection does not already exist
      if (typeof ViewOrdersTab.currentOrders === "undefined") {
        console.log('Getting Order Data');
        //Instanciate the new collection to hold the orders
        ViewOrdersTab.currentOrders = new InventoryApp.ViewOrdersTab.OrderCollection();
        //Fetch the orders from the server side. On success call the callback function that was passed in.
        //This function will most likely be showOrderTable
        ViewOrdersTab.currentOrders.fetch({success : callback});
      } else {
        //Already have the collection. Just call the callback (showOrderTable)
        callback();
      }
    },

    //Function to show the order table once the order collection has been fetched
    showOrdersTable : function(callback) {
      //Instanciate a new OrderCompositeView and pass it the collection of orders to use, as well as the template name to use.
      var tabContentDiv = new ViewOrdersTab.OrderCompositeView({collection: ViewOrdersTab.currentOrders,'contentName':'currentOrders/orderTable'});
      //show the view in the tabContent
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    //Function to show the order details in the modal box area
    showOrderDetailsModal : function(theModel) {
      //Show the fade overlay
      $('#fade').addClass('fade');
      //show the modalbox
      $('#modalBox').addClass('modalBox');
      //Instanciate a new order details view and pass it the model that is sent to the function
      var modalView = new ViewOrdersTab.OrderDetailsModalView({model:theModel});
      //show the modal view
      App.tabDiv.modalArea.show(modalView);
      //If the order has already been closed, hid the accept order button.
      //We don't want to allow the user to accept the order multiple times.
      if (theModel.get('status') === 0) {
        $('.acceptOrder').hide();
      }
    }
  };
});