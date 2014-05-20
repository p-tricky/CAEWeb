InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  InventoryTab.InventoryCompositeView = Backbone.Marionette.CompositeView.extend({
    
    itemView: InventoryApp.InventoryTab.InventoryItemView,

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    id:'inventoryTable',

    itemViewContainer: "tbody",

    events: {
      'click #addNew' : 'addNew'
    },

    addNew: function() {
      InventoryTab.InventoryController.showInventoryItemAddModal(this.model);
    }
    
  });
});