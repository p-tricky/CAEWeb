EmployeeApp.addRegions({
  tabArea: '#tabsDiv'
});

EmployeeApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

EmployeeApp.EmployeeAppController = {
  myhours : function() {
    EmployeeApp.tabDiv = new EmployeeApp.EmployeeTab.EmployeeTabView({'tabName':'myhoursTab'});
    EmployeeApp.tabArea.show(EmployeeApp.tabDiv);

  },

  schedule : function() {
    EmployeeApp.tabDiv= new EmployeeApp.EmployeeTab.EmployeeTabView({'tabName':'scheduleTab'});
    EmployeeApp.tabArea.show(EmployeeApp.tabDiv);

  },

  timesheet : function() {
    EmployeeApp.tabDiv = new EmployeeApp.EmployeeTab.EmployeeTabView({'tabName':'timesheetTab'});
    EmployeeApp.tabArea.show(EmployeeApp.tabDiv);

  },

  management : function() {
    EmployeeApp.tabDiv = new EmployeeApp.EmployeeTab.EmployeeTabView({'tabName':'managementTab'});
    EmployeeApp.tabArea.show(EmployeeApp.tabDiv);

  }
};

EmployeeApp.Router = new Marionette.AppRouter({
  controller:EmployeeApp.EmployeeAppController,
  appRoutes: {
    "myhours" : "myhours",
    "schedule" : "schedule",
    "timesheet" : "timesheet",
    "management" : "management",
  }
});

EmployeeApp.on('initialize:after', function() {
  tpl.loadTemplates(['myhoursTab','scheduleTab','timesheetTab','managementTab'], function() {

    //start the backbone history
    var result = Backbone.history.start({pushState: true, root: "/caeweb/employee/"});//, silent:true});
  });
});

EmployeeApp.start();