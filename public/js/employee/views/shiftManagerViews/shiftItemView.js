//This is the view for each shift. These are held in the shiftListView container
EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.ShiftItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    initialize : function(options) {
      this.options = options || {};
      //if the shift is still clocked in
      if (this.model.get('timeRec') === "N/A")
      {
        //loads the template that has the clockout button. 
        //I used this option because css wouldn't format correctly trying to show some and hide others
        this.template = Handlebars.compile(tpl.get('shiftManager/shiftListItemWithBtn'));
      } else {
        //loads the template that doesn't have a clockout button. 
        this.template = Handlebars.compile(tpl.get('shiftManager/shiftListItemW_oBtn'));
      }
      this.model.bind('change', this.render, this);
    },

    //this will set the id and the class for css to show the proper color and format
    attributes : function(){
      //each model has a number that was set in the AllShiftsApiComtroller.php
      var classValue = this.model.get('shiftNum');
      var classProperty = '';
      if ((Number(classValue)%2) === 0) {
        classProperty = 'even';
      } else {
        classProperty = 'odd';
      }
      //returns the class and id for css
      return {
        id : this.model.get('id'),
        class : classProperty + ' shiftRow'
      };
    },

    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this.el;
    },

    //defines listeners for when a user double clicks or clicks a clockout button
    events : {
        'dblclick' : 'showDetails',
        'click #clockout': 'clockout',
    },

    //Function to show the item details in a modal box when the user double clicks a row
    showDetails : function(e) {
      //If the user isn't clicking on a button
      if(e.target.nodeName !== "BUTTON") {
        //call the showInventoryItemModal and pass it the views model
        ShiftManagerTab.ShiftManagerController.showShiftModal(this.model);
      }          
    },

    //clocks out the user for the current shift
    clockout : function() {
      //calls the clockout function in the controller, passing this model's id
      ShiftManagerTab.ShiftManagerController.clockOut(this.model.get('id'));
      //changes the template in order to remove the clockout button
      this.template = Handlebars.compile(tpl.get('shiftManager/shiftListItemW_oBtn'));
    }

  });
});