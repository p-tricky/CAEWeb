InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  InventoryTab.ItemModel = Backbone.Model.extend({
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

    urlRoot : 'api/items',

    initialize : function() {
      this.logTracker = 0;
      this.logTrackerBool = true;
      this.on("invalid", function(model, error) {
        alert("Unable to save " + model.get("name") + "\n" + error);
      });
    },

    adjustQty : function(adjustment) {
      var that = this;
      this.set({
        'adjustmentQty' : adjustment
      });

      //An attempt to write to the log only once with the adjustment.
      if (this.isValid()) {
        if (that.logTrackerBool) {
          that.logTrackerBool = false;
        } else {
          clearTimeout(that.logTrackerTimerId);
        }
        that.logTracker += adjustment;
        that.logTrackerTimerId = setTimeout(function() {
          var amount = that.logTracker;
          that.logTrackerBool = true;
          that.logTracker = 0;
          App.ViewLogTab.ViewLogController.logTransaction("Quantity Adjusted by " + amount, that);
        }, 2000);

      }

      this.save();
    },

    saveItem : function(updateModelProperties) {
      if (this.save(updateModelProperties) === false) {
        App.ViewLogTab.ViewLogController.logTransaction("Item Information Updated", that);
        return false;
      }
      return true;
    },

    addItem : function(addModelProperties) {
      this.set(addModelProperties);
      var returnValue = false;
      if (this.isValid()) {
        returnValue = InventoryApp.InventoryTab.currentInventory.create(this, {
          success: function() {
            App.ViewLogTab.ViewLogController.logTransaction("Item Created");
            return true;
          },
          error : function() {
            alert('Error Adding New Item');
            return false;
          },
          wait : true
        });
      }
      return returnValue;
    },

    addOrderQty : function(amount) {
      var onOrderAdjustment = (this.get('on_order_quantity') - amount);
      this.set({
        'on_order_quantity' : onOrderAdjustment,
        'adjustmentQty' : amount
      });
      this.save();
      if (this.isValid()) {
        App.ViewLogTab.ViewLogController.logTransaction("Quantity of " + amount + " Added From Received Order", this);
      }
    },

    strValidate : function(str) {
      //var flag = /^[a-zA-Z0-9]*$/.test(str);
      var flag = !/^[^<>:;`~\!\?\\\[\]\{\}]+$/.test(str);
      return flag;
    },

    urlValidate : function(str) {
      //var flag = /^[a-zA-Z0-9]*$/.test(str);
      var flag = !/^[^<>;`\!\\\[\]\{\}]+$/.test(str);
      return flag;
    },

    numValidate : function(str) {
      //var flag = /^[0-9]*$/.test(str);
      var flag = !/^\d+$/.test(str);
      return flag;
    },

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

 InventoryTab.ItemCollection = Backbone.Collection.extend({
    model : InventoryTab.ItemModel,
    url : 'api/items',

    comparator: function(item) {
     return (Number(item.get('id')));
    }

  });
});