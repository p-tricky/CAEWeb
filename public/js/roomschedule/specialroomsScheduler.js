      $(function() {
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
                    url: "../specialroom",
                    dataType: "json"
                  },
                  update: {
                    url:"../specialroom/update",
                    type:'PUT',
                    dataType: "json"
                  },
                  create: {
                    url:"../specialroom/new",
                    type: 'POST',
                    dataType: "json"
                  },
                  destroy: {
                    url:"../specialroom/destroy",
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
                            recurrenceException: { from: "RecurrenceException" }
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
                        { text: "C-135", value: 1, capacity:"0" },
                        { text: "E-103", value: 2, capacity:"0" },
                        { text: "C-208", value: 3, capacity:"24"  },
                        { text: "C-258", value: 4, capacity:"0"  },
                        { text: "G-209", value: 5, capacity:"0"  }
                    ],
                    title: "Room"
                }
            ]
        });
    });