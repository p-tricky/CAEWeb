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

    //Function to save the item to the server side. The function takes an object of properties to update
    //as the parameter for the function
    saveUser : function(updateModelProperties) {
      var result = this.save(updateModelProperties);
      return result;
    },
    

    addUser : function(addModelProperties) {
      this.set(addModelProperties);
      if (this.isValid()) {
        // .create maps to the store() method in the controller
        returnValue = UserAdminApp.UserListTab.userList.create(this, {
          success: function() {
            return true;
          },
          error : function() {
            alert('Error Adding New User\nPlease, Verify Unified Account');
            return false;
          },
          wait : true
        });
      }
      return returnValue;
    }
  });


  UserListTab.UserCollection = Backbone.Collection.extend({
    model : UserListTab.UserModel,
    url : 'api/users',

    comparator: function(item) {
     return (Number(item.get('id')));
    }

  });
});
