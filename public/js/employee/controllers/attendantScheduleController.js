//Define the module for the AttendantScheduleTab logic to live in.
EmployeeApp.module('AttendantScheduleTab', function (AttendantScheduleTab, App, Backbone, Marionette, $, _) {
  
  //Define a employeeFilter array that will be used to filter the kendo scheduler
  AttendantScheduleTab.employeeFilter = [];

  //Define a controller to hold all of the functions for this module.
  AttendantScheduleTab.AttendantScheduleController = {

    //function to get the Attendent schedule info.
    getAttendantScheduleInfo : function(callback, editable) {
      //The following view is namespaced to adminScheduleTab even though it is used for attendets too.
      //Assign the passed in editable parameter to a property of the controller that can be accessed by
      //the showAdminSchedule function to show the schedule as editable or not.
      EmployeeApp.AdminScheduleTab.AdminScheduleController.scheduleIsEditable = editable;

      //Create a new schedule view and show it
      AttendantScheduleTab.scheduleView = new App.AdminScheduleTab.ScheduleView();
      EmployeeApp.tabDiv.tabContent.show(AttendantScheduleTab.scheduleView);

      //If the admin list does not exist
      if (typeof(AttendantScheduleTab.attendantList === 'undefined')) {
        //create new attendant list
        AttendantScheduleTab.attendantList = new AttendantScheduleTab.AttendantCollection();
        //fetch the attendant list from the server, on success call the callback function
        AttendantScheduleTab.attendantList.fetch({success:callback});
      } else { //already have the attendant list, simply call the callback
        callback();
      }
    },

    //function to show the employee names, and setup the filter to work.
    showAttendantScheduleInfo : function() {
      //reset the employee filter to an empty array.
      AttendantScheduleTab.employeeFilter = [];

      //for each programmer in the programmer list, add thier id to the employee filter
      AttendantScheduleTab.attendantList.each(function(model) {
        AttendantScheduleTab.employeeFilter.push(model.get('id'));
      });
    
      //create a new employee select section view. This is the view that allows the users to be removed and added from the schedule view.
      AttendantScheduleTab.employeeSelectSection = new App.AttendantScheduleTab.EmployeeSelectSectionCollectionView({collection:AttendantScheduleTab.attendantList});
      //show the employee select section view
      AttendantScheduleTab.scheduleView.employeeSelectSection.show(AttendantScheduleTab.employeeSelectSection);

      //run an ajax request to get the end of the next semester. This will be used to set the default new shift
      //end date for any new shifts that are scheduled. On success call the showAttendantSchedule function and pass it the data.
      $.ajax({
        url:'/caeweb/employee/api/endofnextsemester',
        success:AttendantScheduleTab.AttendantScheduleController.showAttendantSchedule
      });
    },

    //function to actually show the kendo scheduler.
    showAttendantSchedule : function(data) {
      //Define a today date
      var TODAY = new Date();
      //redefine the template to be used for the shifts.
      var eventTemplate = '# var startT = new Date(start); startT.setHours(startT.getHours()+1); var endT = new Date(end); endT.setHours(endT.getHours()+1); # <div class="employee-template">#: kendo.toString(startT, "hh:mm") # <br /> #: data.resources[0].text # <br /> #: kendo.toString(endT, "hh:mm") #</div>';
      //Get the end date for the next semester
      var dataDateObject = JSON.parse(data);
      //Replace the - with / so that JS parses the date without doing timezone conversion
      dataDateObject = dataDateObject.replace("-","/");
      //Create new date
      var endDate = new Date(dataDateObject);
      //Set the semsterEndDate to the above created date. Scheduler has been setup to pull this date.
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
          //event template will be the one defined a few lines up in this same function.
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
                  url: "../employee/api/attendantschedule",
                  dataType: "json"
                },
                update: {
                  url:"../employee/api/attendantschedule/update",
                  type:'PUT',
                  dataType: "json"
                },
                create: {
                  url:"../employee/api/attendantschedule/new",
                  type: 'POST',
                  dataType: "json"
                },
                destroy: {
                  url:"../employee/api/attendantschedule/destroy",
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
                            url: "../employee/api/attendantscheduleinfo",
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
                                  color: { type: "string", from: "schedule_color" }
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
          dataBound: AttendantScheduleTab.AttendantScheduleController.getEmployeeHours
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
      AttendantScheduleTab.attendantList.each(function(model) {
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

      //Define vars for doing time calculation. TODO: Put this in a function of it's own.
      var temp, hours, minutes, timeString;

      //Do some millisecond math to get the hours and minutes of the total hours.
      temp = Math.floor(totalHours / 1000);
      hours = Math.floor(temp / 3600);
      minutes = Math.floor((temp %= 3600) / 60);

      //convert the hours and minutes to a timestring correctly formatted.
      timeString = (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2);

      //For each property in the hoursObject, which essentially means for each employee in the hoursObject
      for (var prop in hourObject) {

        //Do the same time string creation that is done for the totalhours, but instead for each employee
        temp = Math.floor(hourObject[prop] / 1000);
        hours = Math.floor(temp / 3600);
        minutes = Math.floor((temp %= 3600) / 60);

        timeString = (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2);

        //Set the hours property for each employee in the hoursObject to the time string. If an employee
        //is not in the hoursObject, their time will be 0 since it was initialzed to that before the calculatin was done.
        AttendantScheduleTab.programmerList.get(prop).set({'hours' : timeString});
      }
    }

  };
});