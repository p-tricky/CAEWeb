AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  AVLogClassroomTab.RoomLogModel = Backbone.Model.extend({
    defaults : {
      'id' : null,
      'room_name' : '',
      'message' : ''
    },

    urlRoot : 'api/avlog',

    addItem : function(addModelProperties) {
      this.set(addModelProperties);
      var returnValue = false;
      if (this.isValid()) {
        returnValue = AVLogClassroomTab.roomLogCollection.create(this, {
          success: function() {
            return true;
          },
          error : function() {
            alert('Error Adding New Item');
            return false;
          },
          wait : true
        });
      }
      console.log(returnValue);
      return returnValue;
    },
  });

  AVLogClassroomTab.RoomLogCollection = Backbone.Collection.extend({
    model : AVLogClassroomTab.RoomLogModel,
    url : 'api/avlog',

    comparator: function(item) {
     return -(Number(item.get('id')));
    }

  });
});