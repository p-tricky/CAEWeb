//Define the module for the ProgrammerScheduleTab logic to live in.
EmployeeApp.module('ProgrammerScheduleTab', function (ProgrammerScheduleTab, App, Backbone, Marionette, $, _) {
  
  //Define a employeeFilter array that will be used to filter the kendo scheduler
  ProgrammerScheduleTab.employeeFilter = [];

  //Define a controller to hold all of the functions for this module.
  ProgrammerScheduleTab.ProgrammerScheduleController = {

    //function to get the programmer schedule info
    getProgrammerScheduleInfo : function(callback, editable) {
      //The following view is namespaced to adminScheduleTab even though it is used for attendets too.
      //Assign the passed in editable parameter to a property of the controller that can be accessed by
      //the showProgrammerSchedule function to show the schedule as editable or not.
      EmployeeApp.AdminScheduleTab.AdminScheduleController.scheduleIsEditable = editable;

      //Create a new schedule view and show it.
      ProgrammerScheduleTab.scheduleView = new App.AdminScheduleTab.ScheduleView();
      EmployeeApp.tabDiv.tabContent.show(ProgrammerScheduleTab.scheduleView);

      //If the programmer list does not exist
      if (typeof(ProgrammerScheduleTab.programmerList === 'undefined')) {
        //create a new programmer list
        ProgrammerScheduleTab.programmerList = new ProgrammerScheduleTab.ProgrammerCollection();
        //fetch the programmers list from the server, on success call the callback function
        ProgrammerScheduleTab.programmerList.fetch({success:callback});
      } else { //already have the programmer list, simply call the callback
        callback();
      }
    },

    //function to show the employee names, and setup the filter to work.
    showProgrammerScheduleInfo : function() {
      //reset the employee filter to an empty array.
      ProgrammerScheduleTab.employeeFilter = [];

      //for each programmer in the programmer list, add thier id to the employee filter
      ProgrammerScheduleTab.programmerList.each(function(model) {
        ProgrammerScheduleTab.employeeFilter.push(model.get('id'));
      });
    
      //create a new employee select section view. This is the view that allows the users to be removed and added from the schedule view.
      ProgrammerScheduleTab.employeeSelectSection = new App.ProgrammerScheduleTab.EmployeeSelectSectionCollectionView({collection:ProgrammerScheduleTab.programmerList});
      //show the employee select section view
      ProgrammerScheduleTab.scheduleView.employeeSelectSection.show(ProgrammerScheduleTab.employeeSelectSection);

      //run an ajax request to get the end of the next semester. This will be used to set the default new shift
      //end date for any new shifts that are scheduled. On success call the showProgrammerSchedule function and pass it the data.
      $.ajax({
        url:'/caeweb/employee/api/endofnextsemester',
        success:ProgrammerScheduleTab.ProgrammerScheduleController._showProgrammerSchedule
      });
    },

    //function to actually show the kendo scheduler.
    _showProgrammerSchedule : function(data) {
      //Define a today date
      var TODAY = new Date();
      //redefine the template to be used for the shifts
      var eventTemplate = '';
       // '# var startT = new Date(start); startT.setHours(startT.getHours()+1); var endT = new Date(end); endT.setHours(endT.getHours()+1); # <div class="employee-template">#: kendo.toString(startT, "hh:mm") # <br /> #: data.resources[0].text # <br /> #: kendo.toString(endT, "hh:mm") #</div>';
      //Get the end date for the next semester
      var dataDateObject = JSON.parse(data);
      //Replace the - with / so that JS parses the date without doing timezone conversion
      dataDateObject = dataDateObject.replace("-","/");
      //Create new date
      var endDate = new Date(dataDateObject);
      //Set the semsterEndDate to the above created date. Kendo Scheduler has been altered to pull this date. If an error, it will default to today.
      EmployeeApp.EmployeeTab.semesterEndDate = endDate || new Date();

      //Select the section to add the scheduler to, and call the scheduler function passing it all sorts of parameters.
      $("#scheduleSection").kendoScheduler({
          //Standard self explanitory properties
          date: new Date(),
          startTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 7, 0, 0),
          endTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() , 23, 30, 0),
          height: 1170,
          allDaySlot: false,
          minorTickCount: 4,
          //event template will be the one defined a few lines up in this function.
          eventTemplate: eventTemplate,
          //set the editable property to the permission level assigned by the getProgrammerScheduleInfo function above.
          editable: EmployeeApp.AdminScheduleTab.AdminScheduleController.scheduleIsEditable,

          //list the views and how to sort them.
          views: [
            {
              type: "day",
              group: {
                resources: ["employee"],
                orientation: "horizontal"
              }
            },
            {
              type: "week",
              group: {
                resources: ["date","employee"],
                orientation: "horizontal"
              },
              selected: true
            }
          ],
          timezone: "Etc/UTC",
          //This defines the datasource for the actual scheduled shifts. The url property uses
          //laravel routes to do the persistance.
          dataSource: {
            batch: true,
              transport: {
                read: {
                  url: "../employee/api/programmerschedule",
                  dataType: "json"
                },
                update: {
                  url:"../employee/api/programmerschedule/update",
                  type:'PUT',
                  dataType: "json"
                },
                create: {
                  url:"../employee/api/programmerschedule/new",
                  type: 'POST',
                  dataType: "json"
                },
                destroy: {
                  url:"../employee/api/programmerschedule/destroy",
                  type:'DELETE',
                  dataType: "json"
                },
                //I can't remember why I needed to add this, but it was needed.
                parameterMap: function(data, type) {
                  return kendo.stringify(data);
                }
              },
              //This defines the model that will come back from the server, and the definition for newly created events.
              schema: {
                  model: {
                      id: "Id",
                      fields: {
                          Id: { from: "id", type: "number" },
                          title: { from: "Title", defaultValue: "" },
                          start: { type: "date", from: "Start" },
                          end: { type: "date", from: "End" },
                          employee: { from: "Employee", defaultValue: 2 },
                          availability: { from: "Availability", defaultValue: 0 },
                          recurrenceId: { from: "RecurrenceId" },
                          recurrenceRule: { from: "RecurrenceRule" },
                          recurrenceException: { from: "RecurrenceException" },
                      }
                  }
              },
              //defines the filter to be used.
              filter: {
                logic: "or",
                filters: []
            }
          },
          //Defines additional resources to be used with the scheduler
          resources: [
              {
                  //Defines the availablity resource. Possible values are unavailable, or none,
                  //none comes default and does need to be specified. None will act as available in this case.
                  field: "availability",
                  dataSource: [
                      { text: "Unavailable", value: 1, color: "#AAAAAA"}
                  ],
                  title: "Availability"
              },
              {
                  //The other resource is the employee that the shift pertains to.
                  field: "employee",
                  dataSource: { //datasource for the people can be reached by the url request below.
                      batch: true,
                      transport: {
                          read: {
                            url: "../employee/api/programmerscheduleinfo",
                            dataType: "json"
                          }
                      },
                      //schema defined for the users that the resource pulls
                      schema: {
                          model: {
                              id: "id",
                              color: "color",
                              fields: {
                                  value: { from: "id", type: "number" },
                                  text: { type: "string", from: "fullname" },
                                  color: { type: "string", from: "schedule_color" } //set schedule color to the parameter stored in the db
                              }
                          }
                      },
                      //Setup the filter for the employees.
                      filter: {
                        logic: "or",
                        filters: []
                      }
                  },
                  title: "Employee"
              }
          ],
          //once the scheduler is databound, call the getEmployeeHours function to get and display each employees hours.
          // then call emboldenLinesBetweenDays to embolden the lines in the calendar that indicate the start of a new day
          dataBound: function() {
            ProgrammerScheduleTab.ProgrammerScheduleController.getEmployeeHours();
            ProgrammerScheduleTab.ProgrammerScheduleController.emboldenLinesBetweenDays();
          }
      });
    },

    //function to get the employee hours for the week and display them. This function also calculates
    //the totalhours for all employees, but currently does not display it anywhere. Can be added later.
    getEmployeeHours : function() {
      //use jquery to get the scheduler
      var scheduler = $("#scheduleSection").data("kendoScheduler");

      //get the data, start and end dates.
      var currentData = scheduler._data;
      var currentStart = scheduler._selectedView._startDate;
      var currentEnd = scheduler._selectedView._endDate;

      //define var for total hours and initialze to 0
      var totalHours = 0;

      //create an hours object to store the people and thier associated hours.
      var hourObject = {};

      //For each programmer in the programmmer list set thier hours to 0.
      //The loop below this will total up the hours for each employee that is scheduled, however if an
      //employee does not have any hours for the week we need to reset their total to 0.
      ProgrammerScheduleTab.programmerList.each(function(model) {
        model.set({'hours' : '00:00' });
      });

      //for each entry in the current data of the scheduler (Note: this data is mostly only the data that is displayed on scren)
      _.each(currentData, function(entry) {
        //if the entry is within the views start and end time
        if ((entry.start.getTime() >= currentStart.getTime() && entry.end.getTime() <= (currentEnd.getTime() + 86400000)) && entry.availability != '1') {

          //if the employee already exists in the hours object
          if (hourObject.hasOwnProperty(entry.employee)) {
            //Increment the hours for that employee
            hourObject[entry.employee] = hourObject[entry.employee] + (entry.end - entry.start);
          } else { //set the hours to the entry.
            hourObject[entry.employee] = (entry.end - entry.start);
          }
          //Regardless, add the shift to the total schedule hours.
          totalHours = totalHours + (entry.end - entry.start);
        }
      });

      //convert the hours and minutes to a timestring correctly formatted.
      var timeString = ProgrammerScheduleTab.ProgrammerScheduleController._getTimeString(totalHours);

      //For each property in the hoursObject, which essentially means for each employee in the hoursObject
      for (var prop in hourObject) {

        //Do the same time string creation that is done for the totalhours, but instead for each employee
        timeString = ProgrammerScheduleTab.ProgrammerScheduleController._getTimeString(hourObject[prop]);

        //Set the hours property for each employee in the hoursObject to the time string. If an employee
        //is not in the hoursObject, their time will be 0 since it was initialzed to that before the calculatin was done.
        ProgrammerScheduleTab.programmerList.get(prop).set({'hours' : timeString});
      }
    },

    //returns a string with time in hours & minutes (converted from miliseconds)
    _getTimeString : function(timeInMS) {
        var temp,hours,minutes;
        //retrieve time in seconds
        totalSec = Math.floor(timeInMS / 1000);
        //convert minutes (less hours via modulus math)
        minutes = Math.floor((totalSec % 3600) / 60);
        //convert hours (minutes truncated by division math)
        
        hours = Math.floor(totalSec / 3600);
        //console.log('created time string, returned' + (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2))
        return (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2);
    },


    emboldenLinesBetweenDays: function() {

      var numProgrammers = ProgrammerScheduleTab.programmerList.size();

      var dateHeaders = $( 'th[colspan=' + numProgrammers + ']' );

      // if the schedule doesn't contain date headers, then we are looking at
      // the kendo schedule's day view, not the week view.  We only need the
      // bold lines for the week view.
      if (dateHeaders.length === 0) return;

      var usernameHeaders = $( ".usernameHeader" );
      var cells = $( ".k-middle-row, .k-not-middle-row" );

      dateHeaders.each(function(index) {
          $(this).addClass( "bold-left-border" );
      }); 

      usernameHeaders.each(function(index) {
        var self = $(this);
        if (index % numProgrammers === 0 && index !== 0) {
          self.parent().addClass( "bold-left-border" );
        }
      });

      cells.children().each(function(index) {
        var self = $(this);
        if (index % numProgrammers === 0 && index % (numProgrammers*7) !== 0) {
          self.addClass( "bold-left-border" );
        }
      });

    }
  };
});
