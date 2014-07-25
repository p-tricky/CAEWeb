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
      'click .timesheet':'navigateToTimesheet'
    },
    
    //List of functions associated with the events. All of them do an navigate to somewhere else.
    navigateToMyHours : function() {
      EmployeeApp.navigate('myhours',true);
    },

    navigateToAdminSchedule : function() {
      EmployeeApp.navigate('adminschedule',true);
    },

    navigateToAttendentSchedule : function() {
      EmployeeApp.navigate('attendantschedule',true);
    },

    navigateToProgrammerSchedule : function() {
      EmployeeApp.navigate('programmerschedule',true);
    },

    navigateToTimesheet : function() {
      EmployeeApp.navigate('timesheet',true);
    }
    
  });
});