//this is the view that is used to show the clockin and clockout buttons and the clocked-in time 
EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.ClockInOutView = Backbone.Marionette.ItemView.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //defines the events that are called when a button is clicked
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