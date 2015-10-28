//Define module for the inventory tab to live in.
SysAdminApp.module('OpenCloseChecklistTab', function (OpenCloseChecklistTab, App, Backbone, Marionette, $, _) {
  //Define the Item Model to hold information about a item
  OpenCloseChecklistTab.OpenCloseChecklistModel = Backbone.Model.extend({
    //Define some defaults for new models that are created clientside
    defaults : {
      
    },

    //url for the model to use to persist data to the server side
    urlRoot : 'api/openclosechecklist',

  });

  //Define the collection for scans that is based on the above defined item model
  OpenCloseChecklistTab.OpenCloseChecklistCollection = Backbone.Collection.extend({
    //Define which model to use
    model : OpenCloseChecklistTab.ScanModel,
    //define url for persistance
    url : 'api/openclosechecklist'
  });
});