EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.ShiftListView = Backbone.Marionette.CompositeView.extend({
    
    itemView: EmployeeApp.MyHoursTab.ShiftItemView,

    initialize : function(options) {
        this.options = options || {};
        this.template = Handlebars.compile(tpl.get(this.options.contentName));
        this.collection.bind('add', MyHoursTab.MyHoursController._showClockInOut, this);
        this.collection.bind('change', MyHoursTab.MyHoursController._getTotalHours(this.render), this);
        this.model.bind('change', this.render, this);
    },

    onShow : function() {
        /*
        MyHoursTab.MyHoursController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
        console.log(MyHoursTab.shiftList);
        //check to see if there were no shifts returned in search range
        if (MyHoursTab.shiftList.models.length === 0){
            MyHoursTab.MyHoursController._renderClockIn();
        }
        else {
            //console.log('Rendering clockin/out button...');
            EmployeeApp.MyHoursTab.MyHoursController._showClockInOut();
        }*/
    },

    id:'shiftListTable',

    itemViewContainer: "tbody"
  });
});