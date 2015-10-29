//Define a module for the specfic tab that the app is on.
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  
  //Define a controller to hold all of the functions for this module.
  AVLogClassroomTab.SpecialRoomController = {

    //Function to get the list of rooms, and then call the passed in callback function.
    //Refer to classroomController.js for some more information.
    getRoomList : function(callback) {
      if (typeof AVLogClassroomTab.specialRoomList === "undefined") {
        AVLogClassroomTab.specialRoomList = new AVLogApp.AVLogClassroomTab.ClassroomCollection();
        AVLogClassroomTab.specialRoomList.fetch({data: {type:'4'}, success : callback});
      } else {
        callback();
      }
    },

    //This is the function that will be typically passed to the getRoomList function as a callback.
    //We can't show the Room Table until after the Room List has been fetched.
    //Refer to classroomController.js for some more information.
    showRoomTable : function(callback) {
      var tabContentDiv = new AVLogClassroomTab.RoomListCompositeView({collection: AVLogClassroomTab.specialRoomList, 'contentName':'roomTable'});
      $('#loadingDiv').remove();
      App.tabDiv.roomTable.show(tabContentDiv);
    }

  };
});