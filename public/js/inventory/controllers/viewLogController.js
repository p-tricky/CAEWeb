InventoryApp.module('ViewLogTab', function (ViewLogTab, App, Backbone, Marionette, $, _) {
  
  ViewLogTab.ViewLogController = {

    getLog : function(callback) {
      if (typeof ViewLogTab.currentLog === "undefined") {
        console.log('Getting Log Data');
        ViewLogTab.currentLog = new InventoryApp.ViewLogTab.LogCollection();
        ViewLogTab.currentLog.fetch({success : callback});
      } else {
        callback();
      }
    },

    showLog : function() {
      var tabContentDiv = new ViewLogTab.ViewLogCompositeView({collection: ViewLogTab.logCollection,'contentName':'viewLog/logTable'});
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    logTransaction : function(message,model) {
      var returnValue = false;
      returnValue = InventoryApp.ViewLogTab.logCollection.create(new ViewLogTab.LogModel({
        itemname : model.get('name'),
        action : message
      }), {
        success: function() {
          return true;
        },
        error : function() {
          alert('Error in adding transaction to the log');
          return false;
        },
        wait : true
      });

      return returnValue;
    }
  };
});