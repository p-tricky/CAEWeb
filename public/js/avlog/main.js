//Define the region where the tabs will go.
AVLogApp.addRegions({
  tabArea: '#tabsDiv'
});

//Define a method that can be used to navigate the app to a particular URL.
AVLogApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

//Define the main controller to be used with the router listed below.
AVLogApp.AVLogAppController = {
  //function to be called when the classroom route is in the url
  classroom : function() {
    //create a new tab view, and namespace it to the AVLogApp
    AVLogApp.tabDiv = new AVLogApp.AVLogTab.AVLogTabView({'tabName':'classroomTab'});
    AVLogApp.tabArea.show(AVLogApp.tabDiv); //show the new view.
    //Get the Room List, and pass the showRoomTable function as a callback to the getRoolList function
    AVLogApp.AVLogClassroomTab.ClassroomController.getRoomList(AVLogApp.AVLogClassroomTab.ClassroomController.showRoomTable);
  },

  //function to be called when the computerclassroom route is in the url
  computerclassroom : function() {
    AVLogApp.tabDiv= new AVLogApp.AVLogTab.AVLogTabView({'tabName':'computerclassroomTab'});
    AVLogApp.tabArea.show(AVLogApp.tabDiv);
    AVLogApp.AVLogClassroomTab.ComputerClassroomController.getRoomList(AVLogApp.AVLogClassroomTab.ComputerClassroomController.showRoomTable);
  },

  //function to be called when the breakoutroom route is in the url
  breakoutroom : function() {
    AVLogApp.tabDiv = new AVLogApp.AVLogTab.AVLogTabView({'tabName':'breakoutroomTab'});
    AVLogApp.tabArea.show(AVLogApp.tabDiv);
    AVLogApp.AVLogClassroomTab.BreakoutRoomController.getRoomList(AVLogApp.AVLogClassroomTab.BreakoutRoomController.showRoomTable);
  },

  //function to be called when the specialroom route is in the url
  specialroom : function() {
    AVLogApp.tabDiv = new AVLogApp.AVLogTab.AVLogTabView({'tabName':'specialroomTab'});
    AVLogApp.tabArea.show(AVLogApp.tabDiv);
    AVLogApp.AVLogClassroomTab.SpecialRoomController.getRoomList(AVLogApp.AVLogClassroomTab.SpecialRoomController.showRoomTable);
  }
};

//Define the router that will listen to the URL, and call the correct associated function
AVLogApp.Router = new Marionette.AppRouter({
  controller:AVLogApp.AVLogAppController, //specify the controller to use.
  appRoutes: {
    "classroom" : "classroom",
    "computerclassroom" : "computerclassroom",
    "breakoutroom" : "breakoutroom",
    "specialroom" : "specialroom",
  }
});

//Setup the things that need to start when the App is started. This includes getting inital templates, and starting the history.
AVLogApp.on('initialize:after', function() {
  //load any initial templates that may be needed.
  tpl.loadTemplates(['classroomTab','computerclassroomTab','breakoutroomTab','specialroomTab'], function() {

    //start the backbone history
    var result = Backbone.history.start({pushState: true, root: "/caeweb/avlog/"});
  });
});

//Start the Marionette app. This will cause the initalize defined above to run, and the router to start lisening to the URLs
AVLogApp.start();