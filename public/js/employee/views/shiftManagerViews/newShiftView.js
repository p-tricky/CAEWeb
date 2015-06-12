EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.NewShiftView = Backbone.Marionette.ItemView.extend({

  	initialize : function(options) {
    	this.options = options || {};
        this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //when a user clicks the search button
    events : 
    {
    	'click #newShift' : 'createNew',
    },

    createNew: function() {
      EmployeeApp.ShiftManagerTab.ShiftManagerController.showNewShiftModal(newShift);
    }

  });
});
