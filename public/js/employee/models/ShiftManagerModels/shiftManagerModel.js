EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
    ShiftManagerTab.ShiftModel = Backbone.Model.extend({
        
        defaults : {
            'id' : null,
        },

        url: 'api/usershift',

        clockOut: function() {
            this.save(this.attributes);
        },

    });

    ShiftManagerTab.ShiftCollection = Backbone.Collection.extend({
        
        model : ShiftManagerTab.ShiftModel,
        url: 'api/getallshifts',

        comparator: function(shift) {
            return (Number(shift.get('id')));
        }
        
    });

});

