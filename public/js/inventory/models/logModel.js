InventoryApp.module('ViewLogTab', function (ViewLogTab, App, Backbone, Marionette, $, _) {
  ViewLogTab.LogModel = Backbone.Model.extend({
    defaults : {
      'id' : null,
      'itemname' : '',
      'action' : ''
    },

    urlRoot : 'api/log',
    
  }); //End of Model

  ViewLogTab.LogCollection = Backbone.Collection.extend({
    model : ViewLogTab.LogModel,
    url : 'api/log',

    initialize: function() {
      //this.on('add',this.sortCollection,this);
    },

    comparator: function(log) {
     return -(Number(log.get('id')));
    }

  }); //End of Collection

}); //End of Module