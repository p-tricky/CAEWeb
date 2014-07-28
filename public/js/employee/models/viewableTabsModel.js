//Define the module EmployeeTab for all functions that apply to all tabs. Tab specific ones will be namespaced to thier specific tab.
EmployeeApp.module('EmployeeTab', function (EmployeeTab, App, Backbone, Marionette, $, _) {
  //Define the model for the viewable tabs.  
  EmployeeTab.ViewableTabModel = Backbone.Model.extend({
    //define defaults to be used for new models
    defaults : {
      'id' : null,
      'tab' : '',
      'name' : ''
    },

    //url that will be used to persist data
    urlRoot : 'api/viewabletabs'
  });

  //Define collection to be used for the above model.
  EmployeeTab.ViewableTabCollection = Backbone.Collection.extend({
    model : EmployeeTab.ViewableTabModel,
    url : 'api/viewabletabs'

  });
});