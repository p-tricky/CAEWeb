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

    //Function to save the scan to the server side. The function takes an object of properties to update
    //as the parameter for the function
    saveAsset : function(updateModelProperties) {
      this.save(updateModelProperties, {
        success: function() {
          //Remove the fade overlay and modalbox
          $('#fade').removeClass('fade');
          $('#modalBox').removeClass('modalBox');
          //close the modal box view
          App.tabDiv.modalArea.close();
          console.log('success');
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

    findAsset : function(queryParams) {
      $.ajax({
        type: "GET",
        url: 'api/find',
        data: {queryParams: queryParams},
      }).done(function(response) {
        if (response[0]) {
          var foundAsset = new AssetListTab.AssetModel(response[0]);
          var modalView = new AssetListTab.AssetDetailsModalView({
            model: foundAsset,
            saveCallback: function() {
              AssetListTab.assetsList.fetch({data: {sort: AssetListTab.sort}, success: AssetListTab.AssetListController.showAssetsTable});
            }
          });
          //show the modal view in the modal area
          App.tabDiv.modalArea.show(modalView);
          AssetMgmtApp.AssetListTab.AssetListController.getDepartments(function() {
            var dropDown = new AssetListTab.AssetDepartmentCompositeView({collection: AssetMgmtApp.AssetListTab.departmentList, model: foundAsset});
            modalView.departmentsDropDown.show(dropDown);
          });
        } else {
          var errorAlert = $('#confirmModalBox');
          errorAlert.html('Sorry.  No record exists.  Please create one.');
          errorAlert.dialog({
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

  //Define the collection for scans that is based on the above defined item model
  AssetListTab.AssetsCollection = Backbone.Collection.extend({
    //Define which model to use
    model : AssetListTab.AssetModel,
    //define url for persistance
    url : 'api/assets'
  });
});
