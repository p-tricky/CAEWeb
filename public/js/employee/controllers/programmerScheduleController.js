EmployeeApp.module('ProgrammerScheduleTab', function (ProgrammerScheduleTab, App, Backbone, Marionette, $, _) {
  
  ProgrammerScheduleTab.employeeFilter = [];
  ProgrammerScheduleTab.ProgrammerScheduleController = {
    getProgrammerScheduleInfo : function(callback) {
      //The following view is namespaced to adminScheduleTab even though it is used for attendets too.
      ProgrammerScheduleTab.scheduleView = new App.AdminScheduleTab.ScheduleView();
      EmployeeApp.tabDiv.tabContent.show(ProgrammerScheduleTab.scheduleView);

      if (typeof(ProgrammerScheduleTab.programmerList === 'undefined')) {
        ProgrammerScheduleTab.programmerList = new ProgrammerScheduleTab.ProgrammerCollection();
        ProgrammerScheduleTab.programmerList.fetch({success:callback});
      } else {
        callback();
      }
    },

    showProgrammerScheduleInfo : function() {
      ProgrammerScheduleTab.employeeFilter = [];
      ProgrammerScheduleTab.programmerList.each(function(model) {
        ProgrammerScheduleTab.employeeFilter.push(model.get('id'));
      });
    
      ProgrammerScheduleTab.employeeSelectSection = new App.ProgrammerScheduleTab.EmployeeSelectSectionCollectionView({collection:ProgrammerScheduleTab.programmerList});
      ProgrammerScheduleTab.scheduleView.employeeSelectSection.show(ProgrammerScheduleTab.employeeSelectSection);
      ProgrammerScheduleTab.ProgrammerScheduleController.showEditableProgrammerSchedule();
    },

    showEditableProgrammerSchedule : function() {
      var TODAY = new Date();
      var eventTemplate = '# var startT = new Date(start); startT.setHours(startT.getHours()+1); var endT = new Date(end); endT.setHours(endT.getHours()+1); # <div class="employee-template">#: kendo.toString(startT, "hh:mm") # <br /> #: data.resources[0].text # <br /> #: kendo.toString(endT, "hh:mm") #</div>';
      $("#scheduleSection").kendoScheduler({
          date: new Date(),
          startTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 7, 0, 0),
          endTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() , 23, 30, 0),
          height: 1170,
          allDaySlot: false,
          minorTickCount: 4,
          eventTemplate: eventTemplate,

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
                      //{ text: "Available", value: 2 }
                  ],
                  title: "Availability"
              },
              {
                  field: "employee",
                  dataSource: {
                      batch: true,
                      transport: {
                          read: {
                            url: "../employee/api/programmerscheduleinfo",
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
          dataBound: ProgrammerScheduleTab.ProgrammerScheduleController.getEmployeeHours
      });
    },
    showViewonlyProgrammerSchedule : function() {
        console.log('showing viewonly schedule');
    },

    getEmployeeHours : function() {
      var scheduler = $("#scheduleSection").data("kendoScheduler");
      var currentData = scheduler._data;
      var currentStart = scheduler._selectedView._startDate;
      var currentEnd = scheduler._selectedView._endDate;
      var totalHours = 0;
      var hourObject = {};

      ProgrammerScheduleTab.programmerList.each(function(model) {
        model.set({'hours' : '00:00' });
      });

      _.each(currentData, function(entry) {
        if (entry.start.getTime() >= currentStart.getTime() && entry.end.getTime() <= (currentEnd.getTime() + 86400000)) {
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

      //console.log(timeString);

      for (var prop in hourObject) {
        temp = Math.floor(hourObject[prop] / 1000);
        hours = Math.floor(temp / 3600);
        minutes = Math.floor((temp %= 3600) / 60);

        timeString = (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2);

        //console.log(prop + "->" + timeString);

        ProgrammerScheduleTab.programmerList.get(prop).set({'hours' : timeString});
      }
    }

  };
});