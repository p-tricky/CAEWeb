var RoomTabsMVC = new Backbone.Marionette.Application();

RoomTabsMVC.addRegions({
  tabContent: '#tabsDiv'
});

RoomTabsMVC.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

RoomTabsMVC.on('initialize:after', function() {
  tpl.loadTemplates(['classroomTab','computerclassroomTab','breakoutroomTab','specialroomTab'], function() {
    //setup an inital view and attach it to the content from the server.
    var contentDiv = new  RoomView({el:$('#innerTabsDiv'),'tabName':'classroomTab'});
    RoomTabsMVC.tabContent.attachView(contentDiv);
    //start the backbone history
    var result = Backbone.history.start({pushState: true, root: "/caeweb/roomschedule/", silent:true});
  });
});

RoomTabsMVC.module('RoomTabsList', function (RoomTabsList, App, Backbone, Marionette, $, _) {
  RoomTabsList.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "classroom" : "classroom",
      "computerclassroom" : "computerclassroom",
      "breakoutroom" : "breakoutroom",
      "specialroom" : "specialroom",
    }
  });


  var RoomController = {
    classroom : function() {
      var contentDiv = new RoomView({'tabName':'classroomTab'});
      App.tabContent.show(contentDiv);
    },

    computerclassroom : function() {
      var contentDiv = new RoomView({'tabName':'computerclassroomTab'});
      App.tabContent.show(contentDiv);
    },

    breakoutroom : function() {
      var contentDiv = new RoomView({'tabName':'breakoutroomTab'});
      App.tabContent.show(contentDiv);
    },

    specialroom : function() {
      var contentDiv = new RoomView({'tabName':'specialroomTab'});
      App.tabContent.show(contentDiv);
    }
  };

  RoomTabsMVC.addInitializer(function(){
    new RoomTabsList.Router({
      controller: RoomController
    });
  });


});

RoomTabsMVC.start();