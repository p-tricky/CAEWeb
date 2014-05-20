InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  InventoryTab.InventoryView = Backbone.Marionette.Layout.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    regions: {
        tabContent: '#tabsContent',
        modalArea: '#modalBox'
    },

    id:'innerTabsDiv',
    
    events : {
      'click .currentinventory' : 'navigateToCurrentInventory',
      'click .vieworders':'navigateToViewOrders',
      'click .placeorder':'navigateToPlaceOrders',
      'click .viewlog':'navigateToViewLog'
    },
    
    navigateToCurrentInventory : function() {
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