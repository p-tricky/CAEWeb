//Define a module for all of the vendor functions to live in.
InventoryApp.module('VendorTab', function (VendorTab, App, Backbone, Marionette, $, _) {
  //Define the Item View that will work in conjunction with the Vendor List Composite View
  VendorTab.VendorItemView = Backbone.Marionette.ItemView.extend({

    //Define a tagname for this view.
    tagName: 'tr',

    //Function that is called when the view is instanciated
    initialize : function(options) {
      //fetch any options out the parameters.
      this.options = options || {};
      //use the tpl function to get the template name and then
      //pass the template to handlebars before it assigns the template to the view
      this.template = Handlebars.compile(tpl.get('vendors/_vendorRow'));
      //Bind the model to the view so that if the model changes, the view will re-render itself automatically
      this.model.bind('change', this.render, this);
    },

    //Define attributes for the view. This is mainly used to give the row a class
    //of either even or odd for row coloring purposes. This might be able to be done
    //with css rather than doing it with js. This also assigns an id field to the row
    //with an id that is the same as the id of the model.
    attributes : function(){
      //Get the model id in the client side collection
      var classValue = this.model.get('venNum');
      //define the class property
      var classProperty = '';
      //If the row is even set classProperty to even else odd
      if ((Number(classValue)%2) === 0) {
        classProperty = 'even';
      } else {
        classProperty = 'odd';
      }
      //return an object that is the following attributes.
      //id as model.id, and class as even or odd and itemRow.
      return {
        id : this.model.get('id'),
        class : classProperty + ' itemRow'
      };
    },

    //define event listeners
    events : {
      "dblclick" : "showDetails"
    },

    //function that will open a modal to show the details of the item
    showDetails : function() {
      //calls the showVendorDetailsModal function in the comtroller
      VendorTab.VendorController.showVendorDetailsModal(this.model);
    }

  });
});