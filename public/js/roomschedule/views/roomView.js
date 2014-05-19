RoomScheduleApp.module('RoomTabsList', function (RoomTabsList, App, Backbone, Marionette, $, _) {
  RoomTabsList.RoomView = Backbone.Marionette.ItemView.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    id:'innerTabsDiv',
    
    events : {
      'click .classroom' : 'navigateToClassroom',
      'click .computerclassroom':'navigateToComputerClassroom',
      'click .breakoutroom':'navigateToBreakoutRoom',
      'click .specialroom':'navigateToSpecialRoom'
    },
    
    navigateToClassroom : function() {
      RoomScheduleApp.navigate('classroom',true);
    },

    navigateToComputerClassroom : function() {
      RoomScheduleApp.navigate('computerclassroom',true);
    },

    navigateToBreakoutRoom : function() {
      RoomScheduleApp.navigate('breakoutroom',true);
    },

    navigateToSpecialRoom : function() {
      RoomScheduleApp.navigate('specialroom',true);
    }
  });
});