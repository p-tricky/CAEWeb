EmployeeApp.module('ScheduleTab', function (ScheduleTab, App, Backbone, Marionette, $, _) {
  
  ScheduleTab.AdminScheduleController = {
    showEditableAdminSchedule : function() {
      var TODAY = new Date();
      $("#tabsContent").kendoScheduler({
          date: new Date(),
          startTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 8, 0, 0),
          endTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 24, 0, 0),
          height: 970,
          allDaySlot: false,
          minorTickCount: 4,

          views: [
            {
              type: "day",
              group: {
                resources: ["employee"],
                orientation: "horizontal"
              }
            },
            {
              type: "week"
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
                          employee: { from: "Employee", defaultValue: 1 },
                          recurrenceId: { from: "RecurrenceId" },
                          recurrenceRule: { from: "RecurrenceRule" },
                          recurrenceException: { from: "RecurrenceException" },
                      }
                  }
              }
          },
          //group: {
          //    resources: [ "employee" ]
          //},
          resources: [
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
                                  text: { type: "string", from: "username" },
                                  color: { type: "string", from: "schedule_color" }
                              }
                          }
                      }
                  },
                  title: "Employee"
              }
          ]
      });
    },
    showViewonlyAdminSchedule : function() {
        console.log('showing viewonly schedule');
    }

  };
});