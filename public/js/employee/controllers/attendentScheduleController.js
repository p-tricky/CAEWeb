EmployeeApp.module('AttendentScheduleTab', function (AttendentScheduleTab, App, Backbone, Marionette, $, _) {
  
  AttendentScheduleTab.employeeFilter = [];
  AttendentScheduleTab.AttendentScheduleController = {
    getAttendentScheduleInfo : function(callback) {
      //The following view is namespaced to adminScheduleTab even though it is used for attendets too.
      AttendentScheduleTab.scheduleView = new App.AdminScheduleTab.ScheduleView();
      EmployeeApp.tabDiv.tabContent.show(AttendentScheduleTab.scheduleView);

      if (typeof(AttendentScheduleTab.attendentList === 'undefined')) {
        AttendentScheduleTab.attendentList = new AttendentScheduleTab.AttendentCollection();
        AttendentScheduleTab.attendentList.fetch({success:callback});
      } else {
        callback();
      }
    },

    showAttendentScheduleInfo : function() {
      AttendentScheduleTab.attendentList.each(function(model) {
        AttendentScheduleTab.employeeFilter.push(model.get('id'));
      });
      console.log(AttendentScheduleTab.employeeFilter);
      //The following view is namespaced to adminScheduleView even though it is used for attendents too.
      AttendentScheduleTab.employeeSelectSection = new App.AdminScheduleTab.EmployeeSelectSectionCollectionView({collection:AttendentScheduleTab.attendentList});
      AttendentScheduleTab.scheduleView.employeeSelectSection.show(AttendentScheduleTab.employeeSelectSection);
      AttendentScheduleTab.AttendentScheduleController.showEditableAttendentSchedule();
    },

    showEditableAttendentSchedule : function() {
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
                  url: "../employee/api/attendentschedule",
                  dataType: "json"
                },
                update: {
                  url:"../employee/api/attendentschedule/update",
                  type:'PUT',
                  dataType: "json"
                },
                create: {
                  url:"../employee/api/attendentschedule/new",
                  type: 'POST',
                  dataType: "json"
                },
                destroy: {
                  url:"../employee/api/attendentschedule/destroy",
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
                            url: "../employee/api/attendentscheduleinfo",
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
          ]
      });
    },
    showViewonlyAttendentSchedule : function() {
        console.log('showing viewonly schedule');
    }

  };
});