InventoryApp.module('PlaceOrdersTab', function (PlaceOrdersTab, App, Backbone, Marionette, $, _) {
  PlaceOrdersTab.PlaceOrdersItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('placeOrders/_placeOrderRow'));
    },

    attributes : function(){
      var classValue = App.InventoryTab.currentInventory.indexOf(this.model);
      var classProperty = '';
      if ((Number(classValue)%2) === 0) {
        classProperty = 'even';
      } else {
        classProperty = 'odd';
      }
      return {
        id : this.model.get('id'),
        class : classProperty + ' itemRow'
      };
    }

  });
});