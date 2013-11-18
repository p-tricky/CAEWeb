@extends('layouts.nosidebar')

@section('content')
    <title>Schedule Grid</title>
    <link rel="stylesheet" href="css/kendo.common.css" type="text/css" media="screen" charset="utf-8" />
    <link rel="stylesheet" href="css/kendo.default.css" type="text/css" media="screen" charset="utf-8">
    <link rel="stylesheet" href="css/scheduleSpike.css" type="text/css" media="screen" charset="utf-8">

    <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="js/kendo.core.js"></script>
    <script type="text/javascript" src="js/kendo.data.js"></script>
    <script type="text/javascript" src="js/kendo.popup.js"></script>
    <script type="text/javascript" src="js/kendo.list.js"></script>
    <script type="text/javascript" src="js/kendo.dropdownlist.js"></script>
    <script type="text/javascript" src="js/kendo.calendar.js"></script>
    <script type="text/javascript" src="js/kendo.datepicker.js"></script>
    <script type="text/javascript" src="js/kendo.timepicker.js"></script>
    <script type="text/javascript" src="js/kendo.datetimepicker.js"></script>
    <script type="text/javascript" src="js/kendo.userevents.js"></script>
    <script type="text/javascript" src="js/kendo.numerictextbox.js"></script>
    <script type="text/javascript" src="js/kendo.validator.js"></script>
    <script type="text/javascript" src="js/kendo.binder.js"></script>
    <script type="text/javascript" src="js/kendo.editable.js"></script>
    <script type="text/javascript" src="js/kendo.multiselect.js"></script>
    <script type="text/javascript" src="js/kendo.draganddrop.js"></script>
    <script type="text/javascript" src="js/kendo.window.js"></script>
    <script type="text/javascript" src="js/kendo.scheduler.recurrence.js"></script>
    <script type="text/javascript" src="js/kendo.scheduler.view.js"></script>
    <script type="text/javascript" src="js/kendo.scheduler.dayview.js"></script>
    <script type="text/javascript" src="js/kendo.scheduler.agendaview.js"></script>
    <script type="text/javascript" src="js/kendo.scheduler.monthview.js"></script>
    <script type="text/javascript" src="js/kendo.scheduler.js"></script>

    <script>
      $(function() {
        var TODAY = new Date();
        $("#content").kendoScheduler({
            date: new Date(),
            startTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 8, 0, 0),
            endTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 22, 0, 0),
            height: 967,
            allDaySlot: false,

            views: [
                "day"
            ],
            dataSource: {
              batch: true,
                transport: {
                  read: {
                    url: "classroom",
                    dataType: "json"
                  },
                  update: {
                    url:"classroom/update",
                    type:'PUT',
                    dataType: "json"
                  },
                  create: {
                    url:"classroom/new",
                    type: 'POST',
                    dataType: "json"
                  },
                  destroy: {
                    url:"classroom/destroy",
                    type:'DELETE',
                    dataType: "json"
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
                        { text: "Class", value: 1, color: "#f8a398" },
                        { text: "Event", value: 2, color: "#51a0ed" }
                    ],
                    title: "Type"
                },
                {
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
                        { text: "D-212", value: 12, capacity:"32"  },
                        { text: "D-109", value: 14, capacity:"150"  },
                        { text: "D-115", value: 15, capacity:"80"  },
                        { text: "E-124", value: 16, capacity:"24"  }
                    ],
                    title: "Room"
                }
            ]
        });
    });
</script>
@endsection