//Define module for the view log tab to live in.
InventoryApp.module('ViewLogTab', function (ViewLogTab, App, Backbone, Marionette, $, _) {
  //Define a model for the logging of actions
  ViewLogTab.LogModel = Backbone.Model.extend({
    //defaults for newly created models
    defaults : {
      'id' : null,
      'itemname' : '',
      'action' : ''
    },

    //url to be used for persistance of the data
    urlRoot : 'api/log',
    
  }); //End of Model

  //Define a collection for the log entries based on the above model
  ViewLogTab.LogCollection = Backbone.Collection.extend({
    //Define which model to use for the collection
    model : ViewLogTab.LogModel,
    //url to use for persistance to server side
    url : 'api/log',

    //Define a comparator function to be used when the collection is sorted.
    comparator: function(log) {
     return -(Number(log.get('id')));
    }

  }); //End of Collection

}); //End of Module