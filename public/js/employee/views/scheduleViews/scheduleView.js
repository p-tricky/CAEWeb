//Define the module for the AdminScheduleTab logic to live in. Note:this view is used by all views even though it is namespaced to admin.
EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  //Define a layout to be used to split the content area into a employee select section, and a schedule section.
  AdminScheduleTab.ScheduleView = Backbone.Marionette.Layout.extend({

    //Get any options, and define the template to use.
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('schedule/scheduleView'));
    },

    //Define the two regions for content
    regions: {
        employeeSelectSection: '#employeeSelectSection',
        scheduleSection: '#scheduleSection'
    },

    //Give this div for this view an id
    id:'innerTabsContentDiv',


    events: {
      'click #print': 'printSchedule'
    },

    printSchedule : function() {
      this.printGrid();

    }, 

    //This function resizes the kendo schedule and calls the print function for the window. 
    //After the print window closes, it resizes back to the page width

    //TODO: I was trying to add a way to allow users to only print a certain time range or 
    //certain days instead of the whole schedule. Kendo has a property (somewhere) that disallows
    //the editing of where events are placed in the grid. This made it so I couldn't re-adjust 
    //where the event(shift) was placed after turning off the display for the specified time.
    //This could be finished in the future with some more research into how kendo defines events  
    printGrid : function() {
      var schedulerElement = $("#scheduleSection")
      schedulerElement.width(1260);
      // readjust events' positions
      schedulerElement.data("kendoScheduler")._resize();
      window.print();
      // restore previous Scheduler layout
      schedulerElement.width("100%");
      schedulerElement.data("kendoScheduler")._resize(); 
  }


  });
});