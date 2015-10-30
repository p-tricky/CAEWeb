//Define module for the asset list tab to live in.
SysAdminApp.module('OpenCloseChecklistTab', function (OpenCloseChecklistTab, App, Backbone, Marionette, $, _) {
  //Define a composite view for displaying a table of the the items
  OpenCloseChecklistTab.OpenCloseChecklistTableView = Backbone.Marionette.CompositeView.extend({
    
    //Define which Item view to associate with this composite view
    itemView: SysAdminApp.OpenCloseChecklistTab.OpenCloseChecklistItemView,

    //When this view is intanciated, run the following function
    initialize : function(options) {
      //fetch any options that are passed in, and assign them to this view
      this.options = options || {};
      //Define the template to use for this view by using tpl to fetch it and pass it to handlbars
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //Define an id field for this view. The tab for this view is a div by default
    id:'checklistTable',

    //Define the container for the Item Views to be inserted into
    itemViewContainer: "tbody",

    //Define events for the view
    events: {
      'click #addNew': 'newChecklist',
    },

    newChecklist: function() {
      //sets the new model's date to the current day
      var today = new Date().toISOString();
      var data = {
        "task_date": today.substr(0, today.indexOf('T')),
      };
      OpenCloseChecklistTab.openCloseChecklist.create(data, {
        wait: true,
        success: function() { 
        },
        error: function(model, response) {
          // leave UserAddModalView open and open error dialog
          var msg = response.responseJSON.error.message;
          var errorAlert = $('#confirmModalBox');
          if (msg.indexOf("SQLSTATE[23000]") >= 0) 
            errorAlert.html("A checklist already exists for that date.  Please edit the existing checklist.");
          else
            errorAlert.html("Sorry, there was an error");
          errorAlert.dialog({
            modal: true,
            title: 'Error when saving',
            buttons: {
              'Ok': function() {
                $(this).dialog('close');
              }
            },
          });
        },
      });
    },

  });
});
