//Define module for the virus user tab to live in.
SysAdminApp.module('VirusUserTab', function (VirusUserTab, App, Backbone, Marionette, $, _) {
  //Define the User Model to hold information about a item
  VirusUserTab.ScanUserModel = Backbone.Model.extend({
    //Define some defaults for new models that are created clientside
    defaults : {
      'id' : null,
      'user_name' : '',
      'total' : null,
      'last_scanned' : '0000-00-00 00:00:00',
      'updateed_at' : '',
      'created_at':'',
    },

    //url for the model to use to persist data to the server side
    urlRoot : 'api/scansUser',

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

    //function to add a new user
    addUser : function(modelProperties) {
      //sets the current model's properties with the passed parameter
      this.set(modelProperties);
      //if the save was successful, returns true. Otherwise, it will return false
      var returnValue = SysAdminApp.VirusUserTab.usersList.create(this);
      return returnValue;
    },

  });

  //Define the collection for users that is based on the above defined user model
  VirusUserTab.ScanUsersCollection = Backbone.Collection.extend({
    //Define which model to use
    model : VirusUserTab.ScanUserModel,
    //define url for persistance
    url : 'api/scansUser'
  });
});
