//Define module for the open/close checklist tab to live in.
SysAdminApp.module('OpenCloseChecklistTab', function (OpenCloseChecklistTab, App, Backbone, Marionette, $, _) {
  
  //Define controller for the open/close tab controller functions to live in.
  OpenCloseChecklistTab.OpenCloseChecklistController = {

  	getChecklists : function(callback)
  	{
  		if (typeof OpenCloseChecklistTab.openCloseChecklist === "undefined") {
  			OpenCloseChecklistTab.openCloseChecklist = new SysAdminApp.OpenCloseChecklistTab.OpenCloseChecklistCollection();
  			OpenCloseChecklistTab.openCloseChecklist.fetch({success : callback});
  		} else {
  			callback();
  		}
  	},

  	showContent : function()
  	{
  		SysAdminApp.checklistContent = new OpenCloseChecklistTab.OpenCloseChecklistSectionsView({'tabName' : 'openclosechecklist/checklistSections'});
  		App.tabDiv.tabContent.show(SysAdminApp.checklistContent);

  		OpenCloseChecklistTab.OpenCloseChecklistController._getPayPeriod(OpenCloseChecklistTab.OpenCloseChecklistController.showChecklistFilter);
  		OpenCloseChecklistTab.OpenCloseChecklistController.showChecklistTable();
  	},

  	showChecklistFilter : function(payPeriodData)
  	{
      theModel = new Backbone.Model(JSON.parse(payPeriodData));
  		var filterContent = new OpenCloseChecklistTab.OpenCloseChecklistFilterView({model: theModel, 'tabName' : 'openclosechecklist/openCloseChecklistFilter'});
  		SysAdminApp.checklistContent.checklistFilterSection.show(filterContent);
      $('#datepicker1').datepicker();
      $('#datepicker2').datepicker();
  	},

  	showChecklistTable : function()
  	{
  		var tableContent = new OpenCloseChecklistTab.OpenCloseChecklistTableView({collection: OpenCloseChecklistTab.openCloseChecklist, 'tabName' : 'openclosechecklist/openCloseChecklistTable'});
  		SysAdminApp.checklistContent.checklistTableSection.show(tableContent);
  	},

    _getPayPeriod : function(callback) {
        $.ajax({
            url: '../employee/api/payperiod'
        })
        .done(callback);
    },

    getChecklistsInRange : function(start, end)
    {
      OpenCloseChecklistTab.openCloseChecklist.fetch({success: OpenCloseChecklistTab.openCloseChecklist.reset(), data: {start: start, end: end}});
    },

  	showOpenCloseChecklistDetailsModal : function(theModel) {
  		//Show the fade overlay
      $('#fade').addClass('fade');
      //show the modal div
      $('#modalBox').addClass('modalBox');
      //Instanciate a new modal view passing it the model that was passed into this function, and the collection of virus users
      var modalView = new OpenCloseChecklistTab.OpenCloseChecklistDetailsModalView({model:theModel});
      //show the modal view in the modal area
      App.tabDiv.modalArea.show(modalView);
  	},

  	showOpenTaskListModal : function(theModel) {
  		//Show the fade overlay
      $('#fade').addClass('fade');
      //show the modal div
      $('#modalBox').addClass('modalBox');
      //Instanciate a new modal view passing it the model that was passed into this function, and the collection of virus users
      var modalView = new OpenCloseChecklistTab.OpenTaskListModalView({model:theModel});
      //show the modal view in the modal area
      App.tabDiv.modalArea.show(modalView);
  	},

  	showCloseTaskListModal : function(theModel) {
  		//Show the fade overlay
      $('#fade').addClass('fade');
      //show the modal div
      $('#modalBox').addClass('modalBox');
      //Instanciate a new modal view passing it the model that was passed into this function, and the collection of virus users
      var modalView = new OpenCloseChecklistTab.CloseTaskListModalView({model:theModel});
      //show the modal view in the modal area
      App.tabDiv.modalArea.show(modalView);
  	},
  };

});
