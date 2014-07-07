EmployeeApp.module('ProgrammerScheduleTab', function (ProgrammerScheduleTab, App, Backbone, Marionette, $, _) {
  ProgrammerScheduleTab.EmployeeSelectSectionItemView = Backbone.Marionette.ItemView.extend({

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
        ProgrammerScheduleTab.employeeFilter.push(this.model.get('id'));
      } else {
        $(this.el).css('background-color', 'lightgray');
        var empIndex = ProgrammerScheduleTab.employeeFilter.indexOf(this.model.get('id'));
        ProgrammerScheduleTab.employeeFilter.splice(empIndex,1);
      }

      var scheduler = $("#scheduleSection").data("kendoScheduler");

      scheduler.dataSource.filter({
        operator: function(shift) {
          return $.inArray(shift.employee, ProgrammerScheduleTab.employeeFilter) >= 0;
        }
      });
      scheduler.resources[1].dataSource.filter({
        operator: function(employee) {
          return $.inArray(employee.value.toString(), ProgrammerScheduleTab.employeeFilter) >= 0;
        }
      });
      scheduler.view(scheduler.view().name);
    }
    
  });
});