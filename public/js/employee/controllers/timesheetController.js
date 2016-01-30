//Define the module TimesheetTab for all of the functionality of the Timesheet tab to live in. 
EmployeeApp.module('TimesheetTab', function (TimesheetTab, App, Backbone, Marionette, $, _) {
  
  //Define a controller to hold all of the functions for this module. 
  TimesheetTab.TimesheetController = { 

  	/**
  	* Methods pertaining to the timesheet functionality & view 
  	*/

    /**
    * Public Functions
    */
    
    //gets the data for the timesheet
    //entry point from employeeController when a user clicks the timesheet tab
    getTimesheetInfo : function() {
      if (typeof TimesheetTab.shiftList === 'undefined') {
        TimesheetTab.shiftList = new EmployeeApp.TimesheetTab.TimesheetCollection();
      }
      //fetched a new list of shifts, defaults to the current pay period
      //this is used to ensure that it correctly gets the shiftList before calling the next function
      TimesheetTab.shiftList.fetch({data: {}, success: function() {TimesheetTab.TimesheetController._getPayPeriod(EmployeeApp.TimesheetTab.TimesheetController._showTimesheet)}});
    },

    //retrieves shifts in specified range
    getShiftsInRange : function(rangeStart, rangeEnd) {
      //this is used to ensure that it correctly gets the shiftList before calling the next function
      TimesheetTab.shiftList.fetch({data: {start: rangeStart , end: rangeEnd}, success: function() {TimesheetTab.TimesheetController._generateTimesheet(rangeStart, rangeEnd)}});     
    },

    /**
    * Private Functions
    */

    //returns a string with military time in hours (converted from miliseconds)
    _getTimeString : function(timeInMS) {
        var temp,hours;
        //retrieve time in seconds
        totalSec = Math.floor(timeInMS / 1000);
        hours = totalSec / 3600;
        return (hours < 10 ? '0' : '') + hours.toFixed(2);
    },

    //obtains current pay period from server via ajax request
    _getPayPeriod : function(callback) {
        $.ajax({
            url: 'api/payperiod'
        }).done(callback);
    },

    //returns the Monday of the current week
    //accepts a date as the parameter
    _getMonday : function(d) {
      d = new Date(d);
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1);
      return new Date(d.setDate(diff));
    },

    //returns the Sunday of the current week
    //accepts a date as the parameter
    _getSunday : function(d) {
      d = new Date(d);
      var day = d.getDay(),
        //I added one day so that it would be monday at midnight, instead of sunday
        diff = d.getDate() + (day == 0 ? 1:(8-day));
      return new Date(d.setDate(diff));
    },

    //makes the model and view then shows it
    _showTimesheet : function(payPeriodData) {
      var theModel = new Backbone.Model(JSON.parse(payPeriodData));
      var timesheetView = new TimesheetTab.TimesheetView({model: theModel, 'contentName': 'Timesheet/timesheet'});

      EmployeeApp.tabDiv.tabContent.show(timesheetView);
      $('#datepicker1').datepicker();
      $('#datepicker2').datepicker();

      var start = $('#datepicker1').val();
      var end = $('#datepicker2').val();
      TimesheetTab.TimesheetController._generateTimesheet(start, end); 
    },

    //takes two dates as the start and end dates
    //generates the timesheet as a pdf and then loads it into the iframe
    _generateTimesheet : function(rangeStart, rangeEnd) {
      //private vars used in the method
      var userId = 0, userMS = 0, weekMS = 0, totalMS = 0;
      var timeInHM;
      var weekStart;
      var weekEnd;
      var day = new Date();
      var dd = day.getDate();
      var mm = day.getMonth()+1;
      var yyyy = day.getFullYear();
      var today = ""+mm+"/"+dd+"/"+yyyy;
      var doc = new jsPDF();
      var y = 20;
      var splitText;

      //prints the header for the pdf
      doc.setFontSize(8);
      doc.rightText(y, "Printed on " + today);
      y+=3;
      doc.text(20, y, "CAE Center");
      doc.rightText(y, "For All Employees");
      y+=10;
      doc.setFontSize(24);
      doc.centerText(y, "Summary of Hours Paid");
      y+=7;
      doc.setFontSize(16);
      doc.centerText(y, rangeStart + " - " + rangeEnd);
      y+=10;

      TimesheetTab.shiftList.each(function(shift){
        //if this is the first user
        if (userId === 0)
        {
          //gets the new user's information and prints that
          _userStart(shift);
        }
        //if the current shift is a new user
        else if (shift.get('eid') !== userId)
        {
          //calls the userEnd function which will print the end of the week and end of user lines
          _userEnd();

          //calls the userStart function which will get the new user information and print that
          _userStart(shift);
        }

        //check end of a page
        if (y >= 275) {
          y = 20;
          doc.addPage();
        }

        //doesn't print shifts that don't have a clockout time (e.g. still clocked in) 
        if (shift.get('clockOut') !== '0000-00-00 00:00:00'){
          //date objects of the clockin and clockout
          var clockInString = shift.get('clockIn');
          var clockOutString = shift.get('clockOut');
          var clockin = new Date(clockInString.substr(0, 4), clockInString.substr(5, 2) - 1, clockInString.substr(8, 2), clockInString.substr(11, 2), clockInString.substr(14, 2), clockInString.substr(17, 2));
          var clockout = new Date(clockOutString.substr(0, 4), clockOutString.substr(5, 2) - 1, clockOutString.substr(8, 2), clockOutString.substr(11, 2), clockOutString.substr(14, 2), clockOutString.substr(17, 2));

          //checks to see if the shift is in the next week
          if (clockin > weekEnd)
          {
            //prints the end of a week 
            _weekEnd();
            //sets start of a week and prints the new line
            _weekStart(shift);
          }

          //calculates the totals for the shift and adds them to the user, week, and overall totals
          var msdiff = clockout.getTime() - clockin.getTime();
          totalMS += msdiff;
          userMS += msdiff;
          weekMS +=msdiff;
          timeInHM = TimesheetTab.TimesheetController._getTimeString(msdiff);

          //print shift out to the pdf
          doc.centerTimeIn(y, clockin.toDateString());
          doc.centerTimeOut(y, clockout.toDateString());
          y+=3;
          doc.text(175, y, timeInHM);
          y+=2;
          doc.centerTimeIn(y, clockin.toLocaleTimeString());
          doc.centerTimeOut(y, clockout.toLocaleTimeString());
          y+=7;

        }
      });//end each statement

      //prints the end of week and end of user lines
      _userEnd();

      //print final totals
      timeInHM = TimesheetTab.TimesheetController._getTimeString(totalMS);
      doc.setLineWidth(1);
      doc.line(20, y, 190, y);
      y+=6;
      doc.setFontSize(16);
      doc.text(20, y, "Grand Totals from " + rangeStart + " through " + rangeEnd + " : " + timeInHM + " hours");
      var data = doc.output("dataurlstring");
      $('#rightTimesheet').attr('src', data);


      //these are the functions that are called throughout the generateTimesheet function
      //Since these are declared inside of the function, that have access to all the variables in the function and can only be called inside the generateTimesheet function

      //sets the weekStart and weekEnd variables for the new week then prints the week header
      function _weekStart(shift){
        //I had to use the substrings in order to get firefox to recognize the date. Chrome is much more lenient on the format and would recognize shift.get('clockIn') as a date
        weekStart = TimesheetTab.TimesheetController._getMonday(new Date(shift.get('clockIn').substr(0,4), shift.get('clockIn').substr(5,2) - 1, shift.get('clockIn').substr(8,2)));
        weekEnd = TimesheetTab.TimesheetController._getSunday(new Date(shift.get('clockIn').substr(0,4), shift.get('clockIn').substr(5,2) - 1, shift.get('clockIn').substr(8,2)));
        //prints the new week header
        splitText = doc.splitTextToSize("Week totals for " + weekStart.toDateString() + " - " + new Date(weekEnd - 1).toDateString(), 60);
        doc.text(20, y, splitText);
        y+=3;
        doc.text(90, y, "Time In");
        doc.text(135, y, "Time Out");
        doc.text(170, y, "Time Paid");
        y+=4;
        doc.setLineWidth(0.5);
        doc.line(20, y, 73, y);
        doc.line(75, y, 120, y);
        doc.line(122, y, 167, y);
        doc.line(169, y, 190, y);
        y+=5;

        //check for end of page
        if (y >= 275) {
          y = 20;
          doc.addPage();
        }
      };//end _weekStart 

      //prints end of week footer
      function _weekEnd() {
        //end of week
        doc.setLineWidth(0.25);
        doc.line(169, y, 190, y);
        y+=4;
        timeInHM = TimesheetTab.TimesheetController._getTimeString(weekMS);
        doc.text(175, y, timeInHM);
        y+=1;
        doc.line(169, y, 190, y);
        y+=7;
        weekMS=0;

        //check for end of page
        if (y >= 275) {
          y = 20;
          doc.addPage();
        }
      };//end _weekEnd

      //will set the new user's information and print the user header
      function _userStart(shift) {
        //gets the users info
        userId = shift.get('eid');
        //print the header for the first user
        doc.setLineWidth(0.25);
        doc.rect(20, y, 170, 10);
        y+=7;
        doc.setFontSize(18);
        if (shift.get('name') == null) var name = ' '; else var name = shift.get('name');
        doc.centerText(y, name);
        y+=10;
        doc.setFontSize(12);

        //check for end of page
        if (y >= 275) {
          y = 20;
          doc.addPage();
        }

        //after the new user header, prints the start of week header
        _weekStart(shift);

      };//end userStart

      //prints the end of week footer then the end of user footer
      function _userEnd() {
        //prints the end of week footer
        _weekEnd();

        //end of user
        doc.text(170, y, "User Total");
        y+=2;
        doc.setLineWidth(.5);
        doc.line(169, y, 190, y);
        y+=4;
        timeInHM = TimesheetTab.TimesheetController._getTimeString(userMS);
        doc.text(175, y, timeInHM);
        y+=2;
        doc.line(169, y, 190, y);
        y+=10;
        userMS=0;

        //check for end of page
        if (y >= 275) {
          y = 20;
          doc.addPage();
        }

      };
    },//end generateTimesheet

  };
});
