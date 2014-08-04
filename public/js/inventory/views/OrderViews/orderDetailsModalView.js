//Define module for the view orders tab to live in.
InventoryApp.module('ViewOrdersTab', function (ViewOrdersTab, App, Backbone, Marionette, $, _) {
  //Define the Item View to be used in displaying the modal box of an specific order
  ViewOrdersTab.OrderDetailsModalView = Backbone.Marionette.ItemView.extend({

    //Define the tagname for this view. div is the default, but we specified it anyway
    tagName : "div",

    //Function that is called when this view is instanciated
    initialize : function() {
      //use the tpl function to get the template name out of the options and then
      //pass the template to handlebars before it assigns the template to the view
      //This is one of if not the only template that uses some of the functionality of
      //handlebars to iterate through the items of the order and display them in a sub
      //table. Refer to how the template looks and the mustache or handlebars docs for more info.
      this.template = Handlebars.compile(tpl.get('currentOrders/orderDetailsModal'));
    },

    //Define events for the view, and thier associated functions
    events : {
      'click .acceptOrder' : 'acceptOrder',
      'click .cancel' : 'cancelAction'
    },

    //Function that is called when the accpet Order button is clicked
    //TODO: Take a look at how the function is adding the quantity to the items. getInventory looks as though
    //it is getting called a lot through this process. Is there a better way that ensures the inventory is
    //only fetched once, and then just reused each time?
    acceptOrder : function() {
      //Define a reference to the view
      var that = this;
      //For each item in an order run the anonymous function passing the orderItem, orderIndex, and orderList
      _.each(this.model.get('items'), function(orderItem,orderIndex,orderList) {
        //Call the getInventory function of the Inventory Controller, and pass the anonymous function as a callback
        //It could be that the invenory is already loaded and on the server side, but in case it isn't, this will get it.
        InventoryApp.InventoryTab.InventoryController.getInventory(function() {
          //Fetch the item out of the inventory collection using the orderItems item_id
          var itemToUpdate = InventoryApp.InventoryTab.currentInventory.get(orderItem.item_id);
          //Use the addOrderQty function of the item model to increase the quantity of the item
          //by the order quantity
          itemToUpdate.addOrderQty(orderItem.order_qty);
        });
        //close the order out by calling the close order function of the model
        //TODO: this is happening inside the _.each. It may be getting called for each
        //of the items in the order, and should really only be called once after all of the
        //items have been processed.
        that.model.closeOrder();
      });
      //All of the items have been updated. Set a result of the process to true
      //TODO: This really ought to be inside the function that does the work of
      //updating the quantities of the items.
      var result = true;
      //If the accepting of the order succeeds with no failures
      if (result) {
        //Remove the fade overlay and the modal box
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        //Close the modal view
        App.tabDiv.modalArea.close();
      }
    },

    //Function that is called when the Cancel Button is clicked
    cancelAction : function() {
      //Remove the fade overlay and the modal box
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      //Close the modal view
      App.tabDiv.modalArea.close();
    }
  });
});