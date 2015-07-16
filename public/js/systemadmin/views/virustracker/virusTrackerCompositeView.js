//Define module for the inventory tab to live in.
SysAdminApp.module('VirusTrackerTab', function (VirusTrackerTab, App, Backbone, Marionette, $, _) {
  //Define a composite view for displaying a table of the the items
  VirusTrackerTab.VirusTrackerCompositeView = Backbone.Marionette.CompositeView.extend({
    
    //Define which Item view to associate with this composite view
    itemView: SysAdminApp.VirusTrackerTab.VirusTrackerItemView,

    //When this view is intanciated, run the following function
    initialize : function(options) {
      //fetch any options that are passed in, and assign them to this view
      this.options = options || {};
      //Define the template to use for this view by using tpl to fetch it and pass it to handlbars
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //Define an id field for this view. The tab for this view is a div by default
    id:'scansTable',

    //Define the container for the Item Views to be inserted into
    itemViewContainer: "tbody",

    //Define events for the view
    events: {
      'click #addNew' : 'addNew',
      'click #addVendor' : 'addVirusUser'
    },

    //When the add New button is clicked, this function will run
    addNew: function() {
      //Call the showInventoryItemAddModal function in the inventory controller
      VirusTrackerTab.VirusTrackerController.showScanAddModal(this.model);
    },

    //When the add New Vendor button is clicked, this function will run
    addVirusUser: function() {
      //call the showInventoryVendorAddModal function in the inventory controller
      VirusTrackerTab.VirusTrackerController.showVirusUserAddModal(this.model);
    }
    
  });
});
