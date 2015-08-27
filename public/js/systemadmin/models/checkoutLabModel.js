//Define module for the inventory tab to live in.
SysAdminApp.module('CheckoutLabTab', function (CheckoutLabTab, App, Backbone, Marionette, $, _) {
  //Define the Item Model to hold information about a item
  CheckoutLabTab.CheckoutLabModel = Backbone.Model.extend({
    //Define some defaults for new models that are created clientside
    defaults : {
      'id' : null,
      'name' : '',
      'win': '',
      'lab': '',
      'phone_number': '',
      'email': '',
      'checkout_date': '',
      'updated_at':'',
      'created_at':'',
    },

    //url for the model to use to persist data to the server side
    urlRoot : 'api/checkoutlabs',

    //Function to setup some inital things for the model
    initialize : function() {
      //If the model is invalid, alert the user that the model could not be saved.
      this.on("invalid", function(model, error) {
        $('#confirmModalBox').html("Unable to save " + model.get("name") + "\n" + error);
        $('#confirmModalBox').dialog({
          modal:true,
          title: 'Error when saving',
          buttons: {
            'Ok': function() {
              $(this).dialog('close');
            }
          },
        });
      });
    },

    //Function to save the scan to the server side. The function takes an object of properties to update
    //as the parameter for the function
    saveCheckout : function(updateModelProperties) {
      this.set(updateModelProperties);
      if ( this.isValid() ) {
        result = this.save();
        return result;
      }
      // if the updateModelProperties weren't valid, reset model to former state
      this.set(this.previousAttributes());
    },

    addCheckout : function(addModelProperties) {
      //sets the new model's properties to the properties that were passed
      this.set(addModelProperties);
      SysAdminApp.CheckoutLabTab.checkoutLabList.create(this, {
          wait: true,
          success: function() {
            // close userAddModalView
            $('#fade').removeClass('fade');
            $('#modalBox').removeClass('modalBox');
            App.tabDiv.modalArea.close();
          },
          error: function() {
            // leave UserAddModalView open and open error dialog
            var errorAlert = $('#confirmModalBox');
            errorAlert.html("Sorry, there was an error");
            errorAlert.dialog({
              modal: true,
              title: 'Error when saving',
              buttons: {
                'Ok': function() {
                  $(this).dialog('close');
                }
              },
            });
          },
      });
    },

  });

  //Define the collection for scans that is based on the above defined item model
  CheckoutLabTab.CheckoutLabCollection = Backbone.Collection.extend({
    //Define which model to use
    model : CheckoutLabTab.CheckoutLabModel,
    //define url for persistance
    url : 'api/checkoutlabs'
  });
});
