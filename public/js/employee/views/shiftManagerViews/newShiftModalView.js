//This view appears when editting or adding a new shift
EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.NewShiftModalView = Backbone.Marionette.Layout.extend({

    //sets the options and loads the template
    initialize : function(options) {
      this.options = options || {};
      Handlebars.registerHelper('ifNewShift', function(block) {
        if (options.newShift) {
          return block.fn(this);
        } else {
          return block.inverse(this);
        }
      });
      this.template = Handlebars.compile(tpl.get('shiftManager/newShiftModalView'));
    },

    //defines the regions on the page
    regions: {
        userDropDownContent: '#userDropDownContainer',
        shiftContent: '#shiftModalContainer',
    },

    //gives the view an id tag for css
    id:'newShiftModalView',

  });
});
