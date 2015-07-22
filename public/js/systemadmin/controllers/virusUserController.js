//Define module for the inventory tab to live in.
SysAdminApp.module('VirusUserTab', function (VirusUserTab, App, Backbone, Marionette, $, _) {
  
  //Define controller for the inventory tab functions to live in.
  VirusUserTab.VirusUserController = {

  	//Function to get the inventory if it has not already been fetched
    getVirusUser : function(callback) {
      //If the inventory collection does not already exist
      if (typeof VirusUserTab.usersList === "undefined") {
        //Instanciate a new invenory collection
        VirusUserTab.usersList = new SysAdminApp.VirusUserTab.ScanUsersCollection();
        //fetch the data for the collection and call the callback on success.
        //The callback will most likely be showVirusTrackerTable
        VirusUserTab.usersList.fetch({success : callback});
      } else {
        //Already have the collection. Call callback (showVirusTrackerTable)
        callback();
      }
    },

    //Function to show the scans table.
    showVirusUserTable : function() {
      //Instanciate a new scans composite view and pass it the scan collection as well as the template to use
      var tabContentDiv = new VirusUserTab.VirusUserCompositeView({collection: VirusUserTab.usersList,'contentName':'virususer/userTable'});
      //show the view in the tab content
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    //Function to show the scan modal for an existing model in the item collection
    showUserModal: function(theModel) {
      //Show the fade overlay
      $('#fade').addClass('fade');
      //show the modal div
      $('#modalBox').addClass('modalBox');
      //Instanciate a new modal view passing it the model that was passed into this function, and the collection of virus users
      var modalView = new VirusUserTab.UserDetailsModalView({model:theModel});
      //show the modal view in the modal area
      App.tabDiv.modalArea.show(modalView);
    },

    //Function to show the scan modal for a new item that will be added to the item collection
    showUserAddModal: function() {
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
      //Fetch the vendors and pass in the anonymous function as a callback
      VirusUserTab.VirusUserController.getVirusUser(function(){
        //Instanciate a new Scan add modal view and pass it a new item model, and the vendor collection
        var modalView = new VirusUserTab.UserAddModalView({model:new VirusUserTab.ScanUserModel()});
        //show the add view in the modal box
        App.tabDiv.modalArea.show(modalView);
      });
    },

  };
});
