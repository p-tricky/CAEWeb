EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.ShiftItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    initialize : function(options) {
      this.options = options || {};
      if (this.model.get('timeRec') === "N/A")
      {
        this.template = Handlebars.compile(tpl.get('shiftManager/shiftListItemWithBtn'));
      } else {
        this.template = Handlebars.compile(tpl.get('shiftManager/shiftListItemW_oBtn'));
      }
      this.model.bind('change', this.render, this);
    },

    attributes : function(){
      var classValue = this.model.get('shiftNum');
      var classProperty = '';
      if ((Number(classValue)%2) === 0) {
        classProperty = 'even';
      } else {
        classProperty = 'odd';
      }
      return {
        id : this.model.get('id'),
        class : classProperty + ' shiftRow'
      };
    },

    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this.el;
    },

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
      ShiftManagerTab.ShiftManagerController.clockOut(this.model.get('id'));
      this.template = Handlebars.compile(tpl.get('shiftManager/shiftListItemW_oBtn'));
      ShiftManagerTab.ShiftManagerController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());  
    }

  });
});