//Define module for the inventory tab to live in.
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  //Define the Item Model to hold information about a item
  AssetListTab.AssetModel = Backbone.Model.extend({
    //Define some defaults for new models that are created clientside
    defaults : {
      'id' : null,
      'brand_name' : '',
      'serial_number' : '',
      'description' : '',
      'room' : '',
      'department' : 0,
      'mac_address' : null,
      'asset_type' : '',
      'assignee_name' : null,
      'updated_at':'',
      'created_at':'',
    },

    //url for the model to use to persist data to the server side
    urlRoot : 'api/assets',

    //Function to setup some inital things for the model
    initialize : function() {
      //If the model is invalid, alert the user that the model could not be saved.
      this.on("invalid", function(model, error) {
        $('#confirmModalBox').html("Unable to save asset number " + model.get("id") + "\n" + error);
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

    //Function to save the scan to the server side. The function takes an object of properties to update
    //as the parameter for the function
    saveAsset : function(updateModelProperties) {
      this.set(updateModelProperties);
      result = this.save();
      return result;
    },

    addAsset : function(addModelProperties) {
      //sets the new model's properties to the properties that were passed
      this.set(addModelProperties);
      AssetMgmtApp.AssetListTab.assetsList.create(this, {
          wait: true,
          success: function() {
            // close userAddModalView
            $('#fade').removeClass('fade');
            $('#modalBox').removeClass('modalBox');
            App.tabDiv.modalArea.close();
          },
          error: function() {
            // leave UserAddModalView open and open error dialog
            var errorAlert = $('#confirmModalBox');
            errorAlert.html("Sorry, there was an error");
            errorAlert.dialog({
              modal: true,
              title: 'Error when saving',
              buttons: {
                'Ok': function() {
                  $(this).dialog('close');
                }
              },
            });
          },
      });
    },

  });

  //Define the collection for scans that is based on the above defined item model
  AssetListTab.AssetsCollection = Backbone.Collection.extend({
    //Define which model to use
    model : AssetListTab.AssetModel,
    //define url for persistance
    url : 'api/assets'
  });
});
