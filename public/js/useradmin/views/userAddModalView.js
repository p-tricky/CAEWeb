UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserAddModalView = Backbone.Marionette.CompositeView.extend({

    tagName : "div",

    initialize : function() {
      this.template = Handlebars.compile(tpl.get('userAddModal'));
    },

    events : {
      'click .save' : 'addUser',
      'click .cancel' : 'cancelAction',
      'change .select-position-id' : 'updatePermissionsCheckboxes',
    },

    onShow : function() {
      this.updatePermissionsCheckboxes();
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
    },

    // there is definitely a more elegant way of doing this
    // TODO: talk to jason about what actual permissions are supposed to be
    updatePermissionsCheckboxes : function() {
      var position_id = parseInt($('#position-id').val(), 10);
      if ( position_id === 1 ) {
        $('input[id=acc_room]').prop('checked',true);
        $('input[id=acc_avlog]').prop('checked',true);
        $('input[id=acc_inv]').prop('checked',true);
        $('input[id=acc_emp]').prop('checked',true);
        $('input[id=acc_useradm]').prop('checked', false);
        $('input[id=acc_crud_timesheet]').prop('checked',false);
        $('input[id=acc_view_timesheet]').prop('checked',false);
        $('input[id=acc_gen_timesheet]').prop('checked',false);
        $('input[id=acc_crud_schedule]').prop('checked',false);
      }
      else if ( position_id === 2 ) {
        room = $('input[id=acc_room]');
        console.log("room: " + room);
        $('input[id=acc_room]').prop('checked',true);
        $('input[id=acc_avlog]').prop('checked',true);
        $('input[id=acc_inv]').prop('checked',true);
        $('input[id=acc_emp]').prop('checked',true);
        $('input[id=acc_useradm]').prop('checked',true);
        $('input[id=acc_crud_timesheet]').prop('checked',true);
        $('input[id=acc_view_timesheet]').prop('checked',true);
        $('input[id=acc_gen_timesheet]').prop('checked',true);
        $('input[id=acc_crud_schedule]').prop('checked',true);
      }
      else if ( position_id === 3 ) {
        $('input[id=acc_room]').prop('checked',true);
        $('input[id=acc_avlog]').prop('checked',true);
        $('input[id=acc_inv]').prop('checked',true);
        $('input[id=acc_emp]').prop('checked',true);
        $('input[id=acc_useradm]').prop('checked',true);
        $('input[id=acc_crud_timesheet]').prop('checked',true);
        $('input[id=acc_view_timesheet]').prop('checked',true);
        $('input[id=acc_gen_timesheet]').prop('checked',true);
        $('input[id=acc_crud_schedule]').prop('checked',true);
      }
      else if ( position_id === 4 ) {
        $('input[id=acc_room]').prop('checked',true);
        $('input[id=acc_avlog]').prop('checked',true);
        $('input[id=acc_inv]').prop('checked',true);
        $('input[id=acc_emp]').prop('checked','checked');
        $('input[id=acc_useradm]').prop('checked',true);
        $('input[id=acc_crud_timesheet]').prop('checked',true);
        $('input[id=acc_view_timesheet]').prop('checked',true);
        $('input[id=acc_gen_timesheet]').prop('checked',true);
        $('input[id=acc_crud_schedule]').prop('checked',true);
      }
      else if ( position_id === 5 ) {
        $('input[id=acc_room]').prop('checked',true);
        $('input[id=acc_avlog]').prop('checked',true);
        $('input[id=acc_inv]').prop('checked',true);
        $('input[id=acc_emp]').prop('checked',true);
        $('input[id=acc_useradm]').prop('checked',true);
        $('input[id=acc_crud_timesheet]').prop('checked',true);
        $('input[id=acc_view_timesheet]').prop('checked',true);
        $('input[id=acc_gen_timesheet]').prop('checked',true);
        $('input[id=acc_crud_schedule]').prop('checked',true);
      }
    }
  });
});
