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

    //this will show the other tabs of the user has sys admin permissions
    //TODO: we should probably change this to the same way that the employee app
    //does it. Its more efficent and looks better than this, since this just seems to pop in the tabs
    onShow: function() {
      $.ajax({
        type: "GET",
        url: '../employee/api/userpermissions',
      }).done(function(response) {
        this.user = JSON.parse("[" + response + "]");
        if(this.user[0].acc_sysadm == 1)
        {
          $("#virusTracker").css('visibility', 'visible');
          $("#virusUser").css('visibility', 'visible');
        }
      });
      
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
