EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.ShiftFilterView = Backbone.Marionette.ItemView.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
      console.log('testing...')
      console.log(this.options.contentName);
    },

    events:
    {
        'click #applyFilter': 'applyFilter'
    },

    applyFilter : function() {
        var start = $('#datepicker1').val();
        var end = $('#datepicker2').val();
        EmployeeApp.MyHoursTab.MyHoursController.getShiftsInRange(start, end);
        
        console.log("Returned filtered shift list: ");
        console.log(EmployeeApp.MyHoursTab.shiftList);

        EmployeeApp.MyHoursTab.shiftList.reset();
    }

  });
});