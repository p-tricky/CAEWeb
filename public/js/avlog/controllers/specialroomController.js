AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  
  AVLogClassroomTab.SpecialRoomController = {

    getRoomList : function(callback) {
      if (typeof AVLogClassroomTab.specialRoomList === "undefined") {
        console.log('Getting Special Room Data');
        AVLogClassroomTab.specialRoomList = new AVLogApp.AVLogClassroomTab.ClassroomCollection();
        AVLogClassroomTab.specialRoomList.fetch({data: {type:'4'}, success : callback});
      } else {
        callback();
      }
    },

    showRoomTable : function(callback) {
      var tabContentDiv = new AVLogClassroomTab.RoomListCompositeView({collection: AVLogClassroomTab.specialRoomList, 'contentName':'roomTable'});
      $('#loadingDiv').remove();
      App.tabDiv.roomTable.show(tabContentDiv);
    }

  };
});