EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  
  AdminScheduleTab.employeeFilter = [];
  AdminScheduleTab.AdminScheduleController = {
    getAdminScheduleInfo : function(callback) {
      AdminScheduleTab.scheduleView = new AdminScheduleTab.ScheduleView();
      EmployeeApp.tabDiv.tabContent.show(AdminScheduleTab.scheduleView);

      if (typeof(AdminScheduleTab.adminList === 'undefined')) {
        AdminScheduleTab.adminList = new AdminScheduleTab.AdminCollection();
        AdminScheduleTab.adminList.fetch({success:callback});
      } else {
        callback();
      }
    },

    showAdminScheduleInfo : function() {
      AdminScheduleTab.employeeFilter = [];
      AdminScheduleTab.adminList.each(function(model) {
        AdminScheduleTab.employeeFilter.push(model.get('id'));
      });
      AdminScheduleTab.employeeSelectSection = new AdminScheduleTab.EmployeeSelectSectionCollectionView({collection:AdminScheduleTab.adminList});
      AdminScheduleTab.scheduleView.employeeSelectSection.show(AdminScheduleTab.employeeSelectSection);
      AdminScheduleTab.AdminScheduleController.showEditableAdminSchedule();

    },

    showEditableAdminSchedule : function() {
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
                  url: "../employee/api/adminschedule",
                  dataType: "json"
                },
                update: {
                  url:"../employee/api/adminschedule/update",
                  type:'PUT',
                  dataType: "json"
                },
                create: {
                  url:"../employee/api/adminschedule/new",
                  type: 'POST',
                  dataType: "json"
                },
                destroy: {
                  url:"../employee/api/adminschedule/destroy",
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
                          employee: { from: "Employee", defaultValue: 2, validation: { required: true } },
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
                            url: "../employee/api/adminscheduleinfo",
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
          dataBound: AdminScheduleTab.AdminScheduleController.getEmployeeHours
      });
    },
    showViewonlyAdminSchedule : function() {
        console.log('showing viewonly schedule');
    },

    getEmployeeHours : function() {
      var scheduler = $("#scheduleSection").data("kendoScheduler");
      var currentData = scheduler._data;
      var currentStart = scheduler._selectedView._startDate;
      var currentEnd = scheduler._selectedView._endDate;
      var totalHours = 0;
      var hourObject = {};

      AdminScheduleTab.adminList.each(function(model) {
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

      //console.log(timeString);

      for (var prop in hourObject) {
        temp = Math.floor(hourObject[prop] / 1000);
        hours = Math.floor(temp / 3600);
        minutes = Math.floor((temp %= 3600) / 60);

        timeString = (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2);

        //console.log(prop + "->" + timeString);

        AdminScheduleTab.adminList.get(prop).set({'hours' : timeString});
      }
    }

  };
});