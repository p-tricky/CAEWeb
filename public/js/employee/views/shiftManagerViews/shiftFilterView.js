//This defines the filter section of the tab. Is passed a model that contains the startDate and endDate
EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.ShiftFilterView = Backbone.Marionette.ItemView.extend({

    //sets the options and loads the template
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //defines the methods to run when a button is clicked
    events:
    {
        'click #applyFilter'   : 'applyFilter',
        'click #prevPayPeriod' : 'prevPayPeriod',
        'click #currPayPeriod' : 'currPayPeriod',
        'click #nextPayPeriod' : 'nextPayPeriod',
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
      EmployeeApp.ShiftManagerTab.ShiftManagerController.getShiftsInRange(start, end);
      ShiftManagerTab.ShiftManagerController.clearSort();
      $('#searchText').val("");
    },

    //will run when the user clicks the previous arrow
    prevPayPeriod : function() {
      //creates two dates that are used to calculate back two weeks
      var date1 = new Date($('#datepicker1').val());
      var date2 = new Date($('#datepicker2').val());

      //subtracts two weeks
      date1.setDate(date1.getDate()-14);
      date2.setDate(date2.getDate()-14);

      //if the month is a double digit
      //since months are 0-11, month 9 after the toTimeString would be 10 (October)
      if (date1.getMonth() >= 9)
        var start = date1.toLocaleDateString();
      //if the month is a single digit
      else
        var start = '0'+date1.toLocaleDateString();

      //if the month is a double digit
      //since months are 0-11, month 9 after the toTimeString would be 10 (October)
      if (date2.getMonth() >= 9)
        var end = date2.toLocaleDateString();
      //if the month is a single digit
      else
        var end = '0'+date2.toLocaleDateString();

      //if the day is a single digit, adds a 0 before the day
      if (date1.getDate() < 10)
        start = start.substr(0,3) + '0' + start.substr(3,6);
      //if the day is a single digit, adds a 0 before the day
      if (date2.getDate() < 10)
        end = end.substr(0,3) + '0' + end.substr(3,6);

      //sets the text imput to the new dates
      $('#datepicker1').val(start);
      $('#datepicker2').val(end);
      //gets the shifts for the new range
      EmployeeApp.ShiftManagerTab.ShiftManagerController.getShiftsInRange(start, end); 
    },

    //gets the shifts for the current pay period
    currPayPeriod : function() {
      //sets the datePickers to the default start and end dates
      $('#datepicker1').val(this.model.get('start'));
      $('#datepicker2').val(this.model.get('end'));

      var start = $('#datepicker1').val();
      var end = $('#datepicker2').val();
      //gets the shifts for the current pay range
      EmployeeApp.ShiftManagerTab.ShiftManagerController.getShiftsInRange(start, end); 
    },

    //will run when the clicks the next arrow
    nextPayPeriod : function() {
      var date1 = new Date($('#datepicker1').val());
      var date2 = new Date($('#datepicker2').val());

      //adds two weeks
      date1.setDate(date1.getDate()+14);
      date2.setDate(date2.getDate()+14);

      //if the month is a double digit
      //since months are 0-11, month 9 after the toTimeString would be 10 (October)
      if (date1.getMonth() >= 9)
        var start = date1.toLocaleDateString();
      //if the month is a double digit
      else
        var start = '0'+date1.toLocaleDateString();

      //if the month is a double digit
      //since months are 0-11, month 9 after the toTimeString would be 10 (October)
      if (date2.getMonth() >= 9)
        var end = date2.toLocaleDateString();
      //if the month is a double digit
      else
        var end = '0'+date2.toLocaleDateString();

      //if the day is a double digit
      if (date1.getDate() < 10)
        start = start.substr(0,3) + '0' + start.substr(3,6);
      //if the day is a double digit
      if (date2.getDate() < 10)
        end = end.substr(0,3) + '0' + end.substr(3,6);

      //sets the text imput to the new dates
      $('#datepicker1').val(start);
      $('#datepicker2').val(end); 
      //gets the shifts for the current pay range
      EmployeeApp.ShiftManagerTab.ShiftManagerController.getShiftsInRange(start, end);
    }

  });
});