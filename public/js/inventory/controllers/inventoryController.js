//Define module for the inventory tab to live in.
InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  
  //Define controller for the inventory tab functions to live in.
  InventoryTab.InventoryController = {

    //Function to get the inventory if it has not already been fetched
    getInventory : function(callback) {
      //If the inventory collection does not already exist
      if (typeof InventoryTab.currentInventory === "undefined") {
        console.log('Getting Inventory Data');
        //Instanciate a new inventory collection
        InventoryTab.currentInventory = new InventoryApp.InventoryTab.ItemCollection();
        //fetch the data for the collection and call the callback on success.
        //The callback will most likely be showInventoryTable
        InventoryTab.currentInventory.fetch({success : callback});
      } else {
        //Already have the collection. Call callback (showInventoryTable)
        callback();
      }
    },

    //Function to show the inventory table.
    showInventoryTable : function() {
      //Instanciate a new inventory composite view and pass it the inventory collection as well as the template to use
      var tabContentDiv = new InventoryTab.InventoryCompositeView({collection: InventoryTab.currentInventory,'contentName':'currentInventory/inventoryTable'});
      //show the view in the tab content
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    //Function to get the vendors collection if it has not already been fetched
    getVendors : function(callback) {
      //If the vendor collection does not already exist
      if (typeof InventoryTab.vendorCollection === "undefined") {
        console.log('Getting Vendor List');
        //Instanciate a new vendor collection
        InventoryTab.vendorCollection = new InventoryTab.VendorCollection();
        //fetch the data for the collection and call the callback on success
        //The call back for this function could be a number of different functions.
        //In the two below methods, it is a anonymous function that gets passed in.
        InventoryTab.vendorCollection.fetch({success : callback});
      } else {
        //Already have the collection. Call the callback
        callback();
      }
    },

    //Function to show the inventory modal for an existing model in the item collection
    showInventoryItemModal : function(theModel) {
      //Show the fade overlay
      $('#fade').addClass('fade');
      //show the modal div
      $('#modalBox').addClass('modalBox');
      //Fetch the vendors and pass in the anonymous function as a callback
      InventoryTab.InventoryController.getVendors(function(){
        //Instanciate a new modal view passing it the model that was passed into this function, and the collection of vendors
        var modalView = new InventoryTab.ItemDetailsModalView({model:theModel,collection:InventoryTab.vendorCollection});
        //show the modal view in the modal area
        App.tabDiv.modalArea.show(modalView);
        //set the selected vendor to the matching vendor from the model
        $('option[id=' + theModel.get('vendorId') + "]").attr('selected','selected');
      });
    },

    //Function to show the inventory modal for a new item that will be added to the item collection
    showInventoryItemAddModal : function(theModel) {
      //Disable the add new button
      $('#addNew').prop('disabled',true);
      //Show the fade overaly
      $('#fade').addClass('fade');
      //show the modal box div
      $('#modalBox').addClass('modalBox');
      //now that the modal and overlay are up, reenable the add new button.
      //It still can't be clicked since the overlay is in the way.
      //By disabling and re-enablig after the overlay is in place, we can minimize the user double clickin the add button.
      $('#addNew').prop('disabled',false);
      //Fetch the vendors and pass in the anonymous function as a callback
      InventoryTab.InventoryController.getVendors(function(){
        //Instanciate a new Item add modal view and pass it a new item model, and the vendor collection
        var modalView = new InventoryTab.ItemAddModalView({model:new InventoryTab.ItemModel(),collection:InventoryTab.vendorCollection});
        //show the add view in the modal box
        App.tabDiv.modalArea.show(modalView);
        //Hide the delte button since we don't want a user to be able to delete a item they are trying to add.
        $('#delete').hide();
      });
    }

  };
});