//Define a module for the specfic tab that the app is on.
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  
  //Define a controller to hold all of the functions for this module.
  AVLogClassroomTab.ClassroomController = {

    //Function to get the list of rooms, and then call the passed in callback function.
    getRoomList : function(callback) {
      //If we don't have the room list
      if (typeof AVLogClassroomTab.classroomList === "undefined") {
        console.log('Getting Classroom Data');
        //Create a new classroomList. Then fetch the data from the server. URL that is used for data
        //retrival is stored in the collection definition in the models folder. On success call callback.
        AVLogClassroomTab.classroomList = new AVLogApp.AVLogClassroomTab.ClassroomCollection();
        AVLogClassroomTab.classroomList.fetch({data: {type:'1'}, success : callback});
      } else { //We already have the room list -> just call the callback.
        callback();
      }
    },

    //This is the function that will be typically passed to the getRoomList function as a callback.
    //We can't show the Room Table until after the Room List has been fetched.
    showRoomTable : function() {
      var tabContentDiv = new AVLogClassroomTab.RoomListCompositeView({collection: AVLogClassroomTab.classroomList, 'contentName':'roomTable'});
      //Because of where the loading div is initally defined in the template, It needs to be manually removed.
      //This is the only time in the entire Project that the loading div needs to be manually removed vs automatically
      //being replaced by another view.
      $('#loadingDiv').remove();
      App.tabDiv.roomTable.show(tabContentDiv);
    },

    //All room catagories are sharing this method to retrive the details of a specific room.
    //This function is called from the roomItemView when a room is clicked on.
    //The function receives the model that was clicked on as the first parameter, and a callback as the
    //second. The callback will typically be the showRoomDetails function below to acutally show the details
    //after they have been fetched from the server.
    getLogForRoom : function(theModel, callback) {
      AVLogClassroomTab.roomLogCollection = new AVLogApp.AVLogClassroomTab.RoomLogCollection();
      AVLogClassroomTab.roomLogCollection.roomNumber = theModel.get('name');
      AVLogClassroomTab.roomLogCollection.fetch({data:{room:theModel.get('name')}, success : callback});
    },

    //All room catagories are sharing this method to display the details of a specific room.
    //This will typically be the callback function that is passed to getLogForRoom defined above
    showRoomDetails : function() {
      var tabContentDiv = new AVLogClassroomTab.RoomLogDetailsCompositeView({collection: AVLogClassroomTab.roomLogCollection, 'contentName':'roomLogDetails'});
      App.tabDiv.roomLog.show(tabContentDiv);
    },

    //All room catagories are sharing this method to display the modal box for adding a new log entry.
    showAVLogAddModal : function() {
      $('#addNew').prop('disabled',true);
      $('#fade').addClass('fade');
      $('#modalBox').addClass('modalBox');
      $('#addNew').prop('disabled',false);
      var modalView = new AVLogClassroomTab.AVLogAddModalView({model:new AVLogClassroomTab.RoomLogModel({room_name:AVLogClassroomTab.roomLogCollection.roomNumber})});
      App.tabDiv.modalArea.show(modalView);
    }

  };
});