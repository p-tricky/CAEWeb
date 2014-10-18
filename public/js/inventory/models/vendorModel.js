//Define module for the inventory tab to live in.
InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  //Define a vendor model to represent the vendor information
  InventoryTab.VendorModel = Backbone.Model.extend({
    //Define defaults to be used when creating a new model
    defaults : {
      'id' : null,
      'name' : ''
    },

    //url used to persist data to the server
    urlRoot : 'api/vendors'
  });

  //Define a collection of the above defined models for vendors
  InventoryTab.VendorCollection = Backbone.Collection.extend({
    //Define the model to use for the collection
    model : InventoryTab.VendorModel,
    //url used to persist data to the server
    url : 'api/vendors'

  });
});