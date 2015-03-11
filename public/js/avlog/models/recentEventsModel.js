//Make the model and collection live inside the AVLogClassroomTab module.
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {

  //Define the model to represent all of the classrooms in the building that need av log information tracked
  AVLogClassroomTab.RecentEventModel = Backbone.Model.extend({
    defaults : {
      'id' : null,
      'room_name' : '',
      'message' : ''
    },

    urlRoot : 'api/recent'
  });

  //Define the collection that uses the above model. 
  AVLogClassroomTab.RecentEventCollection = Backbone.Collection.extend({
    model : AVLogClassroomTab.RecentEventModel,
    url : 'api/recent'

  });
});