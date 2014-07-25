//Define the module for the ProgrammerScheduleTab logic to live in
EmployeeApp.module('ProgrammerScheduleTab', function (ProgrammerScheduleTab, App, Backbone, Marionette, $, _) {
  //Define a model for the programmer schedule events.
  ProgrammerScheduleTab.ProgrammerModel = Backbone.Model.extend({
    //Define defaults for a new model creation
    defaults : {
      'id' : null
    },

    //Define url for persistance of the data
    urlRoot : 'api/programmerscheduleinfo'
  });

  //Define a collection that will use the above defined collection
  ProgrammerScheduleTab.ProgrammerCollection = Backbone.Collection.extend({
    model : ProgrammerScheduleTab.ProgrammerModel,
    url : 'api/programmerscheduleinfo'

  });
});