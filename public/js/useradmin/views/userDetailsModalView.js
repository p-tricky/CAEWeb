UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserDetailsModalView = Backbone.Marionette.CompositeView.extend({

    tagName : "div",

    initialize : function() {
      this.template = Handlebars.compile(tpl.get('userDetailsModal'));
    },

    itemView: UserListTab.UserDetailsModalView,

    itemViewContainer: "select",

    events : {
      'click .save' : 'saveItem',
      'click .delete' : 'deleteItem',
      'click .cancel' : 'cancelAction'
    },

    // Not completed or modified
    onShow : function() {
      $('option[id=' + this.model.get('vendor_id') + "]").attr('selected','selected');
      //$('.select-vendor-list').prop('disabled',true);
    },

    // In modification process
    saveItem : function() {
      // Many of the fields are fine but the username should be first checked with ldap
      // to verify that it exits and information such as name and email should be fetched
      // from there

      // Use Helper class to verify and get this info
      var uniAccID;
      var fullName;
      var emailAddress;

      // If conditions are met this will be executed
      var fields = {
        username: uniAccID,
        fullname: fullName,
        position_id: parseInt($('#position-id').val(), 10),
        email: emailAddress,
        schedule_color: $('#schedule_color').val(), // Assuming its the correct format
        phone: $('#phone').val(),
        acc_room: parseInt($('#acc_room').val(), 10),
        acc_avlog: parseInt($('#acc_avlog').val(), 10),
        acc_inv: parseInt($('#acc_inv').val(), 10),
        acc_emp: parseInt($('#acc_emp').val(), 10),
        acc_useradm: parseInt($('#acc_useradm').val(), 10),
        acc_crud_timesheet: parseInt($('#acc_crud_timesheet').val(), 10),
        acc_view_timesheet: parseInt($('#acc_view_timesheet').val(), 10),
        acc_gen_timesheet: parseInt($('#acc_gen_timesheet').val(), 10),
        acc_crud_schedule: parseInt($('#acc_crud_schedule').val(), 10)
      };

      var result = this.model.saveItem(fields);
      if (result) {
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        App.tabDiv.modalArea.close();
      //}
      } else {
        console.log('Not saved!');
      }
    },

    // Not Completed yet
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
