//Define module for the view orders tab to live in.
InventoryApp.module('ViewOrdersTab', function (ViewOrdersTab, App, Backbone, Marionette, $, _) {
  //Define the Item View to be used in conjucntion with the OrderCompositeView
  ViewOrdersTab.OrderItemView = Backbone.Marionette.ItemView.extend({

    //Define the tagname to use for the view. tr since it is nested in the composite view of table
    tagName: 'tr',

    //Function that is called when the view is instanciated
    initialize : function(options) {
      //fetch any passed options out and attach them to the view
      this.options = options || {};
      //Use tpl to fetch the template and pass it through handlebars before assigning it to the view
      this.template = Handlebars.compile(tpl.get('currentOrders/_currentOrderRow'));
      //Bind the model to the view so that when the model is updated, it's corrosponding view will
      //automatically re-render itself
      this.model.bind('change', this.render, this);
    },

    //Define attributes for the view. This is mainly used to give the row a class
    //of either even or odd for row coloring purposes. This might be able to be done
    //with css rather than doing it with js. This also assigns an id field to the row
    //with an id that is the same as the id of the model.
    attributes : function(){
      //Get the model id in the client side collection
      var classValue = ViewOrdersTab.currentOrders.indexOf(this.model);
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
      'dblclick' : 'showDetails'
    },

    //Function to show the order details in a modal box when the user double clicks a row
    showDetails : function(e) {
      //call the showOrderDetailModal function of the viewOrders Controller passing the views model as a parameter
      ViewOrdersTab.ViewOrdersController.showOrderDetailsModal(this.model);
    }

  });
});