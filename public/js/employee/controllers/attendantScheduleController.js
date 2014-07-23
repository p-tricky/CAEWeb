EmployeeApp.module('AttendantScheduleTab', function (AttendantScheduleTab, App, Backbone, Marionette, $, _) {
  
  AttendantScheduleTab.employeeFilter = [];
  AttendantScheduleTab.AttendantScheduleController = {
    getAttendantScheduleInfo : function(callback, editable) {
      //The following view is namespaced to adminScheduleTab even though it is used for attendets too.
      EmployeeApp.AdminScheduleTab.AdminScheduleController.scheduleIsEditable = editable;

      AttendantScheduleTab.scheduleView = new App.AdminScheduleTab.ScheduleView();
      EmployeeApp.tabDiv.tabContent.show(AttendantScheduleTab.scheduleView);

      if (typeof(AttendantScheduleTab.AttendantList === 'undefined')) {
        AttendantScheduleTab.AttendantList = new AttendantScheduleTab.AttendantCollection();
        AttendantScheduleTab.AttendantList.fetch({success:callback});
      } else {
        callback();
      }
    },

    showAttendantScheduleInfo : function() {
      AttendantScheduleTab.employeeFilter = [];
      AttendantScheduleTab.AttendantList.each(function(model) {
        AttendantScheduleTab.employeeFilter.push(model.get('id'));
      });
    
      AttendantScheduleTab.employeeSelectSection = new App.AttendantScheduleTab.EmployeeSelectSectionCollectionView({collection:AttendantScheduleTab.AttendantList});
      AttendantScheduleTab.scheduleView.employeeSelectSection.show(AttendantScheduleTab.employeeSelectSection);
      $.ajax({
        url:'/caeweb/employee/api/endofnextsemester',
        success:AttendantScheduleTab.AttendantScheduleController.showAttendantSchedule
      });
    },

    showAttendantSchedule : function(data) {
      var TODAY = new Date();
      var eventTemplate = '# var startT = new Date(start); startT.setHours(startT.getHours()+1); var endT = new Date(end); endT.setHours(endT.getHours()+1); # <div class="employee-template">#: kendo.toString(startT, "hh:mm") # <br /> #: data.resources[0].text # <br /> #: kendo.toString(endT, "hh:mm") #</div>';
      //Get the end date for the next semester
      var dataDateObject = JSON.parse(data);
      //Replace the - with / so that JS parses the date without doing timezone conversion
      dataDateObject = dataDateObject.replace("-","/");
      //Create new date
      var endDate = new Date(dataDateObject);
      //Set the semsterEndDate to the above created date. Scheduler has been setup to pull this date.
      EmployeeApp.EmployeeTab.semesterEndDate = endDate || new Date();

      $("#scheduleSection").kendoScheduler({
          date: new Date(),
          startTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 7, 0, 0),
          endTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() , 23, 30, 0),
          height: 1170,
          allDaySlot: false,
          minorTickCount: 4,
          eventTemplate: eventTemplate,
          editable: EmployeeApp.AdminScheduleTab.AdminScheduleController.scheduleIsEditable,

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
                parameterMap: function(data, type) {
                  return kendo.stringify(data);
                }
              },
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
              filter: {
                logic: "or",
                filters: []
            }
          },
          resources: [
              {
                  field: "availability",
                  dataSource: [
                      { text: "Unavailable", value: 1, color: "#AAAAAA"}
                  ],
                  title: "Availability"
              },
              {
                  field: "employee",
                  dataSource: {
                      batch: true,
                      transport: {
                          read: {
                            url: "../employee/api/attendantscheduleinfo",
                            dataType: "json"
                          }
                      },
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
                      filter: {
                        logic: "or",
                        filters: []
                      }
                  },
                  title: "Employee"
              }
          ],
          dataBound: AttendantScheduleTab.AttendantScheduleController.getEmployeeHours
      });
    },
    showViewonlyAttendantSchedule : function() {
        console.log('showing viewonly schedule');
    },

    getEmployeeHours : function() {
      var scheduler = $("#scheduleSection").data("kendoScheduler");
      var currentData = scheduler._data;
      var currentStart = scheduler._selectedView._startDate;
      var currentEnd = scheduler._selectedView._endDate;
      var totalHours = 0;
      var hourObject = {};

      AttendantScheduleTab.AttendantList.each(function(model) {
        model.set({'hours' : '00:00' });
      });

      _.each(currentData, function(entry) {
        if ((entry.start.getTime() >= currentStart.getTime() && entry.end.getTime() <= (currentEnd.getTime() + 86400000)) && entry.availability != '1') {
          if (hourObject.hasOwnProperty(entry.employee)) {
            hourObject[entry.employee] = hourObject[entry.employee] + (entry.end - entry.start);
          } else {
            hourObject[entry.employee] = (entry.end - entry.start);
          }
          totalHours = totalHours + (entry.end - entry.start);
        }
      });

      var temp, hours, minutes, timeString;

      temp = Math.floor(totalHours / 1000);
      hours = Math.floor(temp / 3600);
      minutes = Math.floor((temp %= 3600) / 60);

      timeString = (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2);

      for (var prop in hourObject) {
        temp = Math.floor(hourObject[prop] / 1000);
        hours = Math.floor(temp / 3600);
        minutes = Math.floor((temp %= 3600) / 60);

        timeString = (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2);

        AttendantScheduleTab.AttendantList.get(prop).set({'hours' : timeString});
      }
    }

  };
});