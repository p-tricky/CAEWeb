AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  
  AVLogClassroomTab.ComputerClassroomController = {

    getRoomList : function(callback) {
      if (typeof AVLogClassroomTab.computerClassroomList === "undefined") {
        console.log('Getting ComputerClassroom Data');
        AVLogClassroomTab.computerClassroomList = new AVLogApp.AVLogClassroomTab.ClassroomCollection();
        AVLogClassroomTab.computerClassroomList.fetch({data: {type:'2'}, success : callback});
      } else {
        callback();
      }
    },

    showRoomTable : function(callback) {
      var tabContentDiv = new AVLogClassroomTab.RoomListCompositeView({collection: AVLogClassroomTab.computerClassroomList, 'contentName':'roomTable'});
      $('#loadingDiv').remove();
      App.tabDiv.roomTable.show(tabContentDiv);
    }

  };
});