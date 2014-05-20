InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  InventoryTab.VendorModel = Backbone.Model.extend({
    defaults : {
      'id' : null,
      'name' : ''
    },

    urlRoot : 'api/vendors'
  });

  InventoryTab.VendorCollection = Backbone.Collection.extend({
    model : InventoryTab.VendorModel,
    url : 'api/vendors'

  });
});