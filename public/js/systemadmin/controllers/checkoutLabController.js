//Define module for the inventory tab to live in.
SysAdminApp.module('CheckoutLabTab', function (CheckoutLabTab, App, Backbone, Marionette, $, _) {
  
  //Define controller for the inventory tab functions to live in.
  CheckoutLabTab.CheckoutLabController = {

  	getCheckouts : function(callback) {
  		if (CheckoutLabTab.checkoutLabList === undefined) {
        CheckoutLabTab.sortBy = "dateDesc";
  			CheckoutLabTab.checkoutLabList = new CheckoutLabTab.CheckoutLabCollection();
  			CheckoutLabTab.checkoutLabList.fetch({data: {sort: CheckoutLabTab.sortBy}, success: callback});
  		} else {
  			callback();
  		}
  	},

  	showCheckoutsTable : function() {
  		//Instanciate a new scans composite view and pass it the scan collection as well as the template to use
      var tabContentDiv = new CheckoutLabTab.CheckoutLabCompositeView({collection: CheckoutLabTab.checkoutLabList,'contentName':'checkoutlab/checkoutTable'});
      //show the view in the tab content
      App.tabDiv.tabContent.show(tabContentDiv);
  	},

  	showCheckoutAddModal : function() {
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
      CheckoutLabTab.CheckoutLabController.getCheckouts(function(){
        //Instanciate a new User add modal view and pass it a new item model
        var modalView = new CheckoutLabTab.CheckoutLabAddModalView({model:new CheckoutLabTab.CheckoutLabModel()});
        //show the add view in the modal box
        App.tabDiv.modalArea.show(modalView);
      });
  	},

  	showCheckoutDetailsModal : function(theModel) {
  		//Show the fade overlay
      $('#fade').addClass('fade');
      //show the modal div
      $('#modalBox').addClass('modalBox');
      //Instanciate a new modal view passing it the model that was passed into this function, and the collection of virus users
      var modalView = new CheckoutLabTab.CheckoutLabDetailsModalView({model:theModel});
      //show the modal view in the modal area
      App.tabDiv.modalArea.show(modalView);
  	},

  };
});
