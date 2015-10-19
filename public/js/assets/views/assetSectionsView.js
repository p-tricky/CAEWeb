//This is the default view for the tab
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  AssetListTab.AssetSectionsView = Backbone.Marionette.Layout.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //defines the regions that will hold other views
    regions: {
        assetFilterSection: '#assetFilterSection',
        assetListSection: '#assetListSection'
    },

    id:'assetsContent',
    
  });
});