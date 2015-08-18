//Define the region where the tabs will go.
AssetMgmtApp.addRegions({
  tabArea: '#tabsDiv'
});

//Define a method that can be used to navigate the app to a particular URL.
AssetMgmtApp.navigate = function(route,  options){
  Backbone.history.navigate(route, options);
};

//Define the main controller to be used with the router listed below.
AssetMgmtApp.AssetMgmtAppController = {
    //function to be called when the currentinventory route is in the url
    assetslist : function() {
      //Create a new tab view passing the VirusTrackerTab tab as the tabname.
      AssetMgmtApp.tabDiv = new AssetMgmtApp.AssetListTab.AssetListView({'tabName':'assetListTab'});
      AssetMgmtApp.tabArea.show(AssetMgmtApp.tabDiv); //show the tab
      //Call the function to get the virusTracker scans, and pass the show tracker table function as the callback to call on success.
      AssetMgmtApp.AssetListTab.AssetListController.getAssets(AssetMgmtApp.AssetListTab.AssetListController.showAssetsTable);
    }

};

//Define the router that will listen to the URL, and call the correct associated function.
AssetMgmtApp.Router = new Marionette.AppRouter({
  controller:AssetMgmtApp.AssetMgmtAppController,
  appRoutes:{
    "assetslist" : "assetslist",
  } 
});

//Setup the things that need to start when the App is started. This includes getting inital templates, and starting the history.
AssetMgmtApp.on('initialize:after', function() {
  //load any inital templates that may be needed.
  tpl.loadTemplates(['assetListTab'], function() {
    var result = Backbone.history.start({pushState: true, root: "/caeweb/assets/"});//, silent:true});
  });
});

//Start the Marionette app. This will cause the initalize defined above to run, and the router to start listening to the URLs.
AssetMgmtApp.start();
