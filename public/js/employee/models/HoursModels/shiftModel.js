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
        
        //the models that populate the collection
        model : MyHoursTab.ShiftModel,

        //url that is used to get the collection
        url: 'api/usershifts',
        
    });

});

