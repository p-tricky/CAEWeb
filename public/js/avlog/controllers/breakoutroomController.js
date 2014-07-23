AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  
  AVLogClassroomTab.BreakoutRoomController = {

    //Function to get the list of rooms, and then call the passed in callback function.
    //Refer to classroomController.js for some more information.
    getRoomList : function(callback) {
      if (typeof AVLogClassroomTab.breakoutRoomList === "undefined") {
        console.log('Getting Breakout Room Data');
        AVLogClassroomTab.breakoutRoomList = new AVLogApp.AVLogClassroomTab.ClassroomCollection();
        AVLogClassroomTab.breakoutRoomList.fetch({data: {type:'3'}, success : callback});
      } else {
        callback();
      }
    },

    //This is the function that will be typically passed to the getRoomList function as a callback.
    //We can't show the Room Table until after the Room List has been fetched.
    //Refer to classroomController.js for some more information.
    showRoomTable : function(callback) {
      var tabContentDiv = new AVLogClassroomTab.RoomListCompositeView({collection: AVLogClassroomTab.breakoutRoomList, 'contentName':'roomTable'});
      $('#loadingDiv').remove();
      App.tabDiv.roomTable.show(tabContentDiv);
    }

  };
});