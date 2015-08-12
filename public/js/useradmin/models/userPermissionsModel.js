//Define the module EmployeeTab for all functions that apply to all tabs. Tab specific ones will be namespaced to thier specific tab.
UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  //Define a model to be used when fetching the current user permissions
  UserListTab.UserPermissionModel = Backbone.Model.extend({
    //define defaults for new models
    defaults : {
      'username':'',
      'fullname':'',
      'email':'',
      'schedule_color':'',
      'acc_crud_assets':'',
      'acc_room':'',
      'acc_avlog':'',
      'acc_inv':'',
      'acc_emp':'',
      'acc_useradm':'',
      'acc_sysadm':'',
      'acc_crud_timesheet':'',
      'acc_view_timesheet':'',
      'acc_gen_timesheet':'',
      'acc_crud_schedule':'',
      'acc_notifications':'',
      'acc_super_user':'',
      'created_at':'',
      'updated_at':''
    },

    //url that will be used to persist data.
    urlRoot : 'api/userpermissions'
  });
});
