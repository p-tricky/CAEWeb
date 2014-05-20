InventoryApp.module('ViewOrdersTab', function (ViewOrdersTab, App, Backbone, Marionette, $, _) {
  ViewOrdersTab.OrderCompositeView = Backbone.Marionette.CompositeView.extend({
    
    itemView: InventoryApp.ViewOrdersTab.OrderItemView,

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    id:'orderTable',

    itemViewContainer: "tbody"
    
  });
});