AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  AVLogClassroomTab.ClassroomModel = Backbone.Model.extend({
    defaults : {
      'id' : null,
      'name' : '',
      'capacity' : '',
      'type' : ''
    },

    urlRoot : 'api/ceasrooms'
  });

  AVLogClassroomTab.ClassroomCollection = Backbone.Collection.extend({
    model : AVLogClassroomTab.ClassroomModel,
    url : 'api/ceasrooms'

  });
});