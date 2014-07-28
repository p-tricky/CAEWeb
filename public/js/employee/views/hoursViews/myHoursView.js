EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.MyHoursView = Backbone.Marionette.Layout.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('myHours/myHours'));
    },

    regions: {
        clockInOutSection: '#clockInOutSection',
        filterSection: '#filterSection',
        shiftListSection: '#shiftListSection'
    },

    id:'myHoursContent',
    
  });
});