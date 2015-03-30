UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserDetailsModalView = Backbone.Marionette.CompositeView.extend({

    tagName : "div",

    initialize : function() {
      this.template = Handlebars.compile(tpl.get('userDetailsModal'));
    },

    itemView: UserListTab.UserDetailsModalView,

    itemViewContainer: "select",

    events : {
      'click .save' : 'saveUser',
      'click .delete' : 'deleteUser',
      'click .cancel' : 'cancelAction',
      'change .select-position-id' : 'updatePermissionsCheckboxes',
    },

    // render's the userDetalsModalView from the userDetailsModal template
    //
    // this view is rendered when the user dbl clicks a user in the user
    // admin list view
    //
    // most of the view is provided by the template
    //
    // we need to check all the permissions that apply to the current user, so
    // that we don't have to recheck the permissions check boxes everytime we edit a user's
    // details
    onShow : function() {
      ///////////////////// sets all of the permissions ////////////////////
      if (this.model.get('acc_room') == 1) {
        $('input[id=acc_room]').prop('checked',true);
      }
      if (this.model.get('acc_avlog') == 1) {
        $('input[id=acc_avlog]').prop('checked',true);
      }
      if (this.model.get('acc_inv') == 1) {
        $('input[id=acc_inv]').prop('checked',true);
      }
      if (this.model.get('acc_emp') == 1) {
        $('input[id=acc_emp]').prop('checked',true);
      }
      if (this.model.get('acc_useradm') == 1) {
        $('input[id=acc_useradm]').prop('checked',true);
      }
      if (this.model.get('acc_crud_timesheet') == 1) {
        $('input[id=acc_crud_timesheet]').prop('checked',true);
      }
      if (this.model.get('acc_view_timesheet') == 1) {
        $('input[id=acc_view_timesheet]').prop('checked',true);
      }
      if (this.model.get('acc_gen_timesheet') == 1) {
        $('input[id=acc_gen_timesheet]').prop('checked',true);
      }
      if (this.model.get('acc_crud_schedule') == 1) {
        $('input[id=acc_crud_schedule]').prop('checked',true);
      }
   
      ///////////////////// sets the position dropdown to correct value ////////////////////
      $('option[value='+this.model.get('position_id')+']').prop('selected', true);
    },

    // In modification process
    saveUser : function() {

      var fields = {
        username:$('#username').val(),
        position_id: parseInt($('#position-id').val(), 10),
        schedule_color: $('#schedule_color').val(),
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

      var response =  this.model.saveUser(fields);
      if (response) {
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        App.tabDiv.modalArea.close();
      } 
    },

    deleteUser : function() {
      var self = this;
      var confirmDialogue = $('#confirmModalBox');
      confirmDialogue.html("Are you sure you want to delete this user?");
      confirmDialogue.dialog({
        modal: true,
        title: 'Delete User',
        buttons: {
          'No': function() {
            $(this).dialog('close');
          },
          'Yes': function() {
            $(this).dialog('close');
            self.model.destroy({
              wait : true,
              success : function() {
                $('#fade').removeClass('fade');
                $('#modalBox').removeClass('modalBox');
                App.tabDiv.modalArea.close();
              },
              error : function(m,e,o) {
                var errorAlert = $('#confirmModalBox');
                errorAlert.html("Sorry, the deletion failed.");
                errorAlert.dialog({
                  modal: true,
                  title: 'Delete Error',
                  buttons: {
                    'Ok': function() {
                      $(this).dialog('close');
                    }
                  }
                });
              }
            });
            console.log('delete');
            UserAdminApp.UserListTab.UserListTabController.getUserList(UserAdminApp.UserListTab.UserListTabController.showUserTable);
            console.log(UserListTab.userList);
          },
        }
      });
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
