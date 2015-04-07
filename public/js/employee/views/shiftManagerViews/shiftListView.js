//This is used to show the container that hold all of the shifts. On showing the view, 
//it grabs a new copy of the shift list so that it is up to date. If you loaded the 
//view without getting a new shift list, the coloring would be off for the items. 

EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.ShiftListView = Backbone.Marionette.CompositeView.extend({
    
    //declares the items that are going to be in the container
    itemView: EmployeeApp.ShiftManagerTab.ShiftItemView,

    initialize : function(options) {
        this.options = options || {};
        this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    onShow : function() {
        //gets a new set of shifts before displaying them. 
        ShiftManagerTab.ShiftManagerController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
    },

    id:'shiftListTable',

    itemViewContainer: "tbody"
  });
});