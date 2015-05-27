//Define a module for all of the view log functions to live in.
InventoryApp.module('VendorTab', function (VendorTab, App, Backbone, Marionette, $, _) {
  //Define a composite view to display the log entries in a table
  VendorTab.VendorListView = Backbone.Marionette.CompositeView.extend({
    
    //Define the item view that this view will use to display the table rows
    itemView: InventoryApp.VendorTab.VendorItemView,

    //Function that will be called when the view is instanciated
    initialize : function(options) {
      //fetch any passed options out of the parameters such as the template
      this.options = options || {};
      //use the tpl function to get the template name out of the options and then
      //pass the template to handlebars before it assigns the template to the view
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //Define a id for this view
    id:'vendorTable',

    //Define the item view container for this composite view
    itemViewContainer: "tbody",

    events : {
      "click #addVendor": "addVendor"
    },

    addVendor : function() {
      //call the showInventoryVendorAddModal function in the inventory controller
      VendorTab.VendorController.showVendorAddModal(this.model);
    }
  });
});