//Define the region where the tabs will go.
EmployeeApp.addRegions({
  tabArea: '#tabsDiv',
});

//Define the main controller to be used with the router listed below.
EmployeeApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

//Define the main controller to be used with the router listed below.
EmployeeApp.EmployeeAppController = {

  //function to be called when the myhours route is in the url
  myhours : function() {
    //Call the function that will create the main layout, and display it.
    EmployeeApp.EmployeeTab.EmployeeController._showBaseView();
    //Call the function that will get the list of viewable tabs based on user permission, and display them.
    EmployeeApp.EmployeeTab.EmployeeController._showViewableTabs(function() {
      //Once the tabs are displayed run this callback function to set the selected tab
      $('#myhours').addClass('selectedTab');
    });

    EmployeeApp.myHoursContent = new EmployeeApp.MyHoursTab.MyHoursView();
    
    EmployeeApp.tabDiv.tabContent.show(EmployeeApp.myHoursContent);

    EmployeeApp.EmployeeTab.EmployeeController._getUserPermissions(EmployeeApp.EmployeeTab.EmployeeController._showMyHoursTab);
  },

  //function to be called when the adminschedule route is in the url
  adminschedule : function() {
    //Call the function that will create the main layout, and display it.
    EmployeeApp.EmployeeTab.EmployeeController._showBaseView();
    //Call the function that will get the list of viewable tabs based on user permission, and display them.
    EmployeeApp.EmployeeTab.EmployeeController._showViewableTabs(function() {
      //Once the tabs are displayed run this callback function to set the selected tab
      $('#adminschedule').addClass('selectedTab');
    });
    //Get the users permissions and then kick off the tab logic with the passed in callback.
    EmployeeApp.EmployeeTab.EmployeeController._getUserPermissions(EmployeeApp.EmployeeTab.EmployeeController._showAdminSchedule);
  },

  //function to be called when the attendentschedule route is in the url
  attendantschedule : function() {
    //Call the function that will create the main layout, and display it.
    EmployeeApp.EmployeeTab.EmployeeController._showBaseView();
    //Call the function that will get the list of viewable tabs based on user permission, and display them.
    EmployeeApp.EmployeeTab.EmployeeController._showViewableTabs(function() {
      //Once the tabs are displayed run this callback function to set the selected tab
      $('#attendantschedule').addClass('selectedTab');
    });
    //Get the users permissions and then kick off the tab logic with the passed in callback.
    EmployeeApp.EmployeeTab.EmployeeController._getUserPermissions(EmployeeApp.EmployeeTab.EmployeeController._showAttendantSchedule);
  },

  //function to be called when the programmerschedule route is in the url
  programmerschedule : function() {
    //Call the function that will create the main layout, and display it.
    EmployeeApp.EmployeeTab.EmployeeController._showBaseView();
    //Call the function that will get the list of viewable tabs based on user permission, and display them.
    EmployeeApp.EmployeeTab.EmployeeController._showViewableTabs(function() {
      //Once the tabs are displayed run this callback function to set the selected tab
      $('#programmerschedule').addClass('selectedTab');
    });
    //Get the users permissions and then kick off the tab logic with the passed in callback.
    EmployeeApp.EmployeeTab.EmployeeController._getUserPermissions(EmployeeApp.EmployeeTab.EmployeeController._showProgrammerSchedule);
  },

  //****  in progress  ***** 


  //function to be called when the timesheet route is in the url
  timesheet : function() {
    //Call the function that will create the main layout, and display it.
    EmployeeApp.EmployeeTab.EmployeeController._showBaseView();
    //Call the function that will get the list of viewable tabs based on user permission, and display them.
    EmployeeApp.EmployeeTab.EmployeeController._showViewableTabs(function() {
      //Once the tabs are displayed run this callback function to set the selected tab
      $('#timesheet').addClass('selectedTab');
    });
    //Get the users permissions and then kick off the tab logic with the passed in callback.
    EmployeeApp.EmployeeTab.EmployeeController._getUserPermissions(EmployeeApp.EmployeeTab.EmployeeController._showTimesheet);
  }
};

//Define the router that will listen to the URL, and call the correct associated function
EmployeeApp.Router = new Marionette.AppRouter({
  controller:EmployeeApp.EmployeeAppController,
  appRoutes: {
    "myhours" : "myhours",
    "adminschedule" : "adminschedule",
    "attendantschedule" : "attendantschedule",
    "programmerschedule" : "programmerschedule",
    "timesheet" : "timesheet",
  }
});

//Setup the things that need to start when the App is started. This includes getting inital templates, and starting the history.
EmployeeApp.on('initialize:after', function() {
  //load any initial templates that may need to be loaded.
  tpl.loadTemplates(['employeeTab'], function() {
    //start the backbone history
    var result = Backbone.history.start({pushState: true, root: "/caeweb/employee/"});
  });
});

//Start the Marionette app. This will cause the initalize defined above to run, and the router to start lisening to the URLs
EmployeeApp.start();