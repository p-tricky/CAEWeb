InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  InventoryTab.ItemAddModalView = Backbone.Marionette.CompositeView.extend({

    tagName : "div",

    initialize : function() {
      this.template = Handlebars.compile(tpl.get('currentInventory/itemDetailsModal'));
    },

    itemView: InventoryTab.ItemDetailsModalVendorListView,

    itemViewContainer: "select",

    events : {
      'click .save' : 'saveItem',
      'click .cancel' : 'cancelAction'
    },

    saveItem : function() {
      var fields = {
        name:$('#name').val(),
        quantity : $('#quantity').val(),
        description : $('#description').val(),
        email_threshold : $('#emailThreshold').val(),
        item_url : $('#itemUrl').val(),
        vendor_id: $('#vendor-list').val(),
        on_order_quantity: '0'
      };
      var result = this.model.addItem(fields);
      if (result) {
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        App.tabDiv.modalArea.close();
      }
    },

    cancelAction : function() {
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      App.tabDiv.modalArea.close();
    }
  });
});
