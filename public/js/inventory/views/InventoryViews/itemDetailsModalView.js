InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  InventoryTab.ItemDetailsModalView = Backbone.Marionette.CompositeView.extend({

    tagName : "div",

    initialize : function() {
      this.template = Handlebars.compile(tpl.get('currentInventory/itemDetailsModal'));
    },

    itemView: InventoryTab.ItemDetailsModalVendorListView,

    itemViewContainer: "select",

    events : {
      'click .save' : 'saveItem',
      'click .delete' : 'deleteItem',
      'click .cancel' : 'cancelAction'
    },

    onShow : function() {
      $('option[id=' + this.model.get('vendor_id') + "]").attr('selected','selected');
      $('.select-vendor-list').prop('disabled',true);
    },

    saveItem : function() {
      //Calculating an adjustment quantity to send to the server side. This way the single increment, and
      //decrement will still work correctly. Server side will apply the adjustmentQty to the database stored qty.
      var adjustmentQuantity = (Number($('#quantity').val()) - Number(this.model.get('quantity')));
      if (Number($('#quantity').val()) >= 0) {
        var fields = {
          name:$('#name').val(),
          adjustmentQty : adjustmentQuantity,
          description : $('#description').val(),
          email_threshold : $('#emailThreshold').val(),
          item_url : $('#itemUrl').val(),
          vendor_id: $('#vendor-list').val()
        };
        var result = this.model.saveItem(fields);
        if (result) {
          $('#fade').removeClass('fade');
          $('#modalBox').removeClass('modalBox');
          App.tabDiv.modalArea.close();
        }
      } else {
        console.log('To small');
      }
    },

    deleteItem : function() {
      if (confirm('Are you sure you want to delete this Item?')) {
        this.model.destroy({
          wait : true,
          success : function() {
            $('#fade').removeClass('fade');
            $('#modalBox').removeClass('modalBox');
            App.tabDiv.modalArea.close();
          },
          error : function(m,e,o) {
            console.log(e);
            console.log(o);
          }
        });
      }
    },

    cancelAction : function() {
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      App.tabDiv.modalArea.close();
    }
  });
});
