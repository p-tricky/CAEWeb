InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  InventoryTab.ItemDetailsModalVendorListView = Backbone.Marionette.ItemView.extend({

    tagName : "option",

    initialize : function() {
      this.template = Handlebars.compile("{{name}}");
    },

    attributes : function() {
      return {
        id : this.model.get('id'),
        value: this.model.get('id')
      };
    }

  });
});