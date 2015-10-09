//Put the general tabs into the RoomTabsList Module
RoomScheduleApp.module('RoomTabsList', function (RoomTabsList, App, Backbone, Marionette, $, _) {

  //Define a layout to be used
  RoomTabsList.RoomView = Backbone.Marionette.ItemView.extend({

    //When this view is initalized, do the following things
    initialize : function(options) {
      //fetch the options from the passed in ones, and assign them to the view. If none, default to empty object {}.
      this.options = options || {};
      //Get the tabName from the passed in options and pass it to the tpl function defined in util.js
      //Then pass the returned template to Handlebars.compile. This is the template that will be used
      //with this view. The template name can be see from main.js when this view is created. It is passed
      //as the first parameter.
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //Give this view an id. By default the tab will be a DIV
    id:'innerTabsDiv',
    
    //Setup events for elements in the template.
    events : {
      'click .classroom' : 'navigateToClassroom',
      'click .computerclassroom':'navigateToComputerClassroom',
      'click .breakoutroom':'navigateToBreakoutRoom',
      'click .specialroom':'navigateToSpecialRoom',
      'click .uploadschedule':'navigateToUploadSchedule'
    },
    
    //Functions to be run from the events setup right above.
    navigateToClassroom : function() {
      $.ajax({
        type: "GET",
        url: '../employee/api/checklogin',
      }).done(function(response) {
        if (response == "false")
        {
          window.location.href = "/caeweb/";
        }       
        else
        {
          //Do the navigate
          RoomScheduleApp.navigate('classroom',true);
        }
      });      
      
    },

    navigateToComputerClassroom : function() {
      $.ajax({
        type: "GET",
        url: '../employee/api/checklogin',
      }).done(function(response) {
        if (response == "false")
        {
          window.location.href = "/caeweb/";
        }       
        else
        {
          //Do the navigate
          RoomScheduleApp.navigate('computerclassroom',true);
        }
      });      
    },

    navigateToBreakoutRoom : function() {
      $.ajax({
        type: "GET",
        url: '../employee/api/checklogin',
      }).done(function(response) {
        if (response == "false")
        {
          window.location.href = "/caeweb/";
        }       
        else
        {
          //Do the navigate
          RoomScheduleApp.navigate('breakoutroom',true);
        }
      });      
    },

    navigateToSpecialRoom : function() {
      $.ajax({
        type: "GET",
        url: '../employee/api/checklogin',
      }).done(function(response) {
        if (response == "false")
        {
          window.location.href = "/caeweb/";
        }       
        else
        {
          //Do the navigate
          RoomScheduleApp.navigate('specialroom',true);
        }
      });      
    },

    navigateToUploadSchedule : function() {
      $.ajax({
        type: "GET",
        url: '../employee/api/checklogin',
      }).done(function(response) {
        if (response == "false")
        {
          window.location.href = "/caeweb/";
        }       
        else
        {
          //Do the navigate
          RoomScheduleApp.navigate('uploadschedule',true);
        }
      });
    }
  });
});
