EmployeeApp.addRegions({
  tabArea: '#tabsDiv'
});

EmployeeApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

EmployeeApp.EmployeeAppController = {
  _showBaseView : function() {
    EmployeeApp.tabDiv = new EmployeeApp.EmployeeTab.EmployeeTabView({'tabName':'employeeTab'});
    EmployeeApp.tabArea.show(EmployeeApp.tabDiv);
  },

  _showViewableTabs : function() {
    if (typeof(EmployeeApp.tabRow) === 'undefined') {
      EmployeeApp.tabsCollection = EmployeeApp.EmployeeTab.EmployeeController.getViewableTabs();
      EmployeeApp.tabRow = new EmployeeApp.EmployeeTab.TabsItemView({collection:EmployeeApp.tabsCollection});
      EmployeeApp.tabDiv.tabsList.show(EmployeeApp.tabRow);
    } else {
      EmployeeApp.tabDiv.tabsList.show(EmployeeApp.tabRow);
    }
  },

  myhours : function() {
    this._showBaseView();
    this._showViewableTabs();
    $('#myhours').addClass('selectedTab');
  },

  adminschedule : function() {
    this._showBaseView();
    this._showViewableTabs();
    $('#adminschedule').addClass('selectedTab');

  },

  attendentschedule : function() {
    this._showBaseView();
    this._showViewableTabs();
    $('#attendentschedule').addClass('selectedTab');
  },

  programmerschedule : function() {
    this._showBaseView();
    this._showViewableTabs();
    $('#programmerschedule').addClass('selectedTab');
  },

  timesheet : function() {
    this._showBaseView();
    this._showViewableTabs();
    $('#timesheet').addClass('selectedTab');

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