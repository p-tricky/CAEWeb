//Define module for the asset list tab to live in.
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  //Define the Department Model to hold information about a department
  AssetListTab.DepartmentModel = Backbone.Model.extend({
    //Define some defaults for new models that are created clientside
    defaults : {
      'id' : null,
      'name' : '',
      'updated_at':'',
      'created_at':'',
    },

    //url for the model to use to persist data to the server side
    urlRoot : 'api/departments',
      
  });
  
  //Define the collection for Department that is based on the above defined department model
  AssetListTab.DepartmentCollection = Backbone.Collection.extend({
    //Define which model to use
    model : AssetListTab.DepartmentModel,
    //define url for persistance
    url : 'api/departments'
  });
});
