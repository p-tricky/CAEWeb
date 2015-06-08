//This is the view that is used to hold the other views on the page. Its the overall container
EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.ShiftManagerView = Backbone.Marionette.Layout.extend({

    //sets the options and loads the template
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('shiftManager/shiftManager'));
    },

    //defines the regions on the page
    regions: {
        shiftFilterSection: '#shiftFilterSection',
        shiftListSection: '#shiftListSection',
        shiftSearchSection: '#shiftSearchSection',
        newShiftSection: '#newShiftSection',
    },

    //gives the view an id tag for css
    id:'shiftManagerContent',
    
  });
});
