InventoryApp.module('ViewLogTab', function (ViewLogTab, App, Backbone, Marionette, $, _) {
  ViewLogTab.ViewLogCompositeView = Backbone.Marionette.CompositeView.extend({
    
    itemView: InventoryApp.ViewLogTab.ViewLogItemView,

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    id:'viewLogTable',

    itemViewContainer: "tbody"
    
  });
});