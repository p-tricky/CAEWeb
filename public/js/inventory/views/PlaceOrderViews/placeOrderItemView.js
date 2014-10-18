//Define module for the place orders tab to live in.
InventoryApp.module('PlaceOrdersTab', function (PlaceOrdersTab, App, Backbone, Marionette, $, _) {
  //Define the Item View that will be used in conjunction with the place order composite view
  PlaceOrdersTab.PlaceOrdersItemView = Backbone.Marionette.ItemView.extend({

    //Define the tag name for the view.
    tagName: 'tr',

    //Function that will be called when the view is instanciated
    initialize : function(options) {
      //fetch any options that are passed to the view out and attach them to the view
      this.options = options || {};
      //use the tpl function to get the template name and then
      //pass the template to handlebars before it assigns the template to the view
      this.template = Handlebars.compile(tpl.get('placeOrders/_placeOrderRow'));
    },

    //Define attributes for the view. This is mainly used to give the row a class
    //of either even or odd for row coloring purposes. This might be able to be done
    //with css rather than doing it with js. This also assigns an id field to the row
    //with an id that is the same as the id of the model.
    attributes : function(){
      //Get the model id in the client side collection
      var classValue = App.InventoryTab.currentInventory.indexOf(this.model);
      //define the classProperty
      var classProperty = '';
      //if the row is even, set classProperty to even, else odd
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
    }

  });
});