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
    });