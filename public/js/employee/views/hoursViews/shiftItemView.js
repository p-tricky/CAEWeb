//This is the view for each shift. These are held in the shiftListView container
EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.ShiftItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    //defines the options, loads the template, then sets the total hours model
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('myHours/shiftListItem'));
      this.model.bind('change', this.render, this);
    },

    //this will set the id and the class for css to show the proper color and format
    attributes : function(){
      //each model has a number that was set in the ShiftsApiComtroller.php
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

    //defines listeners for when a user double clicks
    events : {
        'dblclick' : 'showDetails'
    },

    //Function to show the item details in a modal box when the user double clicks a row
    showDetails : function(e) {
      //If the user has permission to modify shifts
      if (EmployeeApp.currentUser.get('acc_crud_timesheet') === '1') {
        //call the showInventoryItemModal and pass it the views model
        MyHoursTab.MyHoursController.showShiftModal(this.model);
      }
    }    

  });
});