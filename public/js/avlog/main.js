AVLogApp.addRegions({
  tabArea: '#tabsDiv'
});

AVLogApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

AVLogApp.AVLogAppController = {
  classroom : function() {
    AVLogApp.tabDiv = new AVLogApp.AVLogTab.AVLogTabView({'tabName':'classroomTab'});
    AVLogApp.tabArea.show(AVLogApp.tabDiv);
    AVLogApp.AVLogClassroomTab.ClassroomController.getRoomList(AVLogApp.AVLogClassroomTab.ClassroomController.showRoomTable);
  },

  computerclassroom : function() {
    AVLogApp.tabDiv= new AVLogApp.AVLogTab.AVLogTabView({'tabName':'computerclassroomTab'});
    AVLogApp.tabArea.show(AVLogApp.tabDiv);
    AVLogApp.AVLogClassroomTab.ComputerClassroomController.getRoomList(AVLogApp.AVLogClassroomTab.ComputerClassroomController.showRoomTable);
  },

  breakoutroom : function() {
    AVLogApp.tabDiv = new AVLogApp.AVLogTab.AVLogTabView({'tabName':'breakoutroomTab'});
    AVLogApp.tabArea.show(AVLogApp.tabDiv);
    AVLogApp.AVLogClassroomTab.BreakoutRoomController.getRoomList(AVLogApp.AVLogClassroomTab.BreakoutRoomController.showRoomTable);
  },

  specialroom : function() {
    AVLogApp.tabDiv = new AVLogApp.AVLogTab.AVLogTabView({'tabName':'specialroomTab'});
    AVLogApp.tabArea.show(AVLogApp.tabDiv);
    AVLogApp.AVLogClassroomTab.SpecialRoomController.getRoomList(AVLogApp.AVLogClassroomTab.SpecialRoomController.showRoomTable);
  }
};

AVLogApp.Router = new Marionette.AppRouter({
  controller:AVLogApp.AVLogAppController,
  appRoutes: {
    "classroom" : "classroom",
    "computerclassroom" : "computerclassroom",
    "breakoutroom" : "breakoutroom",
    "specialroom" : "specialroom",
  }
});

AVLogApp.on('initialize:after', function() {
  tpl.loadTemplates(['classroomTab','computerclassroomTab','breakoutroomTab','specialroomTab'], function() {

    //start the backbone history
    var result = Backbone.history.start({pushState: true, root: "/invspike/avlog/"});//, silent:true});
  });
});

AVLogApp.start();