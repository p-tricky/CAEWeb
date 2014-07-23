AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  
  AVLogClassroomTab.ComputerClassroomController = {

    //Function to get the list of rooms, and then call the passed in callback function.
    //Refer to classroomController.js for some more information.
    getRoomList : function(callback) {
      if (typeof AVLogClassroomTab.computerClassroomList === "undefined") {
        console.log('Getting ComputerClassroom Data');
        AVLogClassroomTab.computerClassroomList = new AVLogApp.AVLogClassroomTab.ClassroomCollection();
        AVLogClassroomTab.computerClassroomList.fetch({data: {type:'2'}, success : callback});
      } else {
        callback();
      }
    },

    //This is the function that will be typically passed to the getRoomList function as a callback.
    //We can't show the Room Table until after the Room List has been fetched.
    //Refer to classroomController.js for some more information.
    showRoomTable : function(callback) {
      var tabContentDiv = new AVLogClassroomTab.RoomListCompositeView({collection: AVLogClassroomTab.computerClassroomList, 'contentName':'roomTable'});
      $('#loadingDiv').remove();
      App.tabDiv.roomTable.show(tabContentDiv);
    }

  };
});