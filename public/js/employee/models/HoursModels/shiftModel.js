EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
    MyHoursTab.ShiftModel = Backbone.Model.extend({
        
        defaults : {
            'id' : null,
        },

        url: 'api/usershift',

        clockOut: function() {
            this.save(this.attributes,{success : MyHoursTab.MyHoursController._clockOutSuccess});
        },

    });

    MyHoursTab.ShiftCollection = Backbone.Collection.extend({
        
        model : MyHoursTab.ShiftModel,
        url: 'api/usershifts',

        comparator: function(shift) {
            return (Number(shift.get('id')));
        }
        
    });

});