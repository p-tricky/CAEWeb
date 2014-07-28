//Make the model and collection live inside the AVLogClassroomTab module.
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {

  //Define the model to represent all of the classrooms in the building that need av log information tracked
  AVLogClassroomTab.ClassroomModel = Backbone.Model.extend({
    defaults : {
      'id' : null,
      'name' : '',
      'capacity' : '',
      'type' : ''
    },

    urlRoot : 'api/ceasrooms'
  });

  //Define the collection that uses the above model. 
  AVLogClassroomTab.ClassroomCollection = Backbone.Collection.extend({
    model : AVLogClassroomTab.ClassroomModel,
    url : 'api/ceasrooms'

  });
});