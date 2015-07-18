//Define module for the inventory tab to live in.
SysAdminApp.module('VirusTrackerTab', function (VirusTrackerTab, App, Backbone, Marionette, $, _) {
  
  //Define controller for the inventory tab functions to live in.
  VirusTrackerTab.VirusTrackerController = {

    //Function to get the inventory if it has not already been fetched
    getVirusTracker : function(callback) {
      //If the inventory collection does not already exist
      if (typeof VirusTrackerTab.scansList === "undefined") {
        //Instanciate a new invenory collection
        VirusTrackerTab.scansList = new SysAdminApp.VirusTrackerTab.ScansCollection();
        //fetch the data for the collection and call the callback on success.
        //The callback will most likely be showVirusTrackerTable
        VirusTrackerTab.scansList.fetch({success : callback});
      } else {
        //Already have the collection. Call callback (showVirusTrackerTable)
        callback();
      }
    },

    //Function to show the scans table.
    showVirusTrackerTable : function() {
      //Instanciate a new scans composite view and pass it the scan collection as well as the template to use
      var tabContentDiv = new VirusTrackerTab.VirusTrackerCompositeView({collection: VirusTrackerTab.scansList,'contentName':'virustracker/scansTable'});
      //show the view in the tab content
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    //Function to show the scan modal for an existing model in the item collection
    showScanModal: function(theModel) {
      //Show the fade overlay
      $('#fade').addClass('fade');
      //show the modal div
      $('#modalBox').addClass('modalBox');
      //Instanciate a new modal view passing it the model that was passed into this function, and the collection of virus users
      var modalView = new VirusTrackerTab.ScanDetailsModalView({model:theModel});
      //show the modal view in the modal area
      App.tabDiv.modalArea.show(modalView);
    },

    //Function to get the vendors collection if it has not already been fetched
    getVirusUsers : function(callback) {
      //If the vendor collection does not already exist
      if (typeof VirusTrackerTab.vendorCollection === "undefined") {
        //Instanciate a new vendor collection
        VirusTrackerTab.virusUserCollection = new VirusTrackerTab.VirusUserCollection();
        //fetch the data for the collection and call the callback on success
        //The call back for this function could be a number of different functions.
        //In the two below methods, it is a anonymous function that gets passed in.
        VirusTrackerTab.virusUserCollection.fetch({success : callback});
      } else {
        //Already have the collection. Call the callback
        callback();
      }
    },

    //Function to show the scan modal for a new vendor that will be added to the vendor collection
    showVirusUserAddModal : function() {
      //Disable the add new button
      $('#addVirusUser').prop('disabled',true);
      //Show the fade overaly
      $('#fade').addClass('fade');
      //show the modal box div
      $('#modalBox').addClass('modalBox');
      //now that the modal and overlay are up, reenable the add new button.
      //It still can't be clicked since the overlay is in the way.
      //By disabling and re-enablig after the overlay is in place, we can minimize the user double clickin the add button.
      $('#addVirusUser').prop('disabled',false);
      //Fetch the vendors and pass in the anonymous function as a callback
      VirusTrackerTab.VirusTrackerController.getVirusUsers(function(){
        //Instanciate a new vendor add modal view and pass it a new vendor model, and the vendor collection
        var modalView = new VirusTrackerTab.VirusUserAddModalView({model:new VirusTrackerTab.VirusUserModel()});
        //show the add view in the modal box
        App.tabDiv.modalArea.show(modalView);
      });
    },

    //Function to show the scan modal for a new item that will be added to the item collection
    showScanAddModalView: function(theModel) {
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
      VirusTrackerTab.VirusTrackerController.getVirusUsers(function(){
        //Instanciate a new Scan add modal view and pass it a new item model, and the vendor collection
        var modalView = new VirusTrackerTab.ScanAddModalView({model:new VirusTrackerTab.ScanModel(),collection:VirusTrackerTab.virusUserCollection});
        //show the add view in the modal box
        App.tabDiv.modalArea.show(modalView);
        //Hide the delte button since we don't want a user to be able to delete a item they are trying to add.
        $('#delete').hide();
      });
    },

  };
});
