InventoryApp.module('PlaceOrdersTab', function (PlaceOrdersTab, App, Backbone, Marionette, $, _) {
  
  PlaceOrdersTab.PlaceOrdersController = {

    showPlaceOrderTable : function(callback) {
      var tabContentDiv = new PlaceOrdersTab.PlaceOrderCompositeView({collection: App.InventoryTab.currentInventory,'contentName':'placeOrders/placeOrderTable'});
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    createOrders : function() {
      if (PlaceOrdersTab.PlaceOrdersController._validateQuantities()) {
        PlaceOrdersTab.PlaceOrdersController._createRealOrders(PlaceOrdersTab.PlaceOrdersController._createTempOrders());
      } else {
        alert("Some of the quantities you entered are not valid");
        $('#placeOrder').prop('disabled',false);
      }
    },

    _validateQuantities : function() {
      var rows = $('.amount');
      var returnVal = true;
      _.each(rows, function(row) {
        var testNumber = Number($(row).val());
        if (isNaN(testNumber)) {
          returnVal = false;
        } else {
          if (testNumber < 0) {
            returnVal = false;
          } else {
            if (!(/^\d+$/.test(testNumber))) {
              returnVal = false;
            }
          }
        }
      });
      return returnVal;
    },

    _createTempOrders : function() {
      var okayToEnablePlaceOrderButton = true;
      //create a temporary order array and collection
      var tmpOrderArray = [];
      var tmpOrderCollection = new App.ViewOrdersTab.OrderCollection();

      //loop over each row in the place orders view, and record how many were ordered
      $('.orders tr').each(function() {
        var quantity = Number($(this).children().children('input').val());
        if (quantity > 0) {
          okayToEnablePlaceOrderButton = false;
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

            getModel[0].get('items').push(orderItem);

          //Otherwise, make a new Order based on that vendor id, an then append the item to the items attribute.
          } else {
            tmpOrderArray.push(vendorId);
            var itemsArray = [];
            var newOrderModel = new App.ViewOrdersTab.OrderModel({
              'vendor_id' : vendorId,
              'items' : itemsArray
            });

            newOrderModel.get('items').push(orderItem);
            tmpOrderCollection.add(newOrderModel);
          }
        }
      });
      if (okayToEnablePlaceOrderButton) {
          $('#placeOrder').prop('disabled',false);
      }
      //return the temp order collection to be used to actually create new orders.
      return tmpOrderCollection;
    },

    _createRealOrders : function(tempOrderCollection) {
      var counter = 0;

      _.each(tempOrderCollection.models, function(order) {
        App.ViewOrdersTab.currentOrders.create(order, {
          success : function() {
            _.each(order.get('items'), function(item) {
              var currentItem = App.InventoryTab.currentInventory.get(item.item_id);
              var currentOnOrderQty = currentItem.get('on_order_quantity');
              var newOnOrderQty = Number(currentOnOrderQty) + Number(item.order_qty);

              if (!currentItem.saveItem({'on_order_quantity':newOnOrderQty})) {
                alert("There was an error creating the order");
              }
              App.ViewOrdersTab.currentOrders.sort();
              //app.logCollection.logTransaction('Order of ' + item.orderQty + ' added', app.itemCollection.where({'id' : item.itemId})[0]);
            });
            counter++;
            if (counter == tempOrderCollection.length) {
              App.navigate('vieworders',true);
            }
          },
          error : function() {
            console.log('there was an error');
          }
        });
      });
    },

    showNumberErrorModal: function(){
      $('#fade').addClass('fade');
      $('#modalBox').addClass('modalBox');
      var modalView = new PlaceOrdersTab.PlaceOrderQuantityErrorView({});
      App.tabDiv.modalArea.show(modalView);
    },

    showOrderDetailsModal : function(theModel) {
      $('#fade').addClass('fade');
      $('#modalBox').addClass('modalBox');
      var modalView = new ViewOrdersTab.OrderDetailsModalView({model:theModel});
      App.tabDiv.modalArea.show(modalView);
    }

  };
});