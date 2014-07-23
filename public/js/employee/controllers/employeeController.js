EmployeeApp.module('EmployeeTab', function (EmployeeTab, App, Backbone, Marionette, $, _) {
  EmployeeTab.EmployeeController = {

    _showBaseView : function() {
      EmployeeApp.tabDiv = new EmployeeApp.EmployeeTab.EmployeeTabView({'tabName':'employeeTab'});
      EmployeeApp.tabArea.show(EmployeeApp.tabDiv);
    },

    _showViewableTabs : function(callback) {
      if (typeof(EmployeeApp.tabRow) === 'undefined') {
        EmployeeApp.tabsCollection = new EmployeeApp.EmployeeTab.ViewableTabCollection();
        EmployeeApp.tabsCollection.fetch({callback: callback, success : function() {
          EmployeeApp.tabRow = new EmployeeApp.EmployeeTab.TabsItemView({collection:EmployeeApp.tabsCollection});
          EmployeeApp.tabDiv.tabsList.show(EmployeeApp.tabRow);
          callback();
        }});
      } else {
        EmployeeApp.tabDiv.tabsList.show(EmployeeApp.tabRow);
        callback();
      }
    },

    _getUserPermissions : function(callback) {
      if (typeof(EmployeeApp.currentUser === 'undefined')) {
        EmployeeApp.currentUser = new EmployeeApp.EmployeeTab.UserPermissionModel();
        EmployeeApp.currentUser.fetch({success : callback});
      } else {
        callback();
      }
    },

    _showAdminSchedule : function() {
      if (EmployeeApp.currentUser.get('acc_crud_schedule') === '1') {
        App.AdminScheduleTab.AdminScheduleController.getAdminScheduleInfo(App.AdminScheduleTab.AdminScheduleController.showAdminScheduleInfo, true);
      } else {
        App.AdminScheduleTab.AdminScheduleController.getAdminScheduleInfo(App.AdminScheduleTab.AdminScheduleController.showAdminScheduleInfo, false);
      }
    },

    _showAttendantSchedule : function() {
      if (EmployeeApp.currentUser.get('acc_crud_schedule') === '1') {
        App.AttendantScheduleTab.AttendantScheduleController.getAttendantScheduleInfo(App.AttendantScheduleTab.AttendantScheduleController.showAttendantScheduleInfo, true);
      } else {
        App.AttendantScheduleTab.AttendantScheduleController.getAttendantScheduleInfo(App.AttendantScheduleTab.AttendantScheduleController.showAttendantScheduleInfo, false);
      }
    },

    _showProgrammerSchedule : function() {
      if (EmployeeApp.currentUser.get('acc_crud_schedule') === '1') {
        App.ProgrammerScheduleTab.ProgrammerScheduleController.getProgrammerScheduleInfo(App.ProgrammerScheduleTab.ProgrammerScheduleController.showProgrammerScheduleInfo, true);
      } else {
        App.ProgrammerScheduleTab.ProgrammerScheduleController.getProgrammerScheduleInfo(App.ProgrammerScheduleTab.ProgrammerScheduleController.showProgrammerScheduleInfo, false);
      }
    }
    
  };
});