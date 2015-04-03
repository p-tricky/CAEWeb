//Defines a backbone model for each shift. These hold all the information for each shift
EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
    MyHoursTab.ShiftModel = Backbone.Model.extend({
        
        defaults : {
            'id' : null,
        },

        url: 'api/usershift',

        //clockout function for the current shift. 
        clockOut: function() {
            this.save(this.attributes,{success : MyHoursTab.MyHoursController._clockOutSuccess});
        },

    });

    //Backbone collection for all the shift models. 
    MyHoursTab.ShiftCollection = Backbone.Collection.extend({
        
        model : MyHoursTab.ShiftModel,
        url: 'api/usershifts',

        //can be used to sort the models
        comparator: function(shift) {
            return (Number(shift.get('id')));
        }
        
    });

});

