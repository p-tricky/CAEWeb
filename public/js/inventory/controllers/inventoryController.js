InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  
  InventoryTab.InventoryController = {

    getInventory : function(callback) {
      if (typeof InventoryTab.currentInventory === "undefined") {
        console.log('Getting Inventory Data');
        InventoryTab.currentInventory = new InventoryApp.InventoryTab.ItemCollection();
        InventoryTab.currentInventory.fetch({success : callback});
      } else {
        callback();
      }
    },

    showInventoryTable : function(callback) {
      var tabContentDiv = new InventoryTab.InventoryCompositeView({collection: InventoryTab.currentInventory,'contentName':'currentInventory/inventoryTable'});
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    getVendors : function(callback) {
      if (typeof InventoryTab.vendorCollection === "undefined") {
        console.log('Getting Vendor List');
        InventoryTab.vendorCollection = new InventoryTab.VendorCollection();
        InventoryTab.vendorCollection.fetch({success : callback});
      } else {
        callback();
      }
    },

    showInventoryItemModal : function(theModel) {
      $('#fade').addClass('fade');
      $('#modalBox').addClass('modalBox');
      InventoryTab.InventoryController.getVendors(function(){
        var modalView = new InventoryTab.ItemDetailsModalView({model:theModel,collection:InventoryTab.vendorCollection});
        App.tabDiv.modalArea.show(modalView);
        $('option[id=' + theModel.get('vendorId') + "]").attr('selected','selected');
        //$('.select-vendor-list').prop('disabled',true);
      });
    },

    showInventoryItemAddModal : function(theModel) {
      $('#addNew').prop('disabled',true);
      $('#fade').addClass('fade');
      $('#modalBox').addClass('modalBox');
      $('#addNew').prop('disabled',false);
      InventoryTab.InventoryController.getVendors(function(){
        var modalView = new InventoryTab.ItemAddModalView({model:new InventoryTab.ItemModel(),collection:InventoryTab.vendorCollection});
        App.tabDiv.modalArea.show(modalView);
        $('#delete').hide();
      });
    }

  };
});