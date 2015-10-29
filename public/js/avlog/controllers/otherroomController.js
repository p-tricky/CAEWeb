//Define a module for the specfic tab that the app is on.
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  
  //Define a controller to hold all of the functions for this module.
  AVLogClassroomTab.OtherRoomController = {

    //Function to get the list of rooms, and then call the passed in callback function.
    //Refer to classroomController.js for some more information.
    getRoomList : function(callback) {
      if (typeof AVLogClassroomTab.otherRoomList === "undefined") {
        AVLogClassroomTab.otherRoomList = new AVLogApp.AVLogClassroomTab.ClassroomCollection();
        AVLogClassroomTab.otherRoomList.fetch({data: {type:'5'}, success : callback});
      } else {
        callback();
      }
    },

    //This is the function that will be typically passed to the getRoomList function as a callback.
    //We can't show the Room Table until after the Room List has been fetched.
    //Refer to classroomController.js for some more information.
    showRoomTable : function(callback) {
      var tabContentDiv = new AVLogClassroomTab.RoomListCompositeView({collection: AVLogClassroomTab.otherRoomList, 'contentName':'roomTable'});
      $('#loadingDiv').remove();
      App.tabDiv.roomTable.show(tabContentDiv);
    },

    showAddRoomModal : function()
    {
      $('#addNew').prop('disabled',true);
      $('#fade').addClass('fade');
      $('#modalBox').addClass('modalBox');
      $('#addNew').prop('disabled',false);
      var modalView = new AVLogClassroomTab.AVLogAddRoomModalView({model:new AVLogClassroomTab.ClassroomModel()});
      App.tabDiv.modalArea.show(modalView);
    }

  };
});