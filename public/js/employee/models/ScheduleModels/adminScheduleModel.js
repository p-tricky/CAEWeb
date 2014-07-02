EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  AdminScheduleTab.AdminModel = Backbone.Model.extend({
    defaults : {
      'id' : null,
      'tab' : '',
      'name' : ''
    },

    urlRoot : 'api/adminscheduleinfo'
  });

  AdminScheduleTab.AdminCollection = Backbone.Collection.extend({
    model : AdminScheduleTab.AdminModel,
    url : 'api/adminscheduleinfo'

  });
});