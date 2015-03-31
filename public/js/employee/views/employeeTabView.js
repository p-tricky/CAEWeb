//Define the module EmployeeTab for all functions that apply to all tabs. Tab specific ones will be namespaced to thier specific tab.
EmployeeApp.module('EmployeeTab', function (EmployeeTab, App, Backbone, Marionette, $, _) {
  //Define the main layout that will be used within the laravel content section
  EmployeeTab.EmployeeTabView = Backbone.Marionette.Layout.extend({

    //Define the template to use. It gets passed in from the calling function
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //Define regions to use for the various divs in the template
    regions: {
      tabsList:'#tabsRow',
      tabContent: '#tabsContent',
      modalArea: '#modalBox'
    },

    //Define the id to use for this views div
    id:'innerTabsDiv',
    
    //Define click events for the various tabs and the functions to call
    events : {
      'click .myhours' : 'navigateToMyHours',
      'click .adminschedule':'navigateToAdminSchedule',
      'click .attendantschedule':'navigateToAttendentSchedule',
      'click .programmerschedule':'navigateToProgrammerSchedule',
      'click .timesheet':'navigateToTimesheet',
      'click .shiftmanager':'navigateToShiftManager',
    },
    
    //List of functions associated with the events. All of them do an navigate to somewhere else.
    navigateToMyHours : function() {
      //Clear the interval that is setup from the myhours tab to keep track of the
      //current time on the client side. If it isn't canceled, it will continue to throw
      //errors when navigating to a different page.
      clearInterval(EmployeeApp.EmployeeTab.minuteTimer);
      //Do the navigate
      EmployeeApp.navigate('myhours',true);
    },

    navigateToAdminSchedule : function() {
      //Clear the interval that is setup from the myhours tab to keep track of the
      //current time on the client side. If it isn't canceled, it will continue to throw
      //errors when navigating to a different page.
      clearInterval(EmployeeApp.EmployeeTab.minuteTimer);
      //Do the navigate
      EmployeeApp.navigate('adminschedule',true);
    },

    navigateToAttendentSchedule : function() {
      //Clear the interval that is setup from the myhours tab to keep track of the
      //current time on the client side. If it isn't canceled, it will continue to throw
      //errors when navigating to a different page.
      clearInterval(EmployeeApp.EmployeeTab.minuteTimer);
      //Do the navigate
      EmployeeApp.navigate('attendantschedule',true);
    },

    navigateToProgrammerSchedule : function() {
      //Clear the interval that is setup from the myhours tab to keep track of the
      //current time on the client side. If it isn't canceled, it will continue to throw
      //errors when navigating to a different page.
      clearInterval(EmployeeApp.EmployeeTab.minuteTimer);
      //Do the navigate
      EmployeeApp.navigate('programmerschedule',true);
    },

    navigateToTimesheet : function() {
      //Clear the interval that is setup from the myhours tab to keep track of the
      //current time on the client side. If it isn't canceled, it will continue to throw
      //errors when navigating to a different page.
      clearInterval(EmployeeApp.EmployeeTab.minuteTimer);
      //Do the navigate
      EmployeeApp.navigate('timesheet',true);
    },

    navigateToShiftManager : function() {
      //Clear the interval that is setup from the myhours tab to keep track of the
      //current time on the client side. If it isn't canceled, it will continue to throw
      //errors when navigating to a different page.
      clearInterval(EmployeeApp.EmployeeTab.minuteTimer);
      //Do the navigate
      EmployeeApp.navigate('shiftmanager',true);
    }
    
  });
});