EmployeeApp.module('EmployeeTab', function (EmployeeTab, App, Backbone, Marionette, $, _) {
  EmployeeTab.ViewableTabModel = Backbone.Model.extend({
    defaults : {
      'id' : null,
      'tab' : '',
      'name' : ''
    },

    urlRoot : 'api/viewabletabs'
  });

  EmployeeTab.ViewableTabCollection = Backbone.Collection.extend({
    model : EmployeeTab.ViewableTabModel,
    url : 'api/viewabletabs'

  });
});