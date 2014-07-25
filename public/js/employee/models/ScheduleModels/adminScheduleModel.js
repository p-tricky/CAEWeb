//Define the module for the AdminScheduleTab logic to live in
EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  //Define a model for the admin schedule events.
  AdminScheduleTab.AdminModel = Backbone.Model.extend({
    //Define defaults for a new model creation
    defaults : {
      'id' : null
    },

    //Define url for persistance of the data
    urlRoot : 'api/adminscheduleinfo'
  });

  //Define a collection that will use the above defined collection
  AdminScheduleTab.AdminCollection = Backbone.Collection.extend({
    model : AdminScheduleTab.AdminModel,
    url : 'api/adminscheduleinfo'

  });
});