//This is used to show the container that hold all of the shifts.
EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.ShiftListView = Backbone.Marionette.CompositeView.extend({
    
    itemView: EmployeeApp.MyHoursTab.ShiftItemView,

    //sets the options, loads the template, then sets the collection and model
    initialize : function(options) {
        this.options = options || {};
        this.template = Handlebars.compile(tpl.get(this.options.contentName));
        this.collection.bind('add', MyHoursTab.MyHoursController._showClockInOut, this);
        this.collection.bind('change', MyHoursTab.MyHoursController._getTotalHours(this.render), this);
        this.model.bind('change', this.render, this);
    },

    id:'shiftListTable',

    itemViewContainer: "tbody"
  });
});