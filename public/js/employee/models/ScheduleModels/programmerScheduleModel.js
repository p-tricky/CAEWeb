EmployeeApp.module('ProgrammerScheduleTab', function (ProgrammerScheduleTab, App, Backbone, Marionette, $, _) {
  ProgrammerScheduleTab.ProgrammerModel = Backbone.Model.extend({
    defaults : {
      'id' : null
    },

    urlRoot : 'api/programmerscheduleinfo'
  });

  ProgrammerScheduleTab.ProgrammerCollection = Backbone.Collection.extend({
    model : ProgrammerScheduleTab.ProgrammerModel,
    url : 'api/programmerscheduleinfo'

  });
});