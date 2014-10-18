//Define module for the inventory tab to live in.
InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  //Define the Item Model to hold information about a item
  InventoryTab.ItemModel = Backbone.Model.extend({
    //Define some defaults for new models that are created clientside
    defaults : {
      'id' : null,
      'name' : '',
      'quantity' : '0',
      'description' : '',
      'vendor_id' : '0',
      'vendor_name' : "",
      'email_threshold' : '0',
      'on_order_quantity' : "",
      'item_url' : '',
      'adjustmentQty':'0'
    },

    //url for the model to use to persist data to the server side
    urlRoot : 'api/items',

    //Function to setup some inital things for the model
    initialize : function() {
      //Define a variable called logTracker and set it to 0. Define a bool that will be used in conjucntion
      //This will be used to determine whether to log a transaction on the model or not.
      this.logTracker = 0;
      this.logTrackerBool = true;
      //If the model is invalid, alert the user that the model could not be saved.
      //TODO:Improve this error message. Use jQueryUI, or the modal box.
      this.on("invalid", function(model, error) {
        alert("Unable to save " + model.get("name") + "\n" + error);
      });
    },

    //Function to adjust the qty of an item. The func takes in the adjustment amount as a parameter
    adjustQty : function(adjustment) {
      //set a reference to the view
      var that = this;
      //Set the adjustment qty property to the passed in adjustment
      this.set({
        'adjustmentQty' : adjustment
      });

      //An attempt to write to the log only once with the adjustment.
      //If the model is valid
      if (this.isValid()) {
        //If the log tracker bool is true, set it to false
        if (that.logTrackerBool) {
          that.logTrackerBool = false;
        } else { //else clear the current timeout for the log to happen.
          clearTimeout(that.logTrackerTimerId);
        }
        //Increment the logTracker by the adjustment
        that.logTracker += adjustment;
        //if the logTracker amount is not equal to 0 we want to set a timeout to do the log entry.
        if (that.logTracker !== 0) {
          //Set a timer to do the log, and return the timer id so that it can be cleared later if needed.
          that.logTrackerTimerId = setTimeout(function() {
            //With the timer scheduled, do the following when the timer expires
            //Create an amount variable the is the same as the logTracker amount
            var amount = that.logTracker;
            //Set the tracker bool to true
            that.logTrackerBool = true;
            //reset the tracker to 0
            that.logTracker = 0;
            //Log the transaction that has occured passing the total amount that has been accumulated
            //in the last 2 seconds.
            App.ViewLogTab.ViewLogController.logTransaction("Quantity Adjusted by " + amount, that);
            //Send 2000 milliseconds (2 seconds) as the second parameter to the setTimeout function.
          }, 2000);
        }

      }
      //Save the model by persisting the data to the server
      this.save();
    },

    //Function to save the item to the server side. The function takes an object of properties to update
    //as the parameter for the function
    saveItem : function(updateModelProperties) {
      //If the save of the model with the passed in properties succeeds
      if (this.save(updateModelProperties) === false) {
        //Log that the save was successful
        App.ViewLogTab.ViewLogController.logTransaction("Item Information Updated", that);
        //return false because the caller is expecting false for success and true for failure
        //TODO: Flip these around so that it makes more sense.
        return false;
      }
      //Return true because the save failed.
      //TODO: Flip these around so they make more sense.
      return true;
    },

    //Function to add a new item to the collection and persist the data to the server side
    //The function takes in a object of model properties to be saved.
    addItem : function(addModelProperties) {
      //Set the properties of the model based on the passed in object
      this.set(addModelProperties);
      //Define a return value and initalize it to false
      var returnValue = false;
      //If the model is valid
      if (this.isValid()) {
        //Add the new model to the inventory collection. The return value of the success
        //or error function will be passed back to the returnValue
        returnValue = InventoryApp.InventoryTab.currentInventory.create(this, {
          //success function to be called on successful item add
          success: function() {
            //Log that the item was created
            App.ViewLogTab.ViewLogController.logTransaction("Item Created");
            //Pass true back
            return true;
          },
          //error function to be called if there is an error
          error : function() {
            //alert the user of the error
            //TODO: Come up with a better way to notify the user.
            alert('Error Adding New Item');
            //Pass false back
            return false;
          },
          //Wait for the ajax response before continuing
          wait : true
        });
      }
      //return the returnValue
      return returnValue;
    },

    //Function to add order quantities to the item. The function takes a number amount as a parameter
    addOrderQty : function(amount) {
      //remove the amount being added from the on order quantity property of the model
      var onOrderAdjustment = (this.get('on_order_quantity') - amount);
      //Set the on order quantity, and adjustment quantity on the model
      this.set({
        'on_order_quantity' : onOrderAdjustment,
        'adjustmentQty' : amount
      });
      //save the model
      this.save();
      //if the model is valid (which is should be, otherwise the save will fail)
      if (this.isValid()) {
        //Log that the quantity of the item has been increased from receiving an order
        App.ViewLogTab.ViewLogController.logTransaction("Quantity of " + amount + " Added From Received Order", this);
      }
    },

    //Function to validate a string using regular expressions
    strValidate : function(str) {
      //var flag = /^[a-zA-Z0-9]*$/.test(str);
      var flag = !/^[^<>:;`~\!\?\\\[\]\{\}]+$/.test(str);
      return flag;
    },

    //Function to validate a url using regular expressions
    urlValidate : function(str) {
      //var flag = /^[a-zA-Z0-9]*$/.test(str);
      var flag = !/^[^<>;`\!\\\[\]\{\}]+$/.test(str);
      return flag;
    },

    //Function to validate a number using regular expressions
    numValidate : function(str) {
      //var flag = /^[0-9]*$/.test(str);
      var flag = !/^\d+$/.test(str);
      return flag;
    },

    //Validation function for the model. If any of these tests pass, an error message is returned
    //This is a built in backbone functionality. Backbone will handle the error messages that are returned.
    validate : function(attrs) {
      if (this.strValidate(attrs.name) === true) {
        return "Invalid Name";
      }
      if (this.numValidate(attrs.quantity) === true) {
        return "Invalid Quantity";
      }
      if (attrs.vendor_id === '0') {
        return "Please Select a Vendor";
      }
      if (this.numValidate(attrs.email_threshold) === true) {
        return "Invalid Email Threshold";
      }
      if (this.strValidate(attrs.description) === true) {
        return "Invalid Description";
      }
      if (this.urlValidate(attrs.item_url) === true) {
        return "Invalid Url";
      }
    }
  });

  //Define the collection for items that is based on the above defined item model
  InventoryTab.ItemCollection = Backbone.Collection.extend({
    //Define which model to use
    model : InventoryTab.ItemModel,
    //define url for persistance
    url : 'api/items',

    //provide comparator function for sorting the collection
    comparator: function(item) {
     return (Number(item.get('id')));
    }

  });
});