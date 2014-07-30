//Define a Computer Classroom Tab module for the kendo scheduler to line in.
RoomScheduleApp.module('RoomScheduleComputerClassroomTab', function (RoomScheduleComputerClassroomTab, App, Backbone, Marionette, $, _) {

  //Define a computer classroom controller for all the functions related to special rooms
  RoomScheduleComputerClassroomTab.ComputerClassroomController = {

    //Function to display the scheduler for the computer classrooms rooms
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
                  url: "../computerclassroom",
                  dataType: "json"
                },
                update: {
                  url:"../computerclassroom/update",
                  type:'PUT',
                  dataType: "json"
                },
                create: {
                  url:"../computerclassroom/new",
                  type: 'POST',
                  dataType: "json"
                },
                destroy: {
                  url:"../computerclassroom/destroy",
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
                      { text: "C-220", value: 2, capacity:"26" },
                      { text: "C-224", value: 3, capacity:"26"  },
                      { text: "C-226", value: 4, capacity:"28"  },
                      { text: "C-227", value: 5, capacity:"24"  },
                      { text: "C-228", value: 6, capacity:"24"  },
                      { text: "C-229", value: 7, capacity:"24"  }
                  ],
                  title: "Room"
              }
          ]
      });
    }
  };
});