UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserAddModalView = Backbone.Marionette.CompositeView.extend({

    tagName : "div",

    initialize : function() {
      this.template = Handlebars.compile(tpl.get('userDetailsModal'));
    },

    itemView: UserListTab.UserDetailsModalView,

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
