EmployeeApp.addRegions({
  tabArea: '#tabsDiv'
});

EmployeeApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

EmployeeApp.EmployeeAppController = {

  myhours : function() {
    EmployeeApp.EmployeeTab.EmployeeController._showBaseView();
    EmployeeApp.EmployeeTab.EmployeeController._showViewableTabs(function() {
      $('#myhours').addClass('selectedTab');
    });
    EmployeeApp.EmployeeTab.EmployeeController._getUserPermissions();
  },

  adminschedule : function() {
    EmployeeApp.EmployeeTab.EmployeeController._showBaseView();
    EmployeeApp.EmployeeTab.EmployeeController._showViewableTabs(function() {
      $('#adminschedule').addClass('selectedTab');
    });
    EmployeeApp.EmployeeTab.EmployeeController._getUserPermissions(EmployeeApp.EmployeeTab.EmployeeController._showAdminSchedule);
  },

  attendentschedule : function() {
    EmployeeApp.EmployeeTab.EmployeeController._showBaseView();
    EmployeeApp.EmployeeTab.EmployeeController._showViewableTabs(function() {
      $('#attendentschedule').addClass('selectedTab');
    });
    EmployeeApp.EmployeeTab.EmployeeController._getUserPermissions(EmployeeApp.EmployeeTab.EmployeeController._showAttendentSchedule);
  },

  programmerschedule : function() {
    EmployeeApp.EmployeeTab.EmployeeController._showBaseView();
    EmployeeApp.EmployeeTab.EmployeeController._showViewableTabs(function() {
      $('#programmerschedule').addClass('selectedTab');
    });
    EmployeeApp.EmployeeTab.EmployeeController._getUserPermissions();
  },

  timesheet : function() {
    EmployeeApp.EmployeeTab.EmployeeController._showBaseView();
    EmployeeApp.EmployeeTab.EmployeeController._showViewableTabs(function() {
      $('#timesheet').addClass('selectedTab');
    });
    EmployeeApp.EmployeeTab.EmployeeController._getUserPermissions();
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
  tpl.loadTemplates(['employeeTab'], function() {

    //start the backbone history
    var result = Backbone.history.start({pushState: true, root: "/caeweb/employee/"});//, silent:true});
  });
});

EmployeeApp.start();