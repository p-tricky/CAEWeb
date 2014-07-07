EmployeeApp.module('AttendentScheduleTab', function (AttendentScheduleTab, App, Backbone, Marionette, $, _) {
  AttendentScheduleTab.AttendentModel = Backbone.Model.extend({
    defaults : {
      'id' : null
    },

    urlRoot : 'api/attendentscheduleinfo'
  });

  AttendentScheduleTab.AttendentCollection = Backbone.Collection.extend({
    model : AttendentScheduleTab.AttendentModel,
    url : 'api/attendentscheduleinfo'

  });
});