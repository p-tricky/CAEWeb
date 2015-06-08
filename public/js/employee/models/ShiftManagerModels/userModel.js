//this is the model that each user will live in
EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.UserModel = Backbone.Model.extend({
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
      'acc_notifications': '',
      'acc_super_user': '',
      'created_at':'',
      'updated_at':''
    },

    //url to get all the users
    urlRoot : 'api/users',

  });

  //defines the collection of users that hold the userModels
  ShiftManagerTab.UserCollection = Backbone.Collection.extend({
    //which models will be in the collection
    model : ShiftManagerTab.UserModel,

    url : 'api/users',
  });
});
