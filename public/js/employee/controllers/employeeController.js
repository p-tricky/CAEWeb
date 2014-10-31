//Define the module EmployeeTab for all functions that apply to all tabs. Tab specific ones will be namespaced to thier specific tab.
EmployeeApp.module('EmployeeTab', function (EmployeeTab, App, Backbone, Marionette, $, _) {

  //Define a controller to hold all of the functions for this module.
  EmployeeTab.EmployeeController = {

    //function to create the main layout, and display it in the tabArea.
    _showBaseView : function() {
      EmployeeApp.tabDiv = new EmployeeApp.EmployeeTab.EmployeeTabView({'tabName':'employeeTab'});
      EmployeeApp.tabArea.show(EmployeeApp.tabDiv);
    },

    //function to create a viewable tabs collection. Fetch the viewable tabs based on user permissions
    //and then display the tabs in the tabs section of the layout.
    _showViewableTabs : function(callback) {
      //If we don't already have the tab list
      if (typeof(EmployeeApp.tabRow) === 'undefined') {
        //Make a new tab list collection
        EmployeeApp.tabsCollection = new EmployeeApp.EmployeeTab.ViewableTabCollection();
        //fetch the data for the new tabs collection. Pass it a callback function, and the anonymous function to call on success
        EmployeeApp.tabsCollection.fetch({callback: callback, success : function() {
          //create a new tabsItemView with the collection of tabs
          EmployeeApp.tabRow = new EmployeeApp.EmployeeTab.TabsItemView({collection:EmployeeApp.tabsCollection});
          //show the tabs view
          EmployeeApp.tabDiv.tabsList.show(EmployeeApp.tabRow);
          //call the passed in callback. *There may be a better way to do this that is less confusing.
          callback();
        }});
      } else { //Already have the tabs collection, and view. No need to fetch again.
        //show the tabs view, and call the callback
        EmployeeApp.tabDiv.tabsList.show(EmployeeApp.tabRow);
        callback();
      }
    },

    //function to create a new user model, and fetch thier permissions
    _getUserPermissions : function(callback) {
      //if we don't have the user model yet.
      if (typeof(EmployeeApp.currentUser === 'undefined')) {
        //create a new user model
        EmployeeApp.currentUser = new EmployeeApp.EmployeeTab.UserPermissionModel();
        //fetch the user model from the server, and on success call the callback
        EmployeeApp.currentUser.fetch({success : callback});
      } else { //already have the the current user. Just call the callback.
        callback();
      }
    },

    _showMyHoursTab : function() {
      EmployeeApp.MyHoursTab.MyHoursController.getIndexShifts(EmployeeApp.MyHoursTab.MyHoursController.showPageContent);
    },

    //function to determine which version of the admin schedule to show based on user permission, and then show it.
    _showAdminSchedule : function() {
      //if user has crud capability on schedule, pass true as the second parameter to getAdminScheduleInfo, else pass false.
      if (EmployeeApp.currentUser.get('acc_crud_schedule') === '1') {
        App.AdminScheduleTab.AdminScheduleController.getAdminScheduleInfo(App.AdminScheduleTab.AdminScheduleController.showAdminScheduleInfo, true);
      } else {
        App.AdminScheduleTab.AdminScheduleController.getAdminScheduleInfo(App.AdminScheduleTab.AdminScheduleController.showAdminScheduleInfo, false);
      }
    },

    //function to determine which version of the attendant schedule to show based on user permission, and then show it.
    _showAttendantSchedule : function() {
      //if user has crud capability on schedule, pass true as the second parameter to getAdminScheduleInfo, else pass false.
      if (EmployeeApp.currentUser.get('acc_crud_schedule') === '1') {
        App.AttendantScheduleTab.AttendantScheduleController.getAttendantScheduleInfo(App.AttendantScheduleTab.AttendantScheduleController.showAttendantScheduleInfo, true);
      } else {
        App.AttendantScheduleTab.AttendantScheduleController.getAttendantScheduleInfo(App.AttendantScheduleTab.AttendantScheduleController.showAttendantScheduleInfo, false);
      }
    },

    //function to determine which version of the programmer schedule to show based on user permission, and then show it.
    _showProgrammerSchedule : function() {
      //if user has crud capability on schedule, pass true as the second parameter to getAdminScheduleInfo, else pass false.
      if (EmployeeApp.currentUser.get('acc_crud_schedule') === '1') {
        App.ProgrammerScheduleTab.ProgrammerScheduleController.getProgrammerScheduleInfo(App.ProgrammerScheduleTab.ProgrammerScheduleController.showProgrammerScheduleInfo, true);
      } else {
        App.ProgrammerScheduleTab.ProgrammerScheduleController.getProgrammerScheduleInfo(App.ProgrammerScheduleTab.ProgrammerScheduleController.showProgrammerScheduleInfo, false);
      }
    }
    
  };
});