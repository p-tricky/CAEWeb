//Define module for the inventory tab to live in.
SysAdminApp.module('VirusTrackerTab', function (VirusTrackerTab, App, Backbone, Marionette, $, _) {
  //Define the Item Model to hold information about a item
  VirusTrackerTab.ScanModel = Backbone.Model.extend({
    //Define some defaults for new models that are created clientside
    defaults : {
      'id' : null,
      'user_name' : '',
      'mac_addr' : '',
      'scan_date' : '',
      'room_number' : '',
      'cpu_desc' : '',
      'troj_mal' : '0',
      'pups' : '0',
      'notes':'',
      'scanned_by':'',
      'updated_at':'',
      'created_at':'',
    },

    //url for the model to use to persist data to the server side
    urlRoot : 'api/scans',

    //Function to setup some inital things for the model
    initialize : function() {
      //If the model is invalid, alert the user that the model could not be saved.
      this.on("invalid", function(model, error) {
        $('#confirmModalBox').html("Unable to save " + model.get("name") + "\n" + error);
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
  });

  //Define the collection for scans that is based on the above defined item model
  VirusTrackerTab.ScansCollection = Backbone.Collection.extend({
    //Define which model to use
    model : VirusTrackerTab.ScanModel,
    //define url for persistance
    url : 'api/scans'
  });
});
