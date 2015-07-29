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
      var scanDetailsModalView = new VirusTrackerTab.ScanDetailsModalView({model:theModel});
      //show the modal view in the modal area
      App.tabDiv.modalArea.show(scanDetailsModalView);
      var virusUsers = SysAdminApp.VirusUserTab.VirusUserController.getVirusUser(function() {
        var dropDown = new VirusTrackerTab.VirusUserCompositeView({collection: SysAdminApp.VirusUserTab.usersList});
        scanDetailsModalView.userDropDownContent.show(dropDown);
      });
    },


    //Function to show the scan modal for a new item that will be added to the item collection
    showScanAddModalView: function() {
      //Disable the add new button
      $('#addNewScan').prop('disabled',true);
      //Show the fade overaly
      $('#fade').addClass('fade');
      //show the modal box div
      $('#modalBox').addClass('modalBox');
      //now that the modal and overlay are up, reenable the add new button.
      //It still can't be clicked since the overlay is in the way.
      //By disabling and re-enablig after the overlay is in place, we can minimize the user double clickin the add button.
      $('#addNewScan').prop('disabled',false);
      var scanAddModalView = new VirusTrackerTab.ScanAddModalView({
        model: new VirusTrackerTab.ScanModel(),
      });
      //show the modal view in the modal area
      App.tabDiv.modalArea.show(scanAddModalView);
      var virusUsers = SysAdminApp.VirusUserTab.VirusUserController.getVirusUser(function() {
        var dropDown = new VirusTrackerTab.VirusUserCompositeView({collection: SysAdminApp.VirusUserTab.usersList});
        scanAddModalView.userDropDownContent.show(dropDown);
      });
    },

  };
});
