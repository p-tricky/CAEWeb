//Define module for the Virus User tab to live in.
SysAdminApp.module('VirusUserTab', function (VirusUserTab, App, Backbone, Marionette, $, _) {
  //Define a composite view for displaying a table of the the items
  VirusUserTab.VirusUserCompositeView = Backbone.Marionette.CompositeView.extend({
    
    //Define which Item view to associate with this composite view
    itemView: SysAdminApp.VirusUserTab.ScanUserItemView,

    //When this view is intanciated, run the following function
    initialize : function(options) {
      //fetch any options that are passed in, and assign them to this view
      this.options = options || {};
      //Define the template to use for this view by using tpl to fetch it and pass it to handlbars
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //Define an id field for this view. The tab for this view is a div by default
    id:'usersTable',

    //Define the container for the Item Views to be inserted into
    itemViewContainer: "tbody",

    //Define events for the view
    events: {
      'click #addNew' : 'addNew'
    },

    //When the add New button is clicked, this function will run
    addNew: function() {
      //Call the showUserAddModal function in the Virus User controller
      VirusUserTab.VirusUserController.showUserAddModal();
    }
    
  });
});
