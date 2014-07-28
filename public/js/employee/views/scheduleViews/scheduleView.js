//Define the module for the AdminScheduleTab logic to live in. Note:this view is used by all views even though it is namespaced to admin.
EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  //Define a layout to be used to split the content area into a employee select section, and a schedule section.
  AdminScheduleTab.ScheduleView = Backbone.Marionette.Layout.extend({

    //Get any options, and define the template to use.
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('schedule/scheduleView'));
    },

    //Define the two regions for content
    regions: {
        employeeSelectSection: '#employeeSelectSection',
        scheduleSection: '#scheduleSection'
    },

    //Give this div for this view an id
    id:'innerTabsContentDiv'
  });
});