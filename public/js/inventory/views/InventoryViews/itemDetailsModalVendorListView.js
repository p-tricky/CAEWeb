//Define module for the inventory tab to live in.
InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  //Define a Vendor Item View to be used in conjunction with the Composite views: ItemAddModalView, and ItemDetailsModalView
  InventoryTab.ItemDetailsModalVendorListView = Backbone.Marionette.ItemView.extend({

    //Define the tagname for the item view. It is option so that it can be inserted into the
    //Select tab of the composite views that this item view works with.
    tagName : "option",

    //Function that is called on Instanciation
    initialize : function() {
      //Rather than fetching the template with tpl like all the other views, it is so small
      //that I simply hard coded it into this line
      this.template = Handlebars.compile("{{name}}");
    },

    //Define the attribute for the view.
    attributes : function() {
      //return an object containnig the id, and the value. Both of which are set to the id of the model.
      return {
        id : this.model.get('id'),
        value: this.model.get('id')
      };
    }

  });
});