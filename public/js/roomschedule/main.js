//Define the region where the tabs will go.
RoomScheduleApp.addRegions({
  tabArea: '#tabsDiv'
});

//Define a method that can be used to navigate the app to a particular URL.
RoomScheduleApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

//Define the main controller to be used with the router listed below.
RoomScheduleApp.RoomController = {
    //function to be called when the classroom route is in the url
    classroom : function() {
      //create a new tab view, and namespace it to the RoomScheduleApp
      RoomScheduleApp.tabDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'classroomTab'});
      RoomScheduleApp.tabArea.show(RoomScheduleApp.tabDiv); //show the new view
      //Call the function that will show the room schedule
      RoomScheduleApp.RoomScheduleClassroomTab.ClassroomController.showRoomSchedule();
    },

    //funtion to be called when the computerclassroom route is in the url
    computerclassroom : function() {
      RoomScheduleApp.tabDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'computerclassroomTab'});
      RoomScheduleApp.tabArea.show(RoomScheduleApp.tabDiv);
      RoomScheduleApp.RoomScheduleComputerClassroomTab.ComputerClassroomController.showRoomSchedule();
    },

    //function to be called when the breakoutroom route is in the url
    breakoutroom : function() {
      RoomScheduleApp.tabDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'breakoutroomTab'});
      RoomScheduleApp.tabArea.show(RoomScheduleApp.tabDiv);
      RoomScheduleApp.RoomScheduleBreakoutRoomTab.BreakoutRoomController.showRoomSchedule();
    },

    //function to be called when the specialroom route is in the url
    specialroom : function() {
      RoomScheduleApp.tabDiv = new RoomScheduleApp.RoomTabsList.RoomView({'tabName':'specialroomTab'});
      RoomScheduleApp.tabArea.show(RoomScheduleApp.tabDiv);
      RoomScheduleApp.RoomScheduleSpecialRoomTab.SpecialRoomController.showRoomSchedule();
    }
};

//Define the router that will listen to the URL, and call the correct associated function
RoomScheduleApp.Router = new Marionette.AppRouter({
    controller:RoomScheduleApp.RoomController,
    appRoutes: {
      "classroom" : "classroom",
      "computerclassroom" : "computerclassroom",
      "breakoutroom" : "breakoutroom",
      "specialroom" : "specialroom",
    }
});

//Setup the things that need to start when the App is started. This includes getting inital templates, and starting the history.
RoomScheduleApp.on('initialize:after', function() {
  //load any initial templates that may be needed.
  tpl.loadTemplates(['classroomTab','computerclassroomTab','breakoutroomTab','specialroomTab'], function() {
    //start the backbone history
    var result = Backbone.history.start({pushState: true, root: "/caeweb/roomschedule/"});//, silent:true});
  });
});

//Start the Marionette app. This will cause the initalize defined above to run, and the router to start listening to the URLs.
RoomScheduleApp.start();