InventoryApp.module('ViewOrdersTab', function (ViewOrdersTab, App, Backbone, Marionette, $, _) {
  ViewOrdersTab.OrderItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('currentOrders/_currentOrderRow'));
      this.model.bind('change', this.render, this);
    },

    attributes : function(){
      var classValue = ViewOrdersTab.currentOrders.indexOf(this.model);
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
    },

    events : {
      'dblclick' : 'showDetails'
    },

    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this.el;
    },

    showDetails : function(e) {
      ViewOrdersTab.ViewOrdersController.showOrderDetailsModal(this.model);
    }

  });
});