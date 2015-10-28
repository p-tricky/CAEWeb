//Define module for the inventory tab to live in.
SysAdminApp.module('OpenCloseChecklistTab', function (OpenCloseChecklistTab, App, Backbone, Marionette, $, _) {
  
  //Define controller for the inventory tab functions to live in.
  OpenCloseChecklistTab.OpenCloseChecklistController = {

  	getChecklists : function(callback)
  	{
  		if (typeof OpenCloseChecklistTab.openCloseChecklist === "undefined") {
  			OpenCloseChecklistTab.openCloseChecklist = new SysAdminApp.OpenCloseChecklistTab.OpenCloseChecklistCollection();
  			OpenCloseChecklistTab.openCloseChecklist.fetch({success : callback()});
  		} else {
  			callback();
  		}
  	},

  	showContent : function()
  	{
  		SysAdminApp.checklistContent = new OpenCloseChecklistTab.OpenCloseChecklistSectionsView({'tabName' : 'openclosechecklist/checklistSections'});
  		App.tabDiv.tabContent.show(SysAdminApp.checklistContent);

  		OpenCloseChecklistTab.OpenCloseChecklistController.showChecklistFilter();
  		OpenCloseChecklistTab.OpenCloseChecklistController.showChecklistTable();
  	},

  	showChecklistFilter : function()
  	{
  		var filterContent = new OpenCloseChecklistTab.OpenCloseChecklistFilterView({'tabName' : 'openclosechecklist/openCloseChecklistFilter'});
  		SysAdminApp.checklistContent.checklistFilterSection.show(filterContent);
  	},

  	showChecklistTable : function()
  	{
  		var tableContent = new OpenCloseChecklistTab.OpenCloseChecklistTableView({'tabName' : 'openclosechecklist/openCloseChecklistTable'});
  		SysAdminApp.checklistContent.checklistTableSection.show(tableContent);
  	}
  };

});
