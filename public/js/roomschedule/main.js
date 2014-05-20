RoomScheduleApp.addRegions({
  tabArea: '#tabsDiv'
});

RoomScheduleApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

RoomScheduleApp.RoomController = {
    classroom : function() {
      RoomScheduleApp.tabDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'classroomTab'});
      RoomScheduleApp.tabArea.show(RoomScheduleApp.tabDiv);
      RoomScheduleApp.RoomScheduleClassroomTab.ClassroomController.showRoomSchedule();
    },

    computerclassroom : function() {
      RoomScheduleApp.tabDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'computerclassroomTab'});
      RoomScheduleApp.tabArea.show(RoomScheduleApp.tabDiv);
      RoomScheduleApp.RoomScheduleComputerClassroomTab.ComputerClassroomController.showRoomSchedule();
    },

    breakoutroom : function() {
      RoomScheduleApp.tabDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'breakoutroomTab'});
      RoomScheduleApp.tabArea.show(RoomScheduleApp.tabDiv);
      RoomScheduleApp.RoomScheduleBreakoutRoomTab.BreakoutRoomController.showRoomSchedule();
    },

    specialroom : function() {
      RoomScheduleApp.tabDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'specialroomTab'});
      RoomScheduleApp.tabArea.show(RoomScheduleApp.tabDiv);
      RoomScheduleApp.RoomScheduleSpecialRoomTab.SpecialRoomController.showRoomSchedule();
    }
};

RoomScheduleApp.Router = new Marionette.AppRouter({
    controller:RoomScheduleApp.RoomController,
    appRoutes: {
      "classroom" : "classroom",
      "computerclassroom" : "computerclassroom",
      "breakoutroom" : "breakoutroom",
      "specialroom" : "specialroom",
    }
});

RoomScheduleApp.on('initialize:after', function() {
  tpl.loadTemplates(['classroomTab','computerclassroomTab','breakoutroomTab','specialroomTab'], function() {
    //start the backbone history
    var result = Backbone.history.start({pushState: true, root: "/caeweb/roomschedule/"});//, silent:true});
  });
});

RoomScheduleApp.start();