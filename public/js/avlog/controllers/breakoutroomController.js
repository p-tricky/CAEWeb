AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  
  AVLogClassroomTab.BreakoutRoomController = {

    getRoomList : function(callback) {
      if (typeof AVLogClassroomTab.breakoutRoomList === "undefined") {
        console.log('Getting Breakout Room Data');
        AVLogClassroomTab.breakoutRoomList = new AVLogApp.AVLogClassroomTab.ClassroomCollection();
        AVLogClassroomTab.breakoutRoomList.fetch({data: {type:'3'}, success : callback});
      } else {
        callback();
      }
    },

    showRoomTable : function(callback) {
      var tabContentDiv = new AVLogClassroomTab.RoomListCompositeView({collection: AVLogClassroomTab.breakoutRoomList, 'contentName':'roomTable'});
      $('#loadingDiv').remove();
      App.tabDiv.roomTable.show(tabContentDiv);
    }

  };
});