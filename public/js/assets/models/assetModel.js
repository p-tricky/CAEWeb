//Define module for the asset list tab to live in.
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  //Define the Asset Model to hold information about an asset
  AssetListTab.AssetModel = Backbone.Model.extend({
    //Define some defaults for new models that are created clientside
    defaults : {
      'id' : null,
      'brand_name' : '',
      'serial_number' : '',
      'asset_tag' : null,
      'description' : '',
      'room' : '',
      'department_id' : 0,
      'department_name' : '',
      'mac_address' : null,
      'ip_address' : null,
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

    //Function to save the asset to the server side. The function takes an object of properties to update
    //as the parameter for the function
    saveAsset : function(updateModelProperties) {
      this.save(updateModelProperties, {
        success: function() {
          //Remove the fade overlay and modalbox
          $('#fade').removeClass('fade');
          $('#modalBox').removeClass('modalBox');
          //close the modal box view
          App.tabDiv.modalArea.close();
        },
        error: function() {
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

    //this function is called when a new model is created
    //tries to save the model. If unsuccessful, it alerts the user 
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
          var errorAlert = $('#confirmModalBox');
          errorAlert.html(
              "Make sure that an asset with the same type and serial number doesn't already exist");
          errorAlert.dialog({
            modal: true,
            title: 'Error when saving',
            buttons: {
              'Ok': function() {
                $(this).dialog('close');
              }
            },
          });
        }
      });
    },

    //function to see if a new asset already exists but was deleted
    // query params = serial number and asset type
    findAsset : function(queryParams) {
      // send a get request to the find api
      // the asset controller in the laravel backend will find an asset with
      // specified serial number and type (if that asset exists) and return it
      $.ajax({
        type: "GET",
        url: 'api/find',
        data: {queryParams: queryParams},
      }).done(function(response) {
        if (response[0]) {
          // if an asset was found and returned
          // then create a marionette model in the javascript
          // and open a modal view to edit the model
          var foundAsset = new AssetListTab.AssetModel(response[0]);
          var modalView = new AssetListTab.AssetDetailsModalView({
            model: foundAsset,
            saveCallback: function() {
              // this callback is passed to the modal view 
              // if the asset is saved then we call this function to update the assetlist to
              // show the activated modal view
              AssetListTab.assetsList.fetch({data: {sort: AssetListTab.sort}, success: AssetListTab.AssetListController.showAssetsTable});
            }
          });
          //show the modal view for the found asset in the modal area
          App.tabDiv.modalArea.show(modalView);
          AssetMgmtApp.AssetListTab.AssetListController.getDepartments(function() {
            // fill out department drop down in modal view
            var dropDown = new AssetListTab.AssetDepartmentCompositeView({collection: AssetMgmtApp.AssetListTab.departmentList, model: foundAsset});
            modalView.departmentsDropDown.show(dropDown);
          });
        } else {
          // we don't have an asset that matches the given serial number and type
          var notFoundAlert = $('#confirmModalBox');
          notFoundAlert.html('Sorry.  No record exists.  Please create one.');
          notFoundAlert.dialog({
            modal: true,
            title: 'No records found',
            buttons: {
              'Ok': function() {
                $(this).dialog('close');
              }
            },
          });
        }
      });
    },
  });

  //Define the collection for assets that is based on the above defined asset model
  AssetListTab.AssetsCollection = Backbone.Collection.extend({
    //Define which model to use
    model : AssetListTab.AssetModel,
    //define url for persistance
    url : 'api/assets'
  });
});
