//Define a module for all of the view log functions to live in.
InventoryApp.module('ViewLogTab', function (ViewLogTab, App, Backbone, Marionette, $, _) {
  
  //Define a controller to hold all of the view log functions.
  ViewLogTab.ViewLogController = {

    //Function to check and see if the log collection is already in memory. If it is, simply call the callback.
    //If it is not in memory for some reason, create the collection, and fetch it.
    getLog : function(callback) {
      //This log should always already be created since it is called in the main.js in the initalize of the
      //entire app. However, in case it somehow does not exist, this will do a check and refetch it if
      //it is neccsary or missing. Near 100% of the time it will fail the if, and simply call the callback.
      if (typeof ViewLogTab.logCollection === "undefined") { //if collection does not exist, create and fetch it.
        console.log('Getting Log Data');
        //create a log collection
        ViewLogTab.currentLog = new InventoryApp.ViewLogTab.LogCollection();
        //fetch the log collection, and call the callback on success
        ViewLogTab.currentLog.fetch({success : callback});
      } else {
        //Already have the collection. Just call the callback.
        callback();
      }
    },

    //Function to show the log composite view once the log collection has been fetched.
    showLog : function() {
      //Create a new composite view, and pass it the log collection. Also pass it the template to use.
      var tabContentDiv = new ViewLogTab.ViewLogCompositeView({collection: ViewLogTab.logCollection,'contentName':'viewLog/logTable'});
      //show the log composite view.
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    //Function to log any transaction that occurs within the inventory app. Since this is a public function
    //it can be accessed from any other part of the inventory app that may need to log a transaction.
    logTransaction : function(message,model) {
      //define a return value of false
      var returnValue = false;
      //set the return value to the success or failure of creating a new log entry.
      //Use the functions passed in message, and model to send parameters to the collection create.
      returnValue = InventoryApp.ViewLogTab.logCollection.create(new ViewLogTab.LogModel({
        itemname : model.get('name'),
        action : message
      }), {
        //On success return true.
        success: function() {
          return true;
        },
        //On error send an alert to the user, and return false.
        error : function() {
          alert('Error in adding transaction to the log');
          return false;
        },
        //tell the app to wait for a response from the server before continuing.
        wait : true
      });
      //Return the returnvalue that will be either true or false depending on success or error.
      return returnValue;
    }
  };
});