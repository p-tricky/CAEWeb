//Define module for the inventory tab to live in.
SysAdminApp.module('VirusTrackerTab', function (VirusTrackerTab, App, Backbone, Marionette, $, _) {
  //Define a new layout for the tabs, tabs content, and modal box
  VirusTrackerTab.VirusTrackerView = Backbone.Marionette.Layout.extend({

    //On Instanciation, this initialize function will be called
    initialize : function(options) {
      //fetch any options that are passed out of the options object. This includes the template
      this.options = options || {};
      //use tpl to get the template specified in options and then pass it to handlebars
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //Define regions of the template that can be popluated later.
    regions: {
        tabContent: '#tabsContent',
        modalArea: '#modalBox'
    },

    //Define the id for this view, which is a DIV by default.
    id:'innerTabsDiv',
    
    //Define events for the view. All of the events are click events on the tabs
    //The second parameter is the function to call when the first part is clicked
    events : {
      'click .virusTracker' : 'navigateToVirusTracker',
      'click .virusUser' : 'navigateToVirusUser',
      'click .checkoutLab': 'navigateToCheckoutLab',
    },
    
    //All of the functions associated with the events.
    navigateToVirusTracker : function() {
      //When the event fires this function, it will navigate the app to the specified uri
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
          SysAdminApp.navigate('virustracker',true);
        }
      });      
      
    },

    //All of the functions associated with the events.
    navigateToVirusUser : function() {
      //When the event fires this function, it will navigate the app to the specified uri
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
          SysAdminApp.navigate('virususer',true);
        }
      });      
    },

    //All of the functions associated with the events.
    navigateToCheckoutLab : function() {
      //When the event fires this function, it will navigate the app to the specified uri
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
          SysAdminApp.navigate('checkoutlab',true);
        }
      });      
    },

  });
});
