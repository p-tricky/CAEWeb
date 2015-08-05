//Define module for the virus user tab to live in.
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  //Define a composite view to be used to show the modal box that allows the user to add a new
  //user to the virus users. 
  AssetListTab.AssetAddModalView = Backbone.Marionette.CompositeView.extend({

    //Define the tab for this view. div is default, we don't need to explicitly define it, but we are.
    tagName : "div",

    //When this view is instanciated, run this function
    initialize : function() {
      //use tpl to fetch the template, and pass it to handlebars
      this.template = Handlebars.compile(tpl.get('assetsList/assetAddModal'));
    },

    //Define the ItemView to use with this composite view. It will be the vendor list view
    itemView: AssetListTab.AssetDepartmentListView,

    //Define the container for the itemlist view. It will be the select.
    itemViewContainer: "#department-list",

    //Define the events to be associated with this view
    events : {
      'click .save' : 'save',
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
        department_id : $('#department-list').val(),
        mac_address : $('#mac_address').val(),
        asset_type : $('#asset-type-list').text(),
        assignee_name : $('#assignee_name').val()
      };
      //Send the object of parameters to the model to be saved with the addUser function.
      //The result will be returned to the result variable
      var result = this.model.addAsset(fields);
      //If the save was successful
      if (result) {
        //Remove the fade overlay and modalbox
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        //close the modal box view
        App.tabDiv.modalArea.close();
      }
    },

    //Function to be called when the cancel button is clicked
    cancel : function() {
      //Remove the fade overlay and modal box
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      //Close the modal box
      App.tabDiv.modalArea.close();
    }
  });
});
