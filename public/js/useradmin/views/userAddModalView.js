UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserAddModalView = Backbone.Marionette.CompositeView.extend({

    tagName : "div",

    initialize : function() {
      this.template = Handlebars.compile(tpl.get('userAddModal'));
    },

    itemView: UserListTab.UserDetailsModalView,

    itemViewContainer: "select",

    events : {
      'click .save' : 'addUser',
      'click .cancel' : 'cancelAction'
    },

    addUser : function() {

      var fields = {
        username:$('#username').val(),
        position_id: parseInt($('#position-id').val(), 10),
        schedule_color: $('#schedule_color').val(), // Assuming its the correct format
        phone: $('#phone').val(),
        acc_room: $('#acc_room').is(':checked') ? 1 : 0,
        acc_avlog: $('#acc_avlog').is(':checked') ? 1 : 0,
        acc_inv: $('#acc_inv').is(':checked') ? 1 : 0,
        acc_emp: $('#acc_emp').is(':checked') ? 1 : 0,
        acc_useradm: $('#acc_useradm').is(':checked') ? 1 : 0,
        acc_crud_timesheet: $('#acc_crud_timesheet').is(':checked') ? 1 : 0,
        acc_view_timesheet: $('#acc_view_timesheet').is(':checked') ? 1 : 0,
        acc_gen_timesheet: $('#acc_gen_timesheet').is(':checked') ? 1 : 0,
        acc_crud_schedule: $('#acc_crud_schedule').is(':checked') ? 1 : 0,
      };

      var result = this.model.addUser(fields);
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
