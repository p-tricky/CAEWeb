//Define the region where the tabs will go.
SysAdminApp.addRegions({
  tabArea: '#tabsDiv'
});

//Define a method that can be used to navigate the app to a particular URL.
SysAdminApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

//Define the main controller to be used with the router listed below.
SysAdminApp.SysAdminAppController = {
    //function to be called when the currentinventory route is in the url
    virustracker : function() {
      //Create a new tab view passing the currentInventory tab as the tabname.
      SysAdminApp.tabDiv = new SysAdminApp.VirusTrackerTab.VirusTrackerView({'tabName':'VirusTrackerTab'});
      SysAdminApp.tabArea.show(SysAdminApp.tabDiv); //show the tab
      //Call the function to get the inventory, and pass the show inventory function as the callback to call on success.
      SysAdminApp.VirusTrackerTab.VirusTrackerController.getVirusTracker(SysAdminApp.VirusTrackerTab.VirusTrackerController.showVirusTrackerTable);
    },

};

//Define the router that will listen to the URL, and call the correct associated function.
SysAdminApp.Router = new Marionette.AppRouter({
  controller:SysAdminApp.SysAdminAppController,
  appRoutes:{
    "virustracker" : "virustracker",
  } 
});

//Setup the things that need to start when the App is started. This includes getting inital templates, and starting the history.
SysAdminApp.on('initialize:after', function() {
  //load any inital templates that may be needed.
  tpl.loadTemplates(['VirusTrackerTab'], function() {
    SysAdminApp.VirusTrackerTab.scanl
    var result = Backbone.history.start({pushState: true, root: "/caeweb/systemadmin/"});//, silent:true});
  });
});

//Start the Marionette app. This will cause the initalize defined above to run, and the router to start listening to the URLs.
SysAdminApp.start();
