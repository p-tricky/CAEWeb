EmployeeApp.module('EmployeeTab', function (EmployeeTab, App, Backbone, Marionette, $, _) {
  EmployeeTab.EmployeeController = {

    getViewableTabs : function() {
      return new Backbone.Collection([
        new Backbone.Model({id:'0',tab:'myhours', name:'My Hours'}),
        new Backbone.Model({id:'1', tab:'adminschedule', name:'Admin Schedule'}),
        new Backbone.Model({id:'2', tab:'attendentschedule', name:'Attendent Schedule'}),
        new Backbone.Model({id:'3', tab:'programmerschedule', name:'Programmer Schedule'}),
        new Backbone.Model({id:'4', tab:'timesheet', name:'Timesheet'}),
        new Backbone.Model({id:'5', tab:'management', name:'Management'})
      ]);
    }
    
  };
});