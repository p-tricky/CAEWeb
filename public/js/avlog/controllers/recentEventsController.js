//Define a module for the specfic tab that the app is on.
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  
  //Define a controller to hold all of the functions for this module.
  AVLogClassroomTab.RecentEventsController = {

    //Function to get the list of rooms, and then call the passed in callback function.
    //Refer to classroomController.js for some more information.
    getEventsList : function(callback) {
      if (typeof AVLogClassroomTab.recentEventsList === "undefined") {
        AVLogClassroomTab.recentEventsList = new AVLogApp.AVLogClassroomTab.RecentEventCollection();
        AVLogClassroomTab.recentEventsList.fetch({success : callback});
      } else {
        callback();
      }
    },

    //This is the function that will be typically passed to the getRoomList function as a callback.
    //We can't show the Room Table until after the Room List has been fetched.
    //Refer to classroomController.js for some more information.
    showEventsTable : function(callback) {
      var tabContentDiv = new AVLogClassroomTab.RecentEventsCompositeView({collection: AVLogClassroomTab.recentEventsList, 'contentName':'roomLogDetails'});
      $('#loadingDiv').remove();
      App.tabDiv.roomLog.show(tabContentDiv);
    }
  };
});