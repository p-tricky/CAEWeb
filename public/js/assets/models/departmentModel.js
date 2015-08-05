//Define module for the inventory tab to live in.
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  //Define the Item Model to hold information about a item
  AssetListTab.DepartmentCollection = Backbone.Model.extend({
    //Define some defaults for new models that are created clientside
    defaults : {
      'id' : null,
      'name' : '',
      'updated_at':'',
      'created_at':'',
    },

    //url for the model to use to persist data to the server side
    urlRoot : 'api/departments',

    //Function to setup some inital things for the model
    initialize : function() {
      //If the model is invalid, alert the user that the model could not be saved.
      this.on("invalid", function(model, error) {
        $('#confirmModalBox').html("Unable to save " + model.get("name") + "\n" + error);
        $('#confirmModalBox').dialog({
          modal:true,
          title: 'Error when saving',
          buttons: {
            'Ok': function() {
              $(this).dialog('close');
            }
          },
        });
      });
    },
  });
  
  //Define the collection for scans that is based on the above defined item model
  AssetListTab.DepartmentCollection = Backbone.Collection.extend({
    //Define which model to use
    model : AssetListTab.DepartmentModel,
    //define url for persistance
    url : 'api/departments'
  });
});
