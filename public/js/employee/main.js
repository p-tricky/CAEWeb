EmployeeApp.addRegions({
  tabArea: '#tabsDiv'
});

EmployeeApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

EmployeeApp.EmployeeAppController = {
  myhours : function() {
    //EmployeeApp.tabDiv = new EmployeeApp.EmployeeTab.EmployeeTabView({'tabName':'myhoursTab'});
    //EmployeeApp.tabArea.show(EmployeeApp.tabDiv);
    EmployeeApp.tabDiv = new EmployeeApp.EmployeeTab.EmployeeTabView({'tabName':'employeeTab'});
    EmployeeApp.tabArea.show(EmployeeApp.tabDiv);
    EmployeeApp.tabsCollection = EmployeeApp.EmployeeTab.EmployeeController.getViewableTabs();
    EmployeeApp.tabRow = new EmployeeApp.EmployeeTab.TabsItemView({collection:EmployeeApp.tabsCollection});
    EmployeeApp.tabDiv.tabsList.show(EmployeeApp.tabRow);
    $('#myhours').addClass('selectedTab');
  },

  adminschedule : function() {
    EmployeeApp.tabDiv= new EmployeeApp.EmployeeTab.EmployeeTabView({'tabName':'scheduleTab'});
    EmployeeApp.tabArea.show(EmployeeApp.tabDiv);

  },

  attendentschedule : function() {

  },

  programmerschedule : function() {

  },

  timesheet : function() {
    EmployeeApp.tabDiv = new EmployeeApp.EmployeeTab.EmployeeTabView({'tabName':'timesheetTab'});
    EmployeeApp.tabArea.show(EmployeeApp.tabDiv);

  }
};

EmployeeApp.Router = new Marionette.AppRouter({
  controller:EmployeeApp.EmployeeAppController,
  appRoutes: {
    "myhours" : "myhours",
    "adminschedule" : "adminschedule",
    "attendentschedule" : "attendentschedule",
    "programmerschedule" : "programmerschedule",
    "timesheet" : "timesheet",
  }
});

EmployeeApp.on('initialize:after', function() {
  tpl.loadTemplates(['myhoursTab','scheduleTab','timesheetTab','managementTab','employeeTab'], function() {

    //start the backbone history
    var result = Backbone.history.start({pushState: true, root: "/caeweb/employee/"});//, silent:true});
  });
});

EmployeeApp.start();