//Define module for the inventory tab to live in.
InventoryApp.module('VendorTab', function (VendorTab, App, Backbone, Marionette, $, _) {
  
  //Define controller for the inventory tab functions to live in.
  VendorTab.VendorController = {

  	getVendors : function(callback) {
  		//If the vendor collection does not already exist
      	if (typeof InventoryApp.InventoryTab.vendorCollection === "undefined") {
        	//Instanciate a new vendor collection
        	InventoryApp.InventoryTab.vendorCollection = new InventoryApp.InventoryTab.VendorCollection();
        	//fetch the data for the collection and call the callback on success
        	//The call back for this function could be a number of different functions.
        	//In the two below methods, it is a anonymous function that gets passed in.
        	InventoryApp.InventoryTab.vendorCollection.fetch({success : callback});
      	} else {
        	//Already have the collection. Call the callback
        	callback();
      }
  	},

  	showVendors : function() {
  		//Instanciate a new inventory composite view and pass it the inventory collection as well as the template to use
      	var tabContentDiv = new VendorTab.VendorListView({collection: InventoryApp.InventoryTab.vendorCollection,'contentName':'vendors/vendorTable'});
      	//show the view in the tab content
      	App.tabDiv.tabContent.show(tabContentDiv);
  	},

    //Function to show the inventory modal for a new vendor that will be added to the vendor collection
    showVendorAddModal : function() {
      //Disable the add new button
      $('#addVendor').prop('disabled',true);
      //Show the fade overaly
      $('#fade').addClass('fade');
      //show the modal box div
      $('#modalBox').addClass('modalBox');
      //now that the modal and overlay are up, reenable the add new button.
      //It still can't be clicked since the overlay is in the way.
      //By disabling and re-enablig after the overlay is in place, we can minimize the user double clickin the add button.
      $('#addVendor').prop('disabled',false);
      //Fetch the vendors and pass in the anonymous function as a callback
      VendorTab.VendorController.getVendors(function(){
        //Instanciate a new vendor add modal view and pass it a new vendor model, and the vendor collection
        var modalView = new VendorTab.VendorAddModalView({model:new InventoryApp.InventoryTab.VendorModel()});
        //show the add view in the modal box
        App.tabDiv.modalArea.show(modalView);
      });
    },

    //Function to show the inventory modal for a new vendor that will be added to the vendor collection
    showVendorDetailsModal : function(theModel) {
      //Show the fade overaly
      $('#fade').addClass('fade');
      //show the modal box div
      $('#modalBox').addClass('modalBox');
      //Fetch the vendors and pass in the anonymous function as a callback
      VendorTab.VendorController.getVendors(function(){
        //Instanciate a new vendor add modal view and pass it a new vendor model, and the vendor collection
        var modalView = new VendorTab.VendorDetailsModalView({model:theModel});
        //show the add view in the modal box
        App.tabDiv.modalArea.show(modalView);
      });
    },


  };
});