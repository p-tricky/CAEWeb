//Define the module for the TimesheetTab logic to live in
EmployeeApp.module('TimesheetTab', function (TimesheetTab, App, Backbone, Marionette, $, _) {
  //Define a model for the timesheet events.
  TimesheetTab.TimesheetModel = Backbone.Model.extend({
    defaults: {
      'id' : null 
    }, 

    //Define url for persistance of the data
    url : 'api/timesheet',
  });

  //Define a collection that will use the above defined collection
  TimesheetTab.TimesheetCollection = Backbone.Collection.extend({

    //defines the models that populate the collection
    model : TimesheetTab.TimesheetModel,

    //url that is used to get the collection
    url : 'api/allshifts'

  });
});