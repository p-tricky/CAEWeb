EmployeeApp.module('AttendantScheduleTab', function (AttendantScheduleTab, App, Backbone, Marionette, $, _) {
  AttendantScheduleTab.AttendantModel = Backbone.Model.extend({
    defaults : {
      'id' : null
    },

    urlRoot : 'api/attendantscheduleinfo'
  });

  AttendantScheduleTab.AttendantCollection = Backbone.Collection.extend({
    model : AttendantScheduleTab.AttendantModel,
    url : 'api/attendantscheduleinfo'

  });
});