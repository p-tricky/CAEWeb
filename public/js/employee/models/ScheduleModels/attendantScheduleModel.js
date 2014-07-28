//Define the module for the AttendantScheduleTab logic to live in
EmployeeApp.module('AttendantScheduleTab', function (AttendantScheduleTab, App, Backbone, Marionette, $, _) {
  //Define a model for the attendant schedule events.
  AttendantScheduleTab.AttendantModel = Backbone.Model.extend({
    //Define defaults for a new model creation
    defaults : {
      'id' : null
    },

    //Define url for persistance of the data
    urlRoot : 'api/attendantscheduleinfo'
  });

  //Define a collection that will use the above defined collection
  AttendantScheduleTab.AttendantCollection = Backbone.Collection.extend({
    model : AttendantScheduleTab.AttendantModel,
    url : 'api/attendantscheduleinfo'

  });
});