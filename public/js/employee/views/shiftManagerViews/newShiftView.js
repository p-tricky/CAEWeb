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
      var newShift = EmployeeApp.ShiftManagerTab.shiftList.create({shiftNum: ShiftManagerTab.shiftList.length_1},{wait:true});
      newShift.attributes.newShift = true;
      newShift.attributes.clockIn = newShift.yyyymmdd(new Date());
      newShift.attributes.clockOut = newShift.yyyymmdd(new Date());
      EmployeeApp.ShiftManagerTab.ShiftManagerController.showNewShift(newShift);
    }

  });
});
