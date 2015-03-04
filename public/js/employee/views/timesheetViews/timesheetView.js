//Define the module for the MyTimesheetTab logic to live in. 
EmployeeApp.module('TimesheetTab', function (TimesheetTab, App, Backbone, Marionette, $, _) {
//Define a layout to be used to split the content area into a employee select section, and a schedule section.
  TimesheetTab.TimesheetView = Backbone.Marionette.Layout.extend({

    //Get any options, and define the template to use. 
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    events: {
    	'click #applyFilter': 'applyFilter'
    },
    
    applyFilter : function() {
        var start = $('#datepicker1').val();
        var end = $('#datepicker2').val();

        TimesheetTab.TimesheetController.getShiftsInRange(start, end);
        TimesheetTab.TimesheetController.getShiftsInRange(start, end);
    }
  });
});