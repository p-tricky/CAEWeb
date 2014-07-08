EmployeeApp.module('AttendantScheduleTab', function (AttendantScheduleTab, App, Backbone, Marionette, $, _) {
  AttendantScheduleTab.EmployeeSelectSectionItemView = Backbone.Marionette.ItemView.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('schedule/_employeeSelectBox'));
    },

    id:'employeeSelectBox',

    className:'employeeSelectBox',

    attributes : function(){
      return {
        style : 'background-color:' + this.model.get('schedule_color') + ';'
      };
    },

    events: {
      'click' : 'toggleEmployee'
    },

    toggleEmployee: function() {
      if ($(this.el).css('background-color') === 'rgb(211, 211, 211)') {
        $(this.el).css('background-color', this.model.get('schedule_color'));
        AttendantScheduleTab.employeeFilter.push(this.model.get('id'));
      } else {
        $(this.el).css('background-color', 'lightgray');
        var empIndex = AttendantScheduleTab.employeeFilter.indexOf(this.model.get('id'));
        AttendantScheduleTab.employeeFilter.splice(empIndex,1);
      }

      var scheduler = $("#scheduleSection").data("kendoScheduler");

      scheduler.resources[1].dataSource.filter({
        operator: function(employee) {
          return $.inArray(employee.value.toString(), AttendantScheduleTab.employeeFilter) >= 0;
        }
      });
      scheduler.view(scheduler.view().name);
    }
    
  });
});