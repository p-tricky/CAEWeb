//This is the view that is used for the shift filter section of the tab
EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.ShiftFilterView = Backbone.Marionette.ItemView.extend({

    //sets the options and loads the template
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //defines the listener for the apply filter button
    events:
    {
        'click #applyFilter': 'applyFilter'
    },

    //will get a new set of shifts that are within the range of the dates
    applyFilter : function() {
      //sets two date objects to see if the dates are correct
      var date1 = new Date($('#datepicker1').val());
      var date2 = new Date($('#datepicker2').val());

      //if the first date is after the second date, it swaps the dates
      if (date1 > date2)
      {
        temp = $('#datepicker1').val();
        $('#datepicker1').val($('#datepicker2').val());
        $('#datepicker2').val(temp);
      }
      //sets the start and end to send off to the controller
      var start = $('#datepicker1').val();
      var end = $('#datepicker2').val();
      //gets the shifts for the new range
      EmployeeApp.MyHoursTab.MyHoursController.getShiftsInRange(start, end);
    }

  });
});