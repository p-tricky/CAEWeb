EmployeeApp.module('AttendantScheduleTab', function (AttendantScheduleTab, App, Backbone, Marionette, $, _) {
  
  AttendantScheduleTab.employeeFilter = [];
  AttendantScheduleTab.AttendantScheduleController = {
    getAttendantScheduleInfo : function(callback) {
      //The following view is namespaced to adminScheduleTab even though it is used for attendets too.
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
      AttendantScheduleTab.AttendantScheduleController.showEditableAttendantSchedule();
    },

    showEditableAttendantSchedule : function() {
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
          ]
      });
    },
    showViewonlyAttendantSchedule : function() {
        console.log('showing viewonly schedule');
    }

  };
});