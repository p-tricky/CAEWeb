AVLogApp.module('AVLogTab', function (AVLogTab, App, Backbone, Marionette, $, _) {
  AVLogTab.AVLogTabView = Backbone.Marionette.Layout.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    regions: {
        roomTable: '#roomTable',
        roomLog:'#roomLog',
        modalArea: '#modalBox'
    },

    id:'innerTabsDiv',
    
    events : {
      'click .classroom' : 'navigateToClassroom',
      'click .computerclassroom':'navigateToComputerClassroom',
      'click .breakoutroom':'navigateToBreakoutRoom',
      'click .specialroom':'navigateToSpecialRoom'
    },
    
    navigateToClassroom : function() {
      AVLogApp.navigate('classroom',true);
    },

    navigateToComputerClassroom : function() {
      AVLogApp.navigate('computerclassroom',true);
    },

    navigateToBreakoutRoom : function() {
      AVLogApp.navigate('breakoutroom',true);
    },

    navigateToSpecialRoom : function() {
      AVLogApp.navigate('specialroom',true);
    }
  });
});