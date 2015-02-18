//Define module for the place orders tab to live in.
InventoryApp.module('PlaceOrdersTab', function (PlaceOrdersTab, App, Backbone, Marionette, $, _) {
  
  //Define a place orders controller for all of the functions for place order to live in.
  PlaceOrdersTab.PlaceOrdersController = {

    //Function to create a new place order composite view, and show it.
    showPlaceOrderTable : function(callback) {
      //Create new place order composite view passing it the current inventory collection, and the template to use.
      var tabContentDiv = new PlaceOrdersTab.PlaceOrderCompositeView({collection: App.InventoryTab.currentInventory,'contentName':'placeOrders/placeOrderTable'});
      //Show the new composite view
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    //Function to create orders when the place order button is clicked.
    createOrders : function() {
      //Valiate the quantities to see if they are all valid.
      if (PlaceOrdersTab.PlaceOrdersController._validateQuantities()) {
        //All quantities valid. Call the create temp orders function.
        PlaceOrdersTab.PlaceOrdersController._createRealOrders(PlaceOrdersTab.PlaceOrdersController._createTempOrders());
      } else { //All quantities are not valid
        //alert the user that the quantities are not valid. 
        //uses a confirm modal with only one button
        $('#confirmModalBox').html('Some of the quantities you entered are not valid');
        $('#confirmModalBox').dialog({
          modal:true,
          title: 'Invalid quantities',
          buttons: {
            'Ok': function() {
              $(this).dialog('close');
            }
          },
        });
        //Disable the placeOrder button so it can't be clicked until the quantities are fixed.
        $('#placeOrder').prop('disabled',false);
      }
    },

    //Function to validate the quantities that have been entered for an order
    _validateQuantities : function() {
      //Get all of the item rows that have a quantity
      var rows = $('.amount');
      //define a return value of true
      var returnVal = true;
      //for each row do the following.
      _.each(rows, function(row) {
        //Get the value from the textbox
        var testNumber = Number($(row).val());
        //if the value is not a number set returnval to false
        if (isNaN(testNumber)) {
          returnVal = false;
        } else {
          //if the value is less than zero set returnval to false
          if (testNumber < 0) {
            returnVal = false;
          } else {
            //If the value fails the regular expression test set returnval to false
            if (!(/^\d+$/.test(testNumber))) {
              returnVal = false;
            }
          }
        }
      });
      //return the returnval. It will be true still if it passes all tests. False if it is not valid.
      return returnVal;
    },

    //Function to loop through all of the items and create an order for each vendor.
    //All ordered items for a particular vendor will added to this temporary order.
    _createTempOrders : function() {
      //Bool to determine if the place order button should be enabled or disabled
      var okayToEnablePlaceOrderButton = true;
      //create a temporary order array and collection
      var tmpOrderArray = [];
      var tmpOrderCollection = new App.ViewOrdersTab.OrderCollection();

      //loop over each row in the place orders view, and record how many were ordered
      $('.orders tr').each(function() {
        //Get the quantity and turn it into a number
        var quantity = Number($(this).children().children('input').val());
        //If the quantity is greater than 0
        if (quantity > 0) {
          //disable the place order button
          okayToEnablePlaceOrderButton = false;
          //Fetch the item id, then the model based on the item id.
          //Then fetch the vendor id, item name, and item url from the model
          var itemId = $(this).attr('id');
          var model = App.InventoryTab.currentInventory.get(itemId);
          var vendorId = model.get('vendor_id');
          var itemName = model.get('name');
          var itemUrl = model.get('item_url');

          //Create a new OrderItem to be used in the items attribute of the order.
          var orderItem = new App.ViewOrdersTab.OrderItem({
            'item_id' : itemId,
            'order_qty' : quantity,
            'name' : itemName,
            'item_url' : itemUrl
          });

          //If there is already a order created for that vendor, append the item to the items attribute.
          if ($.inArray(vendorId, tmpOrderArray) != -1) {
            var getModel = tmpOrderCollection.where({
              'vendor_id' : vendorId
            });

            //Add the new orderItem to the existing model in the tempOrderCollection
            getModel[0].get('items').push(orderItem);

          //Otherwise, make a new Order based on that vendor id, an then append the item to the items attribute.
          } else {
            //Add the vendor to the temp vendor list
            tmpOrderArray.push(vendorId);
            //Create an array for the items to be ordered from the vendor
            var itemsArray = [];
            //Create a new order model and set the vendor id, and items array to the model
            var newOrderModel = new App.ViewOrdersTab.OrderModel({
              'vendor_id' : vendorId,
              'items' : itemsArray
            });

            //Add the new orderItem to the new model
            newOrderModel.get('items').push(orderItem);
            //Add the new model to the tempOrderCollection
            tmpOrderCollection.add(newOrderModel);
          }
        }
      });

      //If the place order button should be enabled, enable it.
      if (okayToEnablePlaceOrderButton) {
          $('#placeOrder').prop('disabled',false);
      }
      //return the temp order collection to be used to actually create new orders.
      return tmpOrderCollection;
    },

    //Function to take the tempOrderCollection and turn it into real orders that will be
    //persisted to the database.
    _createRealOrders : function(tempOrderCollection) {

      var counter = 0;
      //For each order in the temp order collection
      _.each(tempOrderCollection.models, function(order) {
        //Add the order to the collection of current orders fetched originally from the server
        App.ViewOrdersTab.currentOrders.create(order, {
          //On success of addition, and persistance to the server side run the anonymous function
          success : function() {
            //For each item in the order
            _.each(order.get('items'), function(item) {
              //Get the item from the item collection
              var currentItem = App.InventoryTab.currentInventory.get(item.item_id);
              //get the current order quantity
              var currentOnOrderQty = currentItem.get('on_order_quantity');
              //Number both fields and add them together as the new on order quantity
              var newOnOrderQty = Number(currentOnOrderQty) + Number(item.order_qty);

              //Attempt to save the save the item by calling the save item method of the item model
              //It passes the on_order_quantity parameter. If it fails, it will do the alert.
              if (!currentItem.saveItem({'on_order_quantity':newOnOrderQty})) {
                $('#confirmModalBox').html('There was an error creating the order');
                $('#confirmModalBox').dialog({
                  modal:true,
                  title: 'Create Order Error',
                  buttons: {
                    'Ok': function() {
                        $(this).dialog('close');
                    }
                  },
                });
              }
              //Sort the collection of current orders based on the comparator function of the collection definition
              App.ViewOrdersTab.currentOrders.sort();
              //Add to the log that there was an order created
              App.ViewLogTab.ViewLogController.logTransaction('Quantity of ' + item.order_qty + ' On Order From Placed Order', App.InventoryTab.currentInventory.where({'id' : item.item_id})[0]);
            });
            
            //Increment the counter of orders created.
            counter++;
            //If the counter matches the length of the temp order collection
            if (counter == tempOrderCollection.length) {
              //All done creating the orders, navigate to the vieworders route to see the newly created orders.
              App.navigate('vieworders',true);
            }
          },
          //On error console.log that there was an error. TODO:Add better error handeling here.
          error : function() {
            console.log('there was an error');
          }
        });
      });
    },

    //Function to show the modal box with an error for incorrect numbers
    showNumberErrorModal: function(){
      //Show the fade overlay
      $('#fade').addClass('fade');
      //show the modal box
      $('#modalBox').addClass('modalBox');
      //create a new view from the place order quantity error view
      var modalView = new PlaceOrdersTab.PlaceOrderQuantityErrorView({});
      //show the view in the modal area
      App.tabDiv.modalArea.show(modalView);
    },

    //Function to show the modal box with order details
    showOrderDetailsModal : function(theModel) {
      //Show the fade overlay
      $('#fade').addClass('fade');
      //Show the modal box
      $('#modalBox').addClass('modalBox');
      //create a new view from the order detail modal view
      var modalView = new ViewOrdersTab.OrderDetailsModalView({model:theModel});
      //show the view in the modal area
      App.tabDiv.modalArea.show(modalView);
    }

  };
});