EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  AdminScheduleTab.ScheduleView = Backbone.Marionette.Layout.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('schedule/scheduleView'));
    },

    regions: {
        employeeSelectSection: '#employeeSelectSection',
        scheduleSection: '#scheduleSection'
    },

    id:'innerTabsContentDiv'
  });
});