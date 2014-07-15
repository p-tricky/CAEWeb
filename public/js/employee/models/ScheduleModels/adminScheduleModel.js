EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  AdminScheduleTab.AdminModel = Backbone.Model.extend({
    defaults : {
      'id' : null
    },

    urlRoot : 'api/adminscheduleinfo'
  });

  AdminScheduleTab.AdminCollection = Backbone.Collection.extend({
    model : AdminScheduleTab.AdminModel,
    url : 'api/adminscheduleinfo'

  });
});