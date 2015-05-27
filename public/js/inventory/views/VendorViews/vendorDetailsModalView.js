//Define module for the inventory tab to live in.
InventoryApp.module('VendorTab', function (VendorTab, App, Backbone, Marionette, $, _) {
  //Define a composite view to be used to show the modal box that allows the user to add a new
  //Vendor to the inventory. A composite view is used because the vendor dropdown needs to be a Vendor
  //view nested inside the modal box.
  VendorTab.VendorDetailsModalView = Backbone.Marionette.CompositeView.extend({

    //Define the tab for this view. div is default, we don't need to explicitly define it, but we are.
    tagName : "div",

    //When this view is instanciated, run this function
    initialize : function() {
      //use tpl to fetch the template, and pass it to handlebars
      this.template = Handlebars.compile(tpl.get('currentInventory/vendorAddModal'));
    },

    //Define the events to be associated with this view
    events : {
      'click .save' : 'saveVendor',
      'click .cancel' : 'cancelAction'
    },

    //Function to be called when the save button is clicked
    saveVendor : function() {
      //Get the values from the fields and put them in an object to pass to the model
      var fields = {
        name:$('#name').val(),
        url:$('#url').val(),
      };
      //Send the object of parameters to the model to be saved with the addVendor function.
      //The result will be returned to the result variable
      var result = this.model.saveVendor(fields);
      //If the save was successful
      if (result) { 
        //Remove the fade overlay and modalbox
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        //close the modal box view
        App.tabDiv.modalArea.close();
      }
    },

    //Function to be called when the cancel button is clicked
    cancelAction : function() {
      //Remove the fade overlay and modal box
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      //Clost the modal box
      App.tabDiv.modalArea.close();
    }
  });
});