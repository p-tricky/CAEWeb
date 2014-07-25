//Define the module for the AdminScheduleTab logic to live in
EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  //Define ItemView to be used in conjunction with the employeeSelectSectionCollectionView in the admin folder
  AdminScheduleTab.EmployeeSelectSectionItemView = Backbone.Marionette.ItemView.extend({

    //Define the template to use. Bind the model change event to a rerender of this view
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('schedule/_employeeSelectBox'));
      this.model.bind('change', this.render, this);
    },

    //give this div element a id
    id:'employeeSelectBox',

    //give this div element a class
    className:'employeeSelectBox',

    //Set the background color of the div to the schedule color of the model (employee)
    attributes : function(){
      return {
        style : 'background-color:' + this.model.get('schedule_color') + ';'
      };
    },

    //Define a click event that will call the toggleEmployee function
    events: {
      'click' : 'toggleEmployee'
    },

    //Function to toggle the color of the div, and remove / add the employee from the schedule.
    toggleEmployee: function() {
      //If the color is grey
      if ($(this.el).css('background-color') === 'rgb(211, 211, 211)') {
        //set the color to the employess schedule color
        $(this.el).css('background-color', this.model.get('schedule_color'));
        //Add the employee id to the employeeFilter
        AdminScheduleTab.employeeFilter.push(this.model.get('id'));
      } else { //color is schedule color
        //set the color to lightgray, or rgb(211,211,211)
        $(this.el).css('background-color', 'lightgray');
        //Remove the employee id from the employeeFilter
        var empIndex = AdminScheduleTab.employeeFilter.indexOf(this.model.get('id'));
        AdminScheduleTab.employeeFilter.splice(empIndex,1);
      }

      //Use jQuery to get the scheduer
      var scheduler = $("#scheduleSection").data("kendoScheduler");

      //Access the second resource for the scheduler (employee) and apply the filter
      scheduler.resources[1].dataSource.filter({
        operator: function(employee) {
          return $.inArray(employee.value.toString(), AdminScheduleTab.employeeFilter) >= 0;
        }
      });

      //re-render the schduler with the applied filter.
      scheduler.view(scheduler.view().name);
    }
    
  });
});