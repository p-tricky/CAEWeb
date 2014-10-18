//Define module for the inventory tab to live in.
InventoryApp.module('InventoryTab', function (InventoryTab, App, Backbone, Marionette, $, _) {
  //Define a Item View to work in conjunction with the InventoryCompositeView
  InventoryTab.InventoryItemView = Backbone.Marionette.ItemView.extend({

    //Define the tag for this view. It will be a tr instead of the default div
    tagName: 'tr',

    //On Instanciation run the follwing function
    initialize : function(options) {
      //fetch any passed in options and assign them to the view
      this.options = options || {};
      //define the template to be used for this view. Use tpl to get the template and pass it to handlebars
      this.template = Handlebars.compile(tpl.get('currentInventory/_inventoryRow'));
      //Bind the model that is inheriently passed into this view by the composite view to this view
      //with a change attribute. This means that when the model that is associated with this view is
      //updated, this view will be litening, and pick that up. When it sees that the model has changed
      //the view will call this.render all on it's own forcing the view to re-render itself.
      this.model.bind('change', this.render, this);
    },

    //Define attributes for the view. This is mainly used to give the row a class
    //of either even or odd for row coloring purposes. This might be able to be done
    //with css rather than doing it with js. This also assigns an id field to the row
    //with an id that is the same as the id of the model.
    attributes : function(){
      //Get the model id in the client side collection
      var classValue = InventoryTab.currentInventory.indexOf(this.model);
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
    },

    //Define events for the tr and associated functions to be called when they occur
    events : {
      'click #removeQty' : 'removeQty',
      'click #addQty' : 'addQty',
      'dblclick' : 'showDetails'
    },

    //Function to be called when the removeQty button is clicked
    removeQty : function() {
      //if decrementing the quantity leaves the quantity still above or equal to 0.
      if ((Number(this.model.get('quantity')) - 1) >= 0) {
        //Fetch each button in the view, and disable it so that the button can't be spammed by trolls.
        _.each($(this.el).children().children('button'), function(invButton) {
          $(invButton).attr('disabled',true);
        });
        //With the button disabled, we can call the adjustQty method on the model to do the actual
        //decrement and persist the data to the server
        this.model.adjustQty(-1);
      }
    },

    //Function to be called when the addQty button is clicked
    addQty : function(event) {
      //Fetch each button i the view, and disable it so that the button can't be spammed by trolls
      _.each($(this.el).children().children('button'), function(invButton) {
        $(invButton).attr('disabled',true);
      });
      //With the button disabled, we can call the adjustQty method on the model to do the actual
      //increment and persist the data to the server.
      this.model.adjustQty(1);
    },

    //Function to show the item details in a modal box when the user double clicks a row
    showDetails : function(e) {
      //If the user is not double clicking on the buttons in the view
      if (e.target.nodeName !== "BUTTON") {
        //call the showInventoryItemModal and pass it the views model
        InventoryTab.InventoryController.showInventoryItemModal(this.model);
      }
    }

  });
});