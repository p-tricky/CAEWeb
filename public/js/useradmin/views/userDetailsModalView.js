//this is the view that is used for editing a current user
UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserDetailsModalView = Backbone.Marionette.CompositeView.extend({

    //defines a tag that the view uses
    tagName : "div",

    //loads the template
    initialize : function() {
      this.template = Handlebars.compile(tpl.get('userDetailsModal'));
    },

    //this is the item that is being edited
    itemView: UserListTab.UserDetailsModalView,

    //define the container for the userItem
    itemViewContainer: "select",

    //defines listeners for the events 
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
      if (this.model.get('acc_crud_assets') == 1) {
        $('input[id=acc_crud_assets]').prop('checked',true);
      }
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
      if (this.model.get('acc_sysadm') == 1) {
        $('input[id=acc_sysadm]').prop('checked',true);
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

      if (this.model.get('acc_notifications') == 1) {
        $('input[id=acc_notifications]').prop('checked',true);
      }

      if (this.model.get('acc_super_user') == 1) {
        $('input[id=acc_super_user]').prop('checked',true);
      }
   
      ///////////////////// sets the position dropdown to correct value ////////////////////
      $('option[value='+this.model.get('position_id')+']').prop('selected', true);
    },

    // when the save user button is clicked, it will try to save the user
    saveUser : function() {
      //saves the selected options for the user
      var fields = {
        username:$('#username').val(),
        position_id: parseInt($('#position-id').val(), 10),
        schedule_color: $('#schedule_color').val(),
        phone: $('#phone').val(),        
        acc_crud_assets: $('#acc_crud_assets').is(':checked') ? 1 : 0,
        acc_room: $('#acc_room').is(':checked') ? 1 : 0,
        acc_avlog: $('#acc_avlog').is(':checked') ? 1 : 0,
        acc_inv: $('#acc_inv').is(':checked') ? 1 : 0,
        acc_emp: $('#acc_emp').is(':checked') ? 1 : 0,
        acc_useradm: $('#acc_useradm').is(':checked') ? 1 : 0,
        acc_sysadm: $('#acc_sysadm').is(':checked') ? 1 : 0,
        acc_crud_timesheet: $('#acc_crud_timesheet').is(':checked') ? 1 : 0,
        acc_view_timesheet: $('#acc_view_timesheet').is(':checked') ? 1 : 0,
        acc_gen_timesheet: $('#acc_gen_timesheet').is(':checked') ? 1 : 0,
        acc_crud_schedule: $('#acc_crud_schedule').is(':checked') ? 1 : 0,
        acc_notifications: $('#acc_notifications').is(':checked') ? 1 : 0,
        acc_super_user: $('#acc_super_user').is(':checked') ? 1 : 0,
      };

      //tries to save the properties for the user
      //returns whether or not it was successful
      var response =  this.model.saveUser(fields);
      //if successful, closes the modal box
      if (response) {
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        App.tabDiv.modalArea.close();
      } 
    },

    //when attempting to delete the user
    deleteUser : function() {
      //defines this for easy reference
      var self = this;
      //makes the confirm modal
      var confirmDialogue = $('#confirmModalBox');
      //sets the text for the confirm modal
      confirmDialogue.html("Are you sure you want to delete this user?");
      //this loads the modal and the options
      confirmDialogue.dialog({
        modal: true,
        title: 'Delete User',
        //'no' button
        buttons: {
          'No': function() {
            //doesn't delete the user
            $(this).dialog('close');
          },
          //deletes the user
          'Yes': function() {
            //closes the confirmModal
            $(this).dialog('close');
            //destroys the selected model
            self.model.destroy({
              wait : true,
              //if successful closes the modal
              success : function() {
                $('#fade').removeClass('fade');
                $('#modalBox').removeClass('modalBox');
                App.tabDiv.modalArea.close();
              },
              //if there is an error, it allerts the user to the error
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
            //gets a new user list and displays it
            UserAdminApp.UserListTab.UserListTabController.getUserList(UserAdminApp.UserListTab.UserListTabController.showUserTable);
          },
        }
      });
    },

    //just closes the modal without saving
    cancelAction : function() {
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      App.tabDiv.modalArea.close();
    },

    // there is definitely a more elegant way of doing this
    // TODO: talk to jason about what actual permissions are supposed to be
    updatePermissionsCheckboxes : function() {
      var position_id = parseInt($('#position-id').val(), 10);
      //if guest is selected
      if ( position_id === 0 ) {
        //only has asset permissions by default
        $('input[id=acc_crud_assets]').prop('checked',true);
        $('input[id=acc_room]').prop('checked',false);
        $('input[id=acc_avlog]').prop('checked',false);
        $('input[id=acc_inv]').prop('checked',false);
        $('input[id=acc_emp]').prop('checked',false);
        $('input[id=acc_useradm]').prop('checked', false);
        $('input[id=acc_sysadm]').prop('checked', false);
        $('input[id=acc_crud_timesheet]').prop('checked',false);
        $('input[id=acc_view_timesheet]').prop('checked',false);
        $('input[id=acc_gen_timesheet]').prop('checked',false);
        $('input[id=acc_crud_schedule]').prop('checked',false);
      }
      //if attendent is selected
      else if ( position_id === 1 ) {
        //doesn't have timesheet or edit schedule permissions by default
        $('input[id=acc_crud_assets]').prop('checked',true);
        $('input[id=acc_room]').prop('checked',true);
        $('input[id=acc_avlog]').prop('checked',true);
        $('input[id=acc_inv]').prop('checked',true);
        $('input[id=acc_emp]').prop('checked',true);
        $('input[id=acc_useradm]').prop('checked', false);
        $('input[id=acc_sysadm]').prop('checked', false);
        $('input[id=acc_crud_timesheet]').prop('checked',false);
        $('input[id=acc_view_timesheet]').prop('checked',false);
        $('input[id=acc_gen_timesheet]').prop('checked',false);
        $('input[id=acc_crud_schedule]').prop('checked',false);
      }
      //if admin is selected
      else if ( position_id === 2 ) {
        //has all permissions by default
        $('input[id=acc_crud_assets]').prop('checked',true);
        $('input[id=acc_room]').prop('checked',true);
        $('input[id=acc_avlog]').prop('checked',true);
        $('input[id=acc_inv]').prop('checked',true);
        $('input[id=acc_emp]').prop('checked',true);
        $('input[id=acc_useradm]').prop('checked',true);
        $('input[id=acc_sysadm]').prop('checked', true);
        $('input[id=acc_crud_timesheet]').prop('checked',true);
        $('input[id=acc_view_timesheet]').prop('checked',true);
        $('input[id=acc_gen_timesheet]').prop('checked',true);
        $('input[id=acc_crud_schedule]').prop('checked',true);
      }
      //if programmer is selected
      else if ( position_id === 3 ) {
        //has all permissions by default
        $('input[id=acc_crud_assets]').prop('checked',true);
        $('input[id=acc_room]').prop('checked',true);
        $('input[id=acc_avlog]').prop('checked',true);
        $('input[id=acc_inv]').prop('checked',true);
        $('input[id=acc_emp]').prop('checked',true);
        $('input[id=acc_useradm]').prop('checked',true);
        $('input[id=acc_sysadm]').prop('checked', true);
        $('input[id=acc_crud_timesheet]').prop('checked',true);
        $('input[id=acc_view_timesheet]').prop('checked',true);
        $('input[id=acc_gen_timesheet]').prop('checked',true);
        $('input[id=acc_crud_schedule]').prop('checked',true);
      }
      //if director is selected
      else if ( position_id === 4 ) {
        //has all permissions by default
        $('input[id=acc_crud_assets]').prop('checked',true);
        $('input[id=acc_room]').prop('checked',true);
        $('input[id=acc_avlog]').prop('checked',true);
        $('input[id=acc_inv]').prop('checked',true);
        $('input[id=acc_emp]').prop('checked',true);
        $('input[id=acc_useradm]').prop('checked',true);
        $('input[id=acc_sysadm]').prop('checked', true);
        $('input[id=acc_crud_timesheet]').prop('checked',true);
        $('input[id=acc_view_timesheet]').prop('checked',true);
        $('input[id=acc_gen_timesheet]').prop('checked',true);
        $('input[id=acc_crud_schedule]').prop('checked',true);
      }
      //if building coordinator is selected
      else if ( position_id === 5 ) {
        //has all permissions by default
        $('input[id=acc_crud_assets]').prop('checked',true);
        $('input[id=acc_room]').prop('checked',true);
        $('input[id=acc_avlog]').prop('checked',false);
        $('input[id=acc_inv]').prop('checked',false);
        $('input[id=acc_emp]').prop('checked',false);
        $('input[id=acc_useradm]').prop('checked',false);
        $('input[id=acc_sysadm]').prop('checked', false);
        $('input[id=acc_crud_timesheet]').prop('checked',false);
        $('input[id=acc_view_timesheet]').prop('checked',true);
        $('input[id=acc_gen_timesheet]').prop('checked',true);
        $('input[id=acc_crud_schedule]').prop('checked',false);
      }
    }

  });
});
