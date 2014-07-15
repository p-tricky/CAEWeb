EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  AdminScheduleTab.EmployeeSelectSectionItemView = Backbone.Marionette.ItemView.extend({

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
        AdminScheduleTab.employeeFilter.push(this.model.get('id'));
      } else {
        $(this.el).css('background-color', 'lightgray');
        var empIndex = AdminScheduleTab.employeeFilter.indexOf(this.model.get('id'));
        AdminScheduleTab.employeeFilter.splice(empIndex,1);
      }

      var scheduler = $("#scheduleSection").data("kendoScheduler");

      scheduler.resources[1].dataSource.filter({
        operator: function(employee) {
          return $.inArray(employee.value.toString(), AdminScheduleTab.employeeFilter) >= 0;
        }
      });

      scheduler.view(scheduler.view().name);

    }
    
  });
});