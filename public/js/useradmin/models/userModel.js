UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserModel = Backbone.Model.extend({
    defaults : {
      'username':'',
      'fullname':'',
      'position_id':'',
      'email':'',
      'schedule_color':'',
      'fullname':'',
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

    urlRoot : 'api/users'
  });

  UserListTab.UserCollection = Backbone.Collection.extend({
    model : UserListTab.UserModel,
    url : 'api/users',

    comparator: function(item) {
     return (Number(item.get('id')));
    }

  });
});