EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.ShiftListView = Backbone.Marionette.CollectionView.extend({
    
    itemView: EmployeeApp.MyHoursTab.ShiftItemView,

    initialize : function(options) {
        this.options = options || {};
        this.template = Handlebars.compile(tpl.get(this.options.contentName));
        this.collection.bind('add', MyHoursTab.MyHoursController._showClockInOut, this);
    },

    id:'shiftListTable',

    itemViewContainer: "tbody"
    
  });
});