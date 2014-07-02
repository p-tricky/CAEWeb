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
        this.checked = this.model.get('id');
      } else {
        $(this.el).css('background-color', 'lightgray');
        this.checked = '';
      }

      var scheduler = $("#scheduleSection").data("kendoScheduler");
      console.log(scheduler);

      scheduler.dataSource.filter({
          operator: function(task) {
              return $.inArray(task.employee, this.checked) >= 0;
          }
      });
    }
    
  });
});