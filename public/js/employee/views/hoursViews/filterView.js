EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.FilterView = Backbone.Marionette.ItemView.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    events:
    {},

    applyFilter : function() {
        
    },

    clearFilter : function() {
        
    }

  });
});