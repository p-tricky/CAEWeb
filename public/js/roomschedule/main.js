RoomScheduleApp.addRegions({
  tabContent: '#tabsDiv'
});

RoomScheduleApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

RoomScheduleApp.RoomController = {
    classroom : function() {
      var contentDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'classroomTab'});
      RoomScheduleApp.tabContent.show(contentDiv);
      RoomScheduleApp.RoomScheduleClassroomTab.ClassroomController.showRoomSchedule();
    },

    computerclassroom : function() {
      var contentDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'computerclassroomTab'});
      RoomScheduleApp.tabContent.show(contentDiv);
      RoomScheduleApp.RoomScheduleComputerClassroomTab.ComputerClassroomController.showRoomSchedule();
    },

    breakoutroom : function() {
      var contentDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'breakoutroomTab'});
      RoomScheduleApp.tabContent.show(contentDiv);
      RoomScheduleApp.RoomScheduleBreakoutRoomTab.BreakoutRoomController.showRoomSchedule();
    },

    specialroom : function() {
      var contentDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'specialroomTab'});
      RoomScheduleApp.tabContent.show(contentDiv);
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
    //setup an inital view and attach it to the content from the server.
    var contentDiv = new  RoomScheduleApp.RoomTabsList.RoomView({el:$('#innerTabsDiv'),'tabName':'classroomTab'});
    RoomScheduleApp.tabContent.attachView(contentDiv);
    //start the backbone history
    var result = Backbone.history.start({pushState: true, root: "/caeweb/roomschedule/"});//, silent:true});
  });
});

RoomScheduleApp.start();