EmployeeApp.module('EmployeeTab', function (EmployeeTab, App, Backbone, Marionette, $, _) {
  EmployeeTab.EmployeeTabView = Backbone.Marionette.Layout.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    regions: {
      tabsList:'#tabsRow',
      tabContent: '#tabsContent',
      modalArea: '#modalBox'
    },

    id:'innerTabsDiv',
    
    events : {
      'click .myhours' : 'navigateToMyHours',
      'click .adminschedule':'navigateToAdminSchedule',
      'click .attendentschedule':'navigateToAttendentSchedule',
      'click .programmerschedule':'navigateToProgrammerSchedule',
      'click .timesheet':'navigateToTimesheet'
    },
    
    navigateToMyHours : function() {
      EmployeeApp.navigate('myhours',true);
    },

    navigateToAdminSchedule : function() {
      EmployeeApp.navigate('adminschedule',true);
    },

    navigateToAttendentSchedule : function() {
      EmployeeApp.navigate('attendentschedule',true);
    },

    navigateToProgrammerSchedule : function() {
      EmployeeApp.navigate('programmerschedule',true);
    },

    navigateToTimesheet : function() {
      EmployeeApp.navigate('timesheet',true);
    }
    
  });
});