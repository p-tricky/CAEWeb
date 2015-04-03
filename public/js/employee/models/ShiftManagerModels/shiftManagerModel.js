//Declares the model that is used to hold the data for each shift. Has a clockout attribute 
//so a user can clockout anyone who forgot to clockout. 
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

    //backbone collection that hold all the shift models.
    ShiftManagerTab.ShiftCollection = Backbone.Collection.extend({
        
        model : ShiftManagerTab.ShiftModel,
        url: 'api/getallshifts',
        
        comparator: function(shift) {
            return (Number(shift.get('id')));
        }
        
    });

});

