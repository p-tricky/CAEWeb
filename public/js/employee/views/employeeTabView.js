EmployeeApp.module('EmployeeTab', function (EmployeeTab, App, Backbone, Marionette, $, _) {
  EmployeeTab.EmployeeTabView = Backbone.Marionette.Layout.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    regions: {
        
    },

    id:'innerTabsDiv',
    
    events : {
      'click .myhours' : 'navigateToMyHours',
      'click .schedule':'navigateToSchedule',
      'click .timesheet':'navigateToTimesheet',
      'click .management':'navigateToManagement'
    },
    
    navigateToMyHours : function() {
      EmployeeApp.navigate('myhours',true);
    },

    navigateToSchedule : function() {
      EmployeeApp.navigate('schedule',true);
    },

    navigateToTimesheet : function() {
      EmployeeApp.navigate('timesheet',true);
    },

    navigateToManagement : function() {
      EmployeeApp.navigate('management',true);
    }
  });
});