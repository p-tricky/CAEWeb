//Define module for the inventory tab to live in.
InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  //Define a vendor model to represent the vendor information
  InventoryTab.VendorModel = Backbone.Model.extend({
    //Define defaults to be used when creating a new model
    defaults : {
      'id' : null,
      'name' : '',
      'url' : ''
    },

    //url used to persist data to the server
    urlRoot : 'api/vendor',

    //Function to save an updated vendor
    saveVendor : function(vendorProps) {
      //if the save was successful, it will return true. 
      if (this.save(vendorProps) !== false) {
        return true;
      }
      //otherwise it returns false
      return false;
    },

    //Function to add a new vendor to the collection and persist the data to the server side
    //The function takes in a object of model properties to be saved.
    addVendor : function(addModelProperties) {
      //Set the properties of the model based on the passed in object
      this.set(addModelProperties);
      //Define a return value and initalize it to false
      var returnValue = false;
      //If the model is valid
      if (this.isValid()) {
        //Add the new model to the vendor collection. The return value of the success
        //or error function will be passed back to the returnValue
        returnValue = InventoryApp.InventoryTab.vendorCollection.create(this, {
          //success function to be called on successful vendor add
          success: function() {
            //Pass true back
            return true;
          },
          //error function to be called if there is an error
          error : function() {
            //alert the user of the error
            $('#confirmModalBox').html('Error Adding New Vendor');
            $('#confirmModalBox').dialog({
              modal:true,
              title: 'Vendor Error',
              buttons: {
                'Ok': function() {
                  $(this).dialog('close');
                }
              },
            });
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

    //Validation function for the model. If any of these tests pass, an error message is returned
    //This is a built in backbone functionality. Backbone will handle the error messages that are returned.
    validate : function(attrs) {
      if (this.strValidate(attrs.name) === true) {
        return "Invalid Name";
      }
      if (this.urlValidate(attrs.url) === true) {
        return "Invalid Url";
      }
    }
  });

  //Define a collection of the above defined models for vendors
  InventoryTab.VendorCollection = Backbone.Collection.extend({
    //Define the model to use for the collection
    model : InventoryTab.VendorModel,
    //url used to persist data to the server
    url : 'api/vendor'

  });
});