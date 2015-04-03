//This is the default view for the tab
EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.MyHoursView = Backbone.Marionette.Layout.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('myHours/myHours'));
    },

    //defines the regions that will hold other views
    regions: {
        clockInOutSection: '#clockInOutSection',
        shiftFilterSection: '#shiftFilterSection',
        shiftListSection: '#shiftListSection'
    },

    id:'myHoursContent',
    
  });
});