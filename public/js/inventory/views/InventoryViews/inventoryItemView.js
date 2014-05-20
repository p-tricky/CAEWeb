InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  InventoryTab.InventoryItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('currentInventory/_inventoryRow'));
      this.model.bind('change', this.render, this);
    },

    attributes : function(){
      var classValue = InventoryTab.currentInventory.indexOf(this.model);
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
      'click #removeQty' : 'removeQty',
      'click #addQty' : 'addQty',
      'dblclick' : 'showDetails'
    },

    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this.el;
    },

    removeQty : function() {
      if ((Number(this.model.get('quantity')) - 1) >= 0) {
        _.each($(this.el).children().children('button'), function(invButton) {
          $(invButton).attr('disabled',true);
        });
        this.model.adjustQty(-1);
      }
    },

    addQty : function(event) {
      _.each($(this.el).children().children('button'), function(invButton) {
        $(invButton).attr('disabled',true);
      });
      this.model.adjustQty(1);
    },

    showDetails : function(e) {
      if (e.target.nodeName !== "BUTTON") {
        InventoryTab.InventoryController.showInventoryItemModal(this.model);
      }
    }

  });
});