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

    //when the page loads, it adds an arrow to the date column header
    onShow : function() {      
      $('#date').html('&#9660 Date');
    },

    //defines event listeners and the functions to call
    events : {
      "click #itemName" : "sortByItem",
      "click #actionType" : "sortByAction",
      "click #user" : "sortByUser",
      "click #date" : "sortByDate",
    },

    //when "Item Name" is clicked, it wil change how the list is sorted
    sortByItem : function() {
      //if the global sort variable is set to item ascending
      if (ViewLogTab.sort == 'itemAsc')
      {
        //clears the current arrows from the column names
        ViewLogTab.ViewLogController.clearSort();
        //set the global sort variable to the new sort
        ViewLogTab.sort = 'itemDes';
        //fetchs a new sorted collection
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        ViewLogTab.logCollection.reset();
        //adds an arrow to the column header
        $('#itemName').html('&#9650 Item Name');
      }
      else
      {
        //clears the current arrows from the column names
        ViewLogTab.ViewLogController.clearSort();
        //set the global sort variable to the new sort
        ViewLogTab.sort = 'itemAsc';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        //fetchs a new sorted collection
        ViewLogTab.logCollection.reset();
        //adds an arrow to the column header
        $('#itemName').html('&#9660 Item Name');
      }
    },

    //when "Action" is clicked, it wil change how the list is sorted
    sortByAction : function() {
      if (ViewLogTab.sort == 'actionAsc')
      {
        //clears the current arrows from the column names
        ViewLogTab.ViewLogController.clearSort();
        //set the global sort variable to the new sort
        ViewLogTab.sort = 'actionDes';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        //fetchs a new sorted collection
        ViewLogTab.logCollection.reset();
        //adds an arrow to the column header
        $('#actionType').html('&#9650 Action');
      }
      else
      {
        //clears the current arrows from the column names
        ViewLogTab.ViewLogController.clearSort();
        //set the global sort variable to the new sort
        ViewLogTab.sort = 'actionAsc';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        //fetchs a new sorted collection
        ViewLogTab.logCollection.reset();
        //adds an arrow to the column header
        $('#actionType').html('&#9660 Action');
      }
    },

    //when "User" is clicked, it wil change how the list is sorted
    sortByUser : function() {
      if (ViewLogTab.sort == 'userAsc')
      {
        //clears the current arrows from the column names
        ViewLogTab.ViewLogController.clearSort();
        //set the global sort variable to the new sort
        ViewLogTab.sort = 'userDes';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        //fetchs a new sorted collection
        ViewLogTab.logCollection.reset();
        //adds an arrow to the column header
        $('#user').html('&#9650 User');
      }
      else
      {
        //clears the current arrows from the column names
        ViewLogTab.ViewLogController.clearSort();
        //set the global sort variable to the new sort
        ViewLogTab.sort = 'userAsc';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        //fetchs a new sorted collection
        ViewLogTab.logCollection.reset();
        //adds an arrow to the column header
        $('#user').html('&#9660 User');
      }
    },

    //when "Date" is clicked, it wil change how the list is sorted
    sortByDate : function() {
      if (ViewLogTab.sort == 'dateAsc')
      {
        //clears the current arrows from the column names
        ViewLogTab.ViewLogController.clearSort();
        //set the global sort variable to the new sort
        ViewLogTab.sort = 'dateDes';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        //fetchs a new sorted collection
        ViewLogTab.logCollection.reset();
        //adds an arrow to the column header
        $('#date').html('&#9650 Date');
      }
      else
      {
        //clears the current arrows from the column names
        ViewLogTab.ViewLogController.clearSort();
        //set the global sort variable to the new sort
        ViewLogTab.sort = 'dateAsc';
        ViewLogTab.logCollection.fetch({data: {sort: ViewLogTab.sort}});
        //fetchs a new sorted collection
        ViewLogTab.logCollection.reset();
        //adds an arrow to the column header
        $('#date').html('&#9660 Date');
      }
    }
    
  });
});