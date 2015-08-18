//Define module for the inventory tab to live in.
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  
  //Define controller for the inventory tab functions to live in.
  AssetListTab.AssetListController = {

  	getAssets : function(callback) {
  		if (typeof AssetListTab.assetsList === "undefined") {
  			AssetListTab.assetsList = new AssetMgmtApp.AssetListTab.AssetsCollection();
  			AssetListTab.assetsList.fetch({success : callback});
  		} else {
  			callback();
  		}
  	},

  	getDepartments : function(callback) {
  		if (typeof AssetListTab.departmentList === "undefined") {
  			AssetListTab.departmentList = new AssetMgmtApp.AssetListTab.DepartmentCollection();
  			AssetListTab.departmentList.fetch({success: callback});
  		} else {
  			callback();
      }
  	},
  	
  	showAssetsTable : function() {
  		var tabContentDiv = new AssetListTab.AssetsCompositeView({collection: AssetListTab.assetsList, 'contentName':'assetsList/assetTable'});
  		App.tabDiv.tabContent.show(tabContentDiv);
  	},

  	//Function to show the user modal for an existing model in the item collection
    showAssetsModal: function(theModel) {
      //Show the fade overlay
      $('#fade').addClass('fade');
      //show the modal div
      $('#modalBox').addClass('modalBox');
      //Instanciate a new modal view passing it the model that was passed into this function, and the collection of virus users
      var modalView = new AssetListTab.AssetDetailsModalView({model:theModel});
      //show the modal view in the modal area
      App.tabDiv.modalArea.show(modalView);
      AssetMgmtApp.AssetListTab.AssetListController.getDepartments(function() {
        var dropDown = new AssetListTab.AssetDepartmentCompositeView({collection: AssetMgmtApp.AssetListTab.departmentList, model: theModel});
        modalView.departmentsDropDown.show(dropDown);
      });
    },

    //Function to show the user modal for a new item that will be added to the item collection
    showAssetsAddModal: function() {
      //Disable the add new button
      $('#addNew').prop('disabled',true);
      //Show the fade overaly
      $('#fade').addClass('fade');
      //show the modal box div
      $('#modalBox').addClass('modalBox');
      //now that the modal and overlay are up, reenable the add new button.
      //It still can't be clicked since the overlay is in the way.
      //By disabling and re-enablig after the overlay is in place, we can minimize the user double clickin the add button.
      $('#addNew').prop('disabled',false);
      //Fetch the users and pass in the anonymous function as a callback
      var modalView = new AssetListTab.AssetAddModalView({model:new AssetListTab.AssetModel()});
      App.tabDiv.modalArea.show(modalView);
      AssetMgmtApp.AssetListTab.AssetListController.getDepartments(function() {
        var dropDown = new AssetListTab.AssetDepartmentCompositeView({collection: AssetMgmtApp.AssetListTab.departmentList});
        modalView.departmentsDropDown.show(dropDown);
      });
    },

  };
});
