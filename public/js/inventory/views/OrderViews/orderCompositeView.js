//Define module for the view orders tab to live in.
InventoryApp.module('ViewOrdersTab', function (ViewOrdersTab, App, Backbone, Marionette, $, _) {
  //Define a composite view for displaying the orders in a table
  ViewOrdersTab.OrderCompositeView = Backbone.Marionette.CompositeView.extend({
    
    //Define the Item View to use in conjunction with this composite view
    itemView: InventoryApp.ViewOrdersTab.OrderItemView,

    //Function that runs when this view is instanciated
    initialize : function(options) {
      //fetch any options such as the template out of the parameters
      this.options = options || {};
      //use the tpl function to get the template name out of the options and then
      //pass the template to handlebars before it assigns the template to the view
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //Define an id for the tag of the view. Since no tagname is give, it will be a div
    id:'orderTable',

    //Define the container to use for the item view. It will be the tbody of the template
    itemViewContainer: "tbody"
    
  });
});