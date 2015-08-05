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

  	getDepartments : function() {
  		if (typeof AssetListTab.departmentList === "indefined") {
  			AssetListTab.departmentList = new AssetMgmtApp.AssetListTab.DepartmentCollection();
  			AssetListTab.departmentList.fetch();
  		}
  	},
  	
  	showAssetsTable : function() {
  		var tabContentDiv = new AssetListTab.AssetsCompositeView({collection: AssetListTab.assetsList, 'contentName':'assetsList/assetTable'});
  		App.tabDiv.tabContent.show(tabContentDiv);
  	}

  };
});