EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.ClockInOutView = Backbone.Marionette.ItemView.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    events:
    {
        'click #clockout': 'clockOut',
        'click #clockin': 'clockIn'
    },

    clockOut : function() {
        EmployeeApp.MyHoursTab.MyHoursController.clockOut();
    },

    clockIn : function() {
        EmployeeApp.MyHoursTab.MyHoursController.clockIn();
    }
  });
});