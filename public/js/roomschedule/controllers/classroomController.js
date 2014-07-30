//Define a Classroom Tab module for the kendo scheduler to line in.
RoomScheduleApp.module('RoomScheduleClassroomTab', function (RoomScheduleClassroomTab, App, Backbone, Marionette, $, _) {

  //Define a classroom controller for all the functions related to special rooms
  RoomScheduleClassroomTab.ClassroomController = {

    //Function to display the scheduler for the classrooms
    showRoomSchedule : function() {
      //Create a TODAY date
      var TODAY = new Date();
      //Use jQuery to select the div for the scheduler to live in, and call the scheduler method
      $("#tabsContent").kendoScheduler({
          date: new Date(),
          //Limit the start and end time to 8:00am and 10:00pm.
          startTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 8, 0, 0),
          endTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 22, 0, 0),
          //Define a height that fits the entire set of time slots in.
          height: 970,
          allDaySlot: false,

          //List the views that can be seen. Day is the only one we will use.
          views: [
              "day"
          ],
          timezone: "Etc/UTC",
          //Setup the datasource for the rooms. The URL property will be used to persist the data.
          //ajax requests to that url will be picked up by the laravel router, and then executed.
          dataSource: {
            batch: true,
              transport: {
                read: {
                  url: "../classroom",
                  dataType: "json"
                },
                update: {
                  url:"../classroom/update",
                  type:'PUT',
                  dataType: "json"
                },
                create: {
                  url:"../classroom/new",
                  type: 'POST',
                  dataType: "json"
                },
                destroy: {
                  url:"../classroom/destroy",
                  type:'DELETE',
                  dataType: "json"
                },
                //I can't remember why this parameter map is here, but it is needed.
                parameterMap: function(data, type) {
                  return kendo.stringify(data);
                }
              },
              //This section describes what the model for the data will look like.
              schema: {
                  model: {
                      id: "Id",
                      fields: {
                          Id: { from: "id", type: "number" },
                          title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                          start: { type: "date", from: "Start" },
                          end: { type: "date", from: "End" },
                          roomId: { from: "RoomId", nullable: true },
                          attendee: { from: "Attendee", defaultValue: 1 },
                          isAllDay: { type: "boolean" },
                          recurrenceId: { from: "RecurrenceId" },
                          recurrenceRule: { from: "RecurrenceRule" },
                          recurrenceException: { from: "RecurrenceException" },
                          host: {from: "Host"}
                      }
                  }
              }
          },
          //Define how to group the resources
          group: {
              resources: [ "room" ]
          },
          //Additional resources for the scheduled events.
          resources: [
              {
                  //Attendee determines if it is a class or event. It should have a more meaningful name
                  //other than attendee, but that was the kendo default.
                  field: "attendee",
                  dataSource: [
                      { text: "Class", value: 1, color: "#eeb111" },
                      { text: "Event", value: 2, color: "#bc9b6a" }
                  ],
                  title: "Type"
              },
              {
                  //This is the rooms list for each schedule. This could be setup with a datasource so that it could
                  //be pulled from a database, but for now, it is hard coded in. The employee schedule has resources
                  //being pulled from a database. Refer to how it is done in the employee tab if you want to change
                  //how this list of classes is set.
                  field: "roomId",
                  name: "room",
                  dataSource: [
                      { text: "C-122", value: 1, capacity:"36" },
                      { text: "C-123", value: 2, capacity:"42" },
                      { text: "C-124", value: 3, capacity:"34"  },
                      { text: "C-136", value: 4, capacity:"36"  },
                      { text: "C-141", value: 5, capacity:"30"  },
                      { text: "D-201", value: 6, capacity:"50"  },
                      { text: "D-202", value: 7, capacity:"38"  },
                      { text: "D-204", value: 8, capacity:"36"  },
                      { text: "D-205", value: 9, capacity:"36"  },
                      { text: "D-206", value: 10, capacity:"28"  },
                      { text: "D-208", value: 11, capacity:"50"  },
                      { text: "D-210", value: 12, capacity:"32"  },
                      { text: "D-212", value: 13, capacity:"32"  },
                      { text: "D-109", value: 14, capacity:"150"  },
                      { text: "D-115", value: 15, capacity:"80"  },
                      { text: "E-124", value: 16, capacity:"24"  }
                  ],
                  title: "Room"
              }
          ]
      });
    }
  };
});