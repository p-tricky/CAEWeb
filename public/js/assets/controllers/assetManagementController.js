//Define module for the assets list tab to live in.
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  
  //Define controller for the assets list tab functions to live in.
  AssetListTab.AssetListController = {

    //get the list of assets and then call the callback
    //if the assets list exists, then just call the callback
  	getAssets : function(callback) {
  		if (typeof AssetListTab.assetsList === "undefined") {
        AssetListTab.sort = 'brandAsc';
  			AssetListTab.assetsList = new AssetMgmtApp.AssetListTab.AssetsCollection();
  			AssetListTab.assetsList.fetch({data: {sort: AssetListTab.sort}, success : callback});
  		} else {
  			callback();
  		}
  	},

    //get a list of departments for the drop down in the modals
    //afterwords, call the callback
  	getDepartments : function(callback) {
  		if (typeof AssetListTab.departmentList === "undefined") {
  			AssetListTab.departmentList = new AssetMgmtApp.AssetListTab.DepartmentCollection();
  			AssetListTab.departmentList.fetch({success: callback});
  		} else {
  			callback();
      }
  	},
  	
    showAssetsContent : function() {
      //Make the view that defines the two regions for the tab
      AssetMgmtApp.assetsContent = new AssetListTab.AssetSectionsView({'tabName' : 'assetsList/assetSections'});
      App.tabDiv.tabContent.show(AssetMgmtApp.assetsContent);

      AssetMgmtApp.AssetListTab.AssetListController.showAssetsTable();
      AssetMgmtApp.AssetListTab.AssetListController.showAssetsFilter();
    },

    //show the assets table view and then show it in the tabContent
  	showAssetsTable : function() {
  		var tabContentDiv = new AssetListTab.AssetsCompositeView({collection: AssetListTab.assetsList, 'contentName':'assetsList/assetTable'});
      AssetMgmtApp.assetsContent.assetListSection.show(tabContentDiv);
  	},

    showAssetsFilter : function() {
      var filterContent = new AssetListTab.AssetsFilterView({'tabName' : 'assetsList/assetFilter'});
      AssetMgmtApp.assetsContent.assetFilterSection.show(filterContent);
    },

  	//Function to show the asset details modal for an existing model in the asset collection
    showAssetsModal: function(theModel) {
      //Show the fade overlay
      $('#fade').addClass('fade');
      //show the modal div
      $('#modalBox').addClass('modalBox');
      //Instanciate a new modal view passing it the model that was passed into this function
      var modalView = new AssetListTab.AssetDetailsModalView({model:theModel});
      //show the modal view in the modal area
      App.tabDiv.modalArea.show(modalView);
      //get a list of deparments, then make the view for the drp down
      AssetMgmtApp.AssetListTab.AssetListController.getDepartments(function() {
        //send in the model and the departments collection
        var dropDown = new AssetListTab.AssetDepartmentCompositeView({collection: AssetMgmtApp.AssetListTab.departmentList, model: theModel});
        //show the departments dropdown
        modalView.departmentsDropDown.show(dropDown);
      });
    },

    //Function to show the assets modal for a new asset that will be added to the asset collection
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
      //make the modal view, sending in a new asset model
      var modalView = new AssetListTab.AssetAddModalView({model:new AssetListTab.AssetModel()});
      //show the created modal
      App.tabDiv.modalArea.show(modalView);
      //get the departments list and make the view for the drop down
      AssetMgmtApp.AssetListTab.AssetListController.getDepartments(function() {
        //make the drop down for the departments by sending in the collection
        var dropDown = new AssetListTab.AssetDepartmentCompositeView({collection: AssetMgmtApp.AssetListTab.departmentList});
        //show the drop down
        modalView.departmentsDropDown.show(dropDown);
      });
    },

  };
});
