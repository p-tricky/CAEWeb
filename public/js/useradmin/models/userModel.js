UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserModel = Backbone.Model.extend({
    defaults : {
      'id' : null,
      'username':'',
      'fullname':'',
      'position_id':'',
      'email':'',
      'schedule_color':'',
      'phone':'',
      'acc_room':'',
      'acc_avlog':'',
      'acc_inv':'',
      'acc_emp':'',
      'acc_useradm':'',
      'acc_crud_timesheet':'',
      'acc_view_timesheet':'',
      'acc_gen_timesheet':'',
      'acc_crud_schedule':'',
      'created_at':'',
      'updated_at':''
    },

    urlRoot : 'api/users',


    initialize: function() {
      //If the model is invalid, alert the user that the model could not be saved.
      this.on("invalid", function(model, error) {
        $('#confirmModalBox').html(error);
        $('#confirmModalBox').dialog({
          modal:true,
          title: 'Error when saving',
          buttons: {
            'Ok': function() {
              $(this).dialog('close');
            }
          },
        });
      });
    },

    //Function to save the user to the server side. The function takes an object of properties to update
    //as the parameter for the function
    saveUser : function(updateModelProperties) {
      this.set(updateModelProperties);
      if ( this.isValid() ) {
        result = this.save();
        return result;
      }
      // if the updateModelProperties weren't valid, reset model to former state
      this.set(this.previousAttributes());
    },
    

    addUser : function(addModelProperties) {
      this.set(addModelProperties);
      if (this.isValid()) {
        // .create maps to the store() method in the controller
        returnValue = UserAdminApp.UserListTab.userList.create(this, {
          success: function() {
            // close userAddModalView
            $('#fade').removeClass('fade');
            $('#modalBox').removeClass('modalBox');
            App.tabDiv.modalArea.close();
          },
          error : function() {
            // leave UserAddModalView open and open error dialog
            var errorAlert = $('#confirmModalBox');
            errorAlert.html("Please verify unified account.");
            errorAlert.dialog({
              modal: true,
              title: 'Error when saving',
              buttons: {
                'Ok': function() {
                  $(this).dialog('close');
                }
              },
            });
          },
          wait : true
        });
      }
    },

    validate: function(attrs) {
      if (attrs.phone && !/\D*\d{3}\D*\d{3}\D*\d{4}\D*/.test(attrs.phone)) 
        return "Invalid phone number";
    },
  });


  UserListTab.UserCollection = Backbone.Collection.extend({
    model : UserListTab.UserModel,
    url : 'api/users',

    comparator: function(item) {
      return (Number(item.get('id')));
    }

  });
});
