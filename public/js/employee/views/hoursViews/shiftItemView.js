EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.ShiftItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('myHours/shiftListItem'));
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
        'dblclick' : 'showDetails'
    },

    //Function to show the item details in a modal box when the user double clicks a row
    showDetails : function(e) {
      //If the user is not double clicking on the buttons in the view
      if (e.target.nodeName !== "BUTTON") {
        //call the showInventoryItemModal and pass it the views model
        MyHoursTab.MyHoursController.showShiftModal(this.model);
      }
    }    

  });
});