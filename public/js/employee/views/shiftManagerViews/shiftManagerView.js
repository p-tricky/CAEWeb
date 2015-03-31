EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.ShiftManagerView = Backbone.Marionette.Layout.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('shiftManager/shiftManager'));
    },

    regions: {
        shiftFilterSection: '#shiftFilterSection',
        shiftListSection: '#shiftListSection'
    },

    id:'allHoursContent',
    
  });
});