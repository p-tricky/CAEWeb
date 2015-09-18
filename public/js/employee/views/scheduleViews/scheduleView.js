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
      'click #print': 'printSchedule',
      'click #getEmails': 'getEmails'
    },

    printSchedule : function() {
      this.printGrid();

    }, 

    getEmails : function() {
      var textArea = document.createElement("textarea");

      //
      // *** This styling is an extra step which is likely not required. ***
      //
      // Why is it here? To ensure:
      // 1. the element is able to have focus and selection.
      // 2. if element was to flash render it has minimal visual impact.
      // 3. less flakyness with selection and copying which **might** occur if
      //    the textarea element is not visible.
      //
      // The likelihood is the element won't even render, not even a flash,
      // so some of these are just precautions. However in IE the element
      // is visible whilst the popup box asking the user for permission for
      // the web page to copy to the clipboard.
      //

      // Place in top-left corner of screen regardless of scroll position.
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;

      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = '2em';
      textArea.style.height = '2em';

      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = 0;

      // Clean up any borders.
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';

      // Avoid flash of white box if rendered for any reason.
      textArea.style.background = 'transparent';


      textArea.value = EmployeeApp.emails;

      document.body.appendChild(textArea);

      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
        if (msg == 'unsuccessful')
          window.prompt("Copy to clipboard: Ctrl+C, Enter", EmployeeApp.emails);
      } catch (err) {
        console.log('Oops, unable to copy');
        window.prompt("Copy to clipboard: Ctrl+C, Enter", EmployeeApp.emails);
      }

      document.body.removeChild(textArea);
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