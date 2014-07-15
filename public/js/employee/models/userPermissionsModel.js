EmployeeApp.module('EmployeeTab', function (EmployeeTab, App, Backbone, Marionette, $, _) {
  EmployeeTab.UserPermissionModel = Backbone.Model.extend({
    defaults : {
      'username':'',
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

    urlRoot : 'api/userpermissions'
  });
});