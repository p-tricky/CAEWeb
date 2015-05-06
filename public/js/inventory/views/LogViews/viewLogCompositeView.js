//Define a module for all of the view log functions to live in.
InventoryApp.module('ViewLogTab', function (ViewLogTab, App, Backbone, Marionette, $, _) {
  //Define a composite view to display the log entries in a table
  ViewLogTab.ViewLogCompositeView = Backbone.Marionette.CompositeView.extend({
    
    //Define the item view that this view will use to display the table rows
    itemView: InventoryApp.ViewLogTab.ViewLogItemView,

    //Function that will be called when the view is instanciated
    initialize : function(options) {
      //fetch any passed options out of the parameters such as the template
      this.options = options || {};
      //use the tpl function to get the template name out of the options and then
      //pass the template to handlebars before it assigns the template to the view
      this.template = Handlebars.compile(tpl.get(this.options.contentName));

      ViewLogTab.sort = 'dateAsc';
    },

    //Define a id for this view
    id:'viewLogTable',

    //Define the item view container for this composite view
    itemViewContainer: "tbody",

    events : {
      "click #itemName" : "sortByItem",
      "click #actionType" : "sortByAction",
      "click #user" : "sortByUser",
      "click #date" : "sortByDate",
    },

    sortByItem : function() {
      if (ViewLogTab.sort == 'itemAsc')
      {
        ViewLogTab.ViewLogController.clearSort();
        ViewLogTab.sort = 'itemDes';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        ViewLogTab.logCollection.reset();
        $('#itemName').html('&#9650 Item Name');
      }
      else
      {
        ViewLogTab.ViewLogController.clearSort();
        ViewLogTab.sort = 'itemAsc';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        ViewLogTab.logCollection.reset();
        $('#itemName').html('&#9660 Item Name');
      }
    },

    sortByAction : function() {
      if (ViewLogTab.sort == 'actionAsc')
      {
        ViewLogTab.ViewLogController.clearSort();
        ViewLogTab.sort = 'actionDes';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        ViewLogTab.logCollection.reset();
        $('#actionType').html('&#9650 Action');
      }
      else
      {
        ViewLogTab.ViewLogController.clearSort();
        ViewLogTab.sort = 'actionAsc';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        ViewLogTab.logCollection.reset();
        $('#actionType').html('&#9660 Action');
      }
    },

    sortByUser : function() {
      if (ViewLogTab.sort == 'userAsc')
      {
        ViewLogTab.ViewLogController.clearSort();
        ViewLogTab.sort = 'userDes';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        ViewLogTab.logCollection.reset();
        $('#user').html('&#9650 User');
      }
      else
      {
        ViewLogTab.ViewLogController.clearSort();
        ViewLogTab.sort = 'userAsc';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        ViewLogTab.logCollection.reset();
        $('#user').html('&#9660 User');
      }
    },

    sortByDate : function() {
      if (ViewLogTab.sort == 'dateAsc')
      {
        ViewLogTab.ViewLogController.clearSort();
        ViewLogTab.sort = 'dateDes';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        ViewLogTab.logCollection.reset();
        $('#date').html('&#9650 Date');
      }
      else
      {
        ViewLogTab.ViewLogController.clearSort();
        ViewLogTab.sort = 'dateAsc';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        ViewLogTab.logCollection.reset();
        $('#date').html('&#9660 Date');
      }
    }
    
  });
});