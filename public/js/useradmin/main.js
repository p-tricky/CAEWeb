UserAdminApp.addRegions({
  tabArea: '#tabsDiv'
});

UserAdminApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

UserAdminApp.UserAdminAppController = {
  userlist : function() {
    setTimeout(function() { //uncommenting this line fixes issue where userlist doesn't render when cache is disabled
    UserAdminApp.tabDiv = new UserAdminApp.UserListTab.UserListTabView({'tabName':'userlistTab'});
    UserAdminApp.UserListTab.UserListTabController.getUserList(UserAdminApp.UserListTab.UserListTabController.showUserTable);
    UserAdminApp.tabArea.show(UserAdminApp.tabDiv);
    }, 300);
  }
};

UserAdminApp.Router = new Marionette.AppRouter({
  controller:UserAdminApp.UserAdminAppController,
  appRoutes: {
    "userlist" : "userlist",
  }
});

UserAdminApp.on('initialize:after', function() {
  tpl.loadTemplates(['userlistTab'], function() {

    //start the backbone history
    var result = Backbone.history.start({pushState: true, root: "/caeweb/useradmin/"});//, silent:true});
  });
});

UserAdminApp.start();
