//This is the view that is used for the shift filter section of the tab
SysAdminApp.module('OpenCloseChecklistTab', function (OpenCloseChecklistTab, App, Backbone, Marionette, $, _) {
  OpenCloseChecklistTab.OpenCloseChecklistFilterView = Backbone.Marionette.ItemView.extend({

    //sets the options and loads the template
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //defines the listener for the apply filter button
    events:
    {
      
    },


  });
});