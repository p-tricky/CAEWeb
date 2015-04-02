EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.ShiftListView = Backbone.Marionette.CompositeView.extend({
    
    itemView: EmployeeApp.ShiftManagerTab.ShiftItemView,

    initialize : function(options) {
        this.options = options || {};
        console.log(this.options.contentName);
        this.template = Handlebars.compile(tpl.get(this.options.contentName));
        this.model.bind('change', this.render, this);
    },

    onShow : function() {
        ShiftManagerTab.ShiftManagerController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
        ShiftManagerTab.shiftList.reset();
    },

    id:'shiftListTable',

    itemViewContainer: "tbody"
  });
});