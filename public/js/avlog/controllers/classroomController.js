AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  
  AVLogClassroomTab.ClassroomController = {

    getRoomList : function(callback) {
      if (typeof AVLogClassroomTab.classroomList === "undefined") {
        console.log('Getting Classroom Data');
        AVLogClassroomTab.classroomList = new AVLogApp.AVLogClassroomTab.ClassroomCollection();
        AVLogClassroomTab.classroomList.fetch({data: {type:'1'}, success : callback});
      } else {
        callback();
      }
    },

    showRoomTable : function(callback) {
      var tabContentDiv = new AVLogClassroomTab.RoomListCompositeView({collection: AVLogClassroomTab.classroomList, 'contentName':'roomTable'});
      $('#loadingDiv').remove();
      App.tabDiv.roomTable.show(tabContentDiv);
    },

    //All room catagories are sharing this method to display the details
    getLogForRoom : function(theModel, callback) {
      AVLogClassroomTab.roomLogCollection = new AVLogApp.AVLogClassroomTab.RoomLogCollection();
      AVLogClassroomTab.roomLogCollection.roomNumber = theModel.get('name');
      AVLogClassroomTab.roomLogCollection.fetch({data:{room:theModel.get('name')}, success : callback});
    },

    //All room catagories are sharing this method to display the details
    showRoomDetails : function() {
      var tabContentDiv = new AVLogClassroomTab.RoomLogDetailsCompositeView({collection: AVLogClassroomTab.roomLogCollection, 'contentName':'roomLogDetails'});
      App.tabDiv.roomLog.show(tabContentDiv);
    },

    //All room catagories are sharing this method to display the modal box
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