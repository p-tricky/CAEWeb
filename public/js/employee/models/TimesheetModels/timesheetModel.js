//Define the module for the TimesheetTab logic to live in
EmployeeApp.module('TimesheetTab', function (TimesheetTab, App, Backbone, Marionette, $, _) {
  //Define a model for the timesheet events.
  TimesheetTab.TimesheetModel = Backbone.Model.extend({
    defaults: {
      'id' : null 
    }, 

    //Define url for persistance of the data
    ur : 'api/timesheet',
  });

  //Define a collection that will use the above defined collection
  TimesheetTab.TimesheetCollection = Backbone.Collection.extend({

    model : TimesheetTab.TimesheetModel,
    url : 'api/allshifts'

  });
});