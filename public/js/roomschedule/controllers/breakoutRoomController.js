RoomScheduleApp.module('RoomScheduleBreakoutRoomTab', function (RoomScheduleBreakoutRoomTab, App, Backbone, Marionette, $, _) {
  RoomScheduleBreakoutRoomTab.BreakoutRoomController = {

    showRoomSchedule : function() {
      var TODAY = new Date();
      $("#tabsContent").kendoScheduler({
          date: new Date(),
          startTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 8, 0, 0),
          endTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 22, 0, 0),
          height: 970,
          allDaySlot: false,

          views: [
              "day"
          ],
          timezone: "Etc/UTC",
          dataSource: {
            batch: true,
              transport: {
                read: {
                  url: "../breakoutroom",
                  dataType: "json"
                },
                update: {
                  url:"../breakoutroom/update",
                  type:'PUT',
                  dataType: "json"
                },
                create: {
                  url:"../breakoutroom/new",
                  type: 'POST',
                  dataType: "json"
                },
                destroy: {
                  url:"../breakoutroom/destroy",
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
          group: {
              resources: [ "room" ]
          },
          resources: [
              {
                  field: "attendee",
                  dataSource: [
                      { text: "Class", value: 1, color: "#eeb111" },
                      { text: "Event", value: 2, color: "#bc9b6a" }
                  ],
                  title: "Type"
              },
              {
                  field: "roomId",
                  name: "room",
                  dataSource: [
                      { text: "A-120", value: 1, capacity:"16" },
                      { text: "B-122", value: 2, capacity:"16" },
                      { text: "F-115", value: 3, capacity:"16"  },
                      { text: "G-113", value: 4, capacity:"16"  },
                      { text: "A-213", value: 5, capacity:"16"  },
                      { text: "B-211", value: 6, capacity:"16"  },
                      { text: "F-210", value: 7, capacity:"16"  }
                  ],
                  title: "Room"
              }
          ]
      });
    }
  };
});