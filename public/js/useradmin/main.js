UserAdminApp.addRegions({
  tabArea: '#tabsDiv'
});

UserAdminApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

UserAdminApp.UserAdminAppController = {
  userlist : function() {

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