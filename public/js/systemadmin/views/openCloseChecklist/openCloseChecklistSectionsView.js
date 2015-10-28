//This is the default view for the tab
SysAdminApp.module('OpenCloseChecklistTab', function (OpenCloseChecklistTab, App, Backbone, Marionette, $, _) {
  OpenCloseChecklistTab.OpenCloseChecklistSectionsView = Backbone.Marionette.Layout.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //defines the regions that will hold other views
    regions: {
        checklistFilterSection: '#checklistFilterSection',
        checklistTableSection: '#checklistTableSection'
    },

    id:'checklistContent',
    
  });
});