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
    	'click #applyFilter': 'applyFilter',
      'click #prevPayPeriod': 'prevPayPeriod',
      'click #currPayPeriod': 'currPayPeriod',
      'click #nextPayPeriod': 'nextPayPeriod',
    },
    
    //When the user clicks the apply filter button
    applyFilter : function() {
      var date1 = new Date($('#datepicker1').val());
      var date2 = new Date($('#datepicker2').val());

      if (date1 > date2)
      {
        temp = $('#datepicker1').val();
        $('#datepicker1').val($('#datepicker2').val());
        $('#datepicker2').val(temp);
      }

      var start = $('#datepicker1').val();
      var end = $('#datepicker2').val();
      //has to run twice inorder to correctly get the new shiftlist
      //TimesheetTab.TimesheetController.getShiftsInRange(start, end);
      TimesheetTab.TimesheetController.getShiftsInRange(start, end);
    },

    //will run when the user clicks the previous arrow
    prevPayPeriod : function() {
      var date1 = new Date($('#datepicker1').val());
      var date2 = new Date($('#datepicker2').val());

      //subtracts two weeks
      date1.setDate(date1.getDate()-14);
      date2.setDate(date2.getDate()-14);

      //if the month is a double digit
      if (date1.getMonth() >= 9)
        var date1Str = date1.toLocaleDateString();
      //if the month is a single digit
      else
        var date1Str = '0'+date1.toLocaleDateString();

      //if the month is a double digit
      if (date2.getMonth() >= 9)
        var date2Str = date2.toLocaleDateString();
      //if the month is a single digit
      else
        var date2Str = '0'+date2.toLocaleDateString();

      //if the day is a single digit
      if (date1.getDate() < 10)
        date1Str = date1Str.substr(0,3) + '0' + date1Str.substr(3,6);
      //if the day is a single digit
      if (date2.getDate() < 10)
        date2Str = date2Str.substr(0,3) + '0' + date2Str.substr(3,6);

      //sets the text imput to the new dates
      $('#datepicker1').val(date1Str);
      $('#datepicker2').val(date2Str);  
      //runs the timesheet twice because it wont get the shift list if ran once
      //TimesheetTab.TimesheetController.getShiftsInRange(date1Str, date2Str);
      TimesheetTab.TimesheetController.getShiftsInRange(date1Str, date2Str);
    },

    currPayPeriod : function() {
      $('#datepicker1').val(this.model.get('start'));
      $('#datepicker2').val(this.model.get('end'));

      var start = $('#datepicker1').val();
      var end = $('#datepicker2').val();
      //TimesheetTab.TimesheetController.getShiftsInRange(start, end);
      TimesheetTab.TimesheetController.getShiftsInRange(start, end);
    },

    //will run when the clicks the next arrow
    nextPayPeriod : function() {
      var date1 = new Date($('#datepicker1').val());
      var date2 = new Date($('#datepicker2').val());

      //adds two weeks
      date1.setDate(date1.getDate()+14);
      date2.setDate(date2.getDate()+14);

      //if the month is a double digit
      if (date1.getMonth() >= 9)
        var date1Str = date1.toLocaleDateString();
      //if the month is a double digit
      else
        var date1Str = '0'+date1.toLocaleDateString();

      //if the month is a double digit
      if (date2.getMonth() >= 9)
        var date2Str = date2.toLocaleDateString();
      //if the month is a double digit
      else
        var date2Str = '0'+date2.toLocaleDateString();

      //if the day is a double digit
      if (date1.getDate() < 10)
        date1Str = date1Str.substr(0,3) + '0' + date1Str.substr(3,6);
      //if the day is a double digit
      if (date2.getDate() < 10)
        date2Str = date2Str.substr(0,3) + '0' + date2Str.substr(3,6);

      //sets the text imput to the new dates
      $('#datepicker1').val(date1Str);
      $('#datepicker2').val(date2Str);
      //runs the timesheet twice because it wont get the shift list if ran once  
      //TimesheetTab.TimesheetController.getShiftsInRange(date1Str, date2Str);
      TimesheetTab.TimesheetController.getShiftsInRange(date1Str, date2Str);
    }
  });
});