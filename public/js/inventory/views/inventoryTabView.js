//Define module for the inventory tab to live in.
InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  //Define a new layout for the tabs, tabs content, and modal box
  InventoryTab.InventoryView = Backbone.Marionette.Layout.extend({

    //On Instanciation, this initialize function will be called
    initialize : function(options) {
      //fetch any options that are passed out of the options object. This includes the template
      this.options = options || {};
      //use tpl to get the template specified in options and then pass it to handlebars
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //Define regions of the template that can be popluated later.
    regions: {
        tabContent: '#tabsContent',
        modalArea: '#modalBox'
    },

    //Define the id for this view, which is a DIV by default.
    id:'innerTabsDiv',
    
    //Define events for the view. All of the events are click events on the tabs
    //The second parameter is the function to call when the first part is clicked
    events : {
      'click .currentinventory' : 'navigateToCurrentInventory',
      'click .vieworders':'navigateToViewOrders',
      'click .placeorder':'navigateToPlaceOrders',
      'click .viewlog':'navigateToViewLog'
    },
    
    //All of the functions associated with the events.
    navigateToCurrentInventory : function() {
      //When the event fires this function, it will navigate the app to the specified uri
      InventoryApp.navigate('currentinventory',true);
    },

    navigateToViewOrders : function() {
      InventoryApp.navigate('vieworders',true);
    },

    navigateToPlaceOrders : function() {
      InventoryApp.navigate('placeorder',true);
    },

    navigateToViewLog : function() {
      InventoryApp.navigate('viewlog',true);
    }
  });
});