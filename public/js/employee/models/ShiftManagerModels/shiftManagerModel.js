//Declares the model that is used to hold the data for each shift. Has a clockout attribute 
//so a user can clockout anyone who forgot to clockout. 
EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
    ShiftManagerTab.ShiftModel = Backbone.Model.extend({
        
        defaults : {
            'id' : null,
            'clockIn': null,
            'clockOut': null,
        },

        url: 'api/usershift',

        clockOut: function() {
            this.save(this.attributes);
        },
          
        yyyymmdd: function(date) {
          var yyyy = date.getFullYear().toString();
          var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
          var dd  = date.getDate().toString();
          return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]) + " 00:00:00"; 
        },
    });

    //backbone collection that hold all the shift models.
    ShiftManagerTab.ShiftCollection = Backbone.Collection.extend({
        
        model : ShiftManagerTab.ShiftModel,
        url: 'api/getallshifts',
        
    });

});

