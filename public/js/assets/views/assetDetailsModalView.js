//Define module for the asset list tab to live in.
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  //Define a composite view to be used to show the modal box that allows the user to edit an existing
  //asset in the assets collection. 
  AssetListTab.AssetDetailsModalView = Backbone.Marionette.Layout.extend({

    //When this view is instanciated, run this function
    initialize : function(options) {
      //use tpl to fetch the template, and pass it to handlebars
      this.template = Handlebars.compile(tpl.get('assetsList/assetDetailsModal'));
      this.saveCallback = this.options.saveCallback  ? this.options.saveCallback : function(){};
    },

    //define region for the department drop down
    regions: {
      departmentsDropDown: '#departmentsDropDown',
    },

    //id for the view
    id:'assetDetailsModalView',

    //when the view is shown, it selects the correct item in the asset type drop down
    onShow: function() {
        $('#asset-type-list>option[value='+this.model.get('asset_type')+']').prop('selected', true);
    },
    //Define the events to be associated with this view
    events : {
      'click .save' : 'save',
      'click .delete' : 'delete',
      'click .cancel' : 'cancel'
    },


    //Function to be called when the save button is clicked
    save : function() {
      //Get the values from the fields and put them in an object to pass to the model
      var fields = {
        brand_name : $('#brand_name').val(),
        serial_number : $('#serial_number').val(),
        description : $('#description').val(),
        room : $('#room').val(),
        department_id : $('#departmentsDropDown option:selected').val(),
        department_name : $('#departmentsDropDown option:selected').text(),
        mac_address : $('#mac_address').val(),
        ip_address : $('#ip_address').val(),
        asset_type : $('#asset-type-list option:selected').text(),
        assignee_name : $('#assignee_name').val()
      };
      //Send the object of parameters to the model to be saved with the addUser function.
      //The result will be returned to the result variable
      this.model.saveAsset(fields);
      this.saveCallback();
    },

    //Function to be called when the cancel button is clicked
    cancel : function() {
      //Remove the fade overlay and modal box
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      //Close the modal box
      App.tabDiv.modalArea.close();
    },

    delete : function() {
      this.model.destroy();
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      //close the modal box view
      App.tabDiv.modalArea.close();
    }
  });
});
