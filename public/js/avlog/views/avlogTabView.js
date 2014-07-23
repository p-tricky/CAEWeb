//Put the general tabs into the AVLogTab Module
AVLogApp.module('AVLogTab', function (AVLogTab, App, Backbone, Marionette, $, _) {

  //Define a layout to be used 
  AVLogTab.AVLogTabView = Backbone.Marionette.Layout.extend({

    //When this view is initialized, do the following things.
    initialize : function(options) {
      //fetch the options from the passed in ones, and assign them to the view. If none, default to empty object {}.
      this.options = options || {};
      //Get the tabName from the passed in options and pass it to the tpl function defined in util.js
      //Then pass the returned template to Handlebars.compile. This is the template that will be used
      //with this view. The template name can be see from main.js when this view is created. It is passed
      //as the first parameter.
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //Define some regions within the template that can be accesed directly from the javascript
    regions: {
        roomTable: '#roomTable',
        roomLog:'#roomLog',
        modalArea: '#modalBox'
    },

    //Give this view an id. By default the tab will be a DIV
    id:'innerTabsDiv',
    
    //Setup events for elements in the template.
    events : {
      'click .classroom' : 'navigateToClassroom',
      'click .computerclassroom':'navigateToComputerClassroom',
      'click .breakoutroom':'navigateToBreakoutRoom',
      'click .specialroom':'navigateToSpecialRoom'
    },
    
    //Functions to be run from the events setup right above.
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