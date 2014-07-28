//Make the model and collection live inside the AVLogClassroomTab module.
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {

  //Define the model to represent all of the logs for a particular classroom.
  AVLogClassroomTab.RoomLogModel = Backbone.Model.extend({
    //Define some default properties that will be used if a new model is created client side.
    defaults : {
      'id' : null,
      'room_name' : '',
      'message' : ''
    },

    //The url that will be used to persist the data to the server side.
    urlRoot : 'api/avlog',

    //function that will be called when a new log entry needs to be created and saved to the server.
    //The properties that need to be saved are passed in to the function as an object called addModelProperties.
    addItem : function(addModelProperties) {
      this.set(addModelProperties); //set the properties
      var returnValue = false; //setup a return value
      if (this.isValid()) { //Chek to make sure the model is valid.

        //Attempt to create a new model in the collection and save it. Wait is set to true so a server
        //response must be received before execution continues. If successful returnValue is assigned true.
        returnValue = AVLogClassroomTab.roomLogCollection.create(this, {
          success: function() {
            return true; //This value will be assigned to returnValue
          },
          error : function() {
            alert('Error Adding New Item');
            return false; //After alert this value will be assigned to returnValue
          },
          wait : true //wait for server response
        });
      }
      //return the returnvalue
      return returnValue;
    },
  });

  //Define the collection that uses the above model.
  AVLogClassroomTab.RoomLogCollection = Backbone.Collection.extend({
    model : AVLogClassroomTab.RoomLogModel,
    url : 'api/avlog',

    //comparator function is used to sort the collection.
    comparator: function(item) {
     return -(Number(item.get('id')));
    }

  });
});