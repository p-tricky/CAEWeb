//This is the view that will be used when adding a new user
UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserAddModalView = Backbone.Marionette.CompositeView.extend({

    //define the tag name that will be used for the view
    tagName : "div",

    //sets the template for the view
    initialize : function() {
      this.template = Handlebars.compile(tpl.get('userAddModal'));
    },

    //defines the listeners for the events
    events : {
      'click .save' : 'addUser',
      'click .cancel' : 'cancelAction',
      'change .select-position-id' : 'updatePermissionsCheckboxes',
    },

    //when loading the view, it will call the updatePermissionsCheckboxes method
    onShow : function() {
      this.updatePermissionsCheckboxes();
    },

    //when attepting to save the new user
    addUser : function() {
      //sets the properties for the new user
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
        userNum: UserAdminApp.UserListTab.userList.length,
      };

      //saves the user and returns whether it was successful
      var result = this.model.addUser(fields);
    },

    //closes the modal and removes the faded background
    cancelAction : function() {
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      App.tabDiv.modalArea.close();
    },

    // there is definitely a more elegant way of doing this
    // TODO: talk to jason about what actual permissions are supposed to be
    updatePermissionsCheckboxes : function() {
      var position_id = parseInt($('#position-id').val(), 10);
      //if attendent is selected
      if ( position_id === 1 ) {
        //doesn't have timesheet or edit schedule permissions by default
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
      //if admin is selected
      else if ( position_id === 2 ) {
        //has all permissions by default
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
      //if programmer is selected
      else if ( position_id === 3 ) {
        //has all permissions by default
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
      //if director is selected
      else if ( position_id === 4 ) {
        //has all permissions by default
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
      //if building coordinator is selected
      else if ( position_id === 5 ) {
        //has all permissions by default
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
