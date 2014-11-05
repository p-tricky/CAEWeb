EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  
  MyHoursTab.MyHoursController = {

    /**
    * Methods pertaining to clockin / clockout functionallity & view
    */
    //renders clockinout view w/ content determined on whether or not employee is currently clocked in
    _showClockInOut : function() {
        //console.log(EmployeeApp.MyHoursTab.shiftList.last().get('clockOut'));
        EmployeeApp.MyHoursTab.MyHoursController._getServerTime();
        //if employee is still clocked in...
        if (EmployeeApp.MyHoursTab.shiftList.last().get('clockOut') === '0000-00-00 00:00:00') 
        {
        //render clock out content
            MyHoursTab.MyHoursController._renderClockOut();
        }
        //if employee is not currently clocked in
        else
        {
        //render clock in content
            MyHoursTab.MyHoursController._renderClockIn();
        }
        //set the current shift time length for display
        EmployeeApp.MyHoursTab.MyHoursController._setTimeDiff();
     
    },
    //render clock in content
    _renderClockIn : function() {
        //console.log('Rendering clock in content...');
        var divContent = new MyHoursTab.ClockInOutView({'contentName' : 'myHours/clockIn'});
        EmployeeApp.myHoursContent.clockInOutSection.show(divContent);
    },
    //render clock out content
    _renderClockOut: function() {
        //console.log('Rendering clock out content...');
        var divContent = new MyHoursTab.ClockInOutView({'contentName' : 'myHours/clockOut'});
        EmployeeApp.myHoursContent.clockInOutSection.show(divContent);
    },
    //run upon clockout completion, updates total hours and rerenders the clockinout view
    _clockOutSuccess : function() {
        EmployeeApp.MyHoursTab.MyHoursController._getTotalHours();
        EmployeeApp.MyHoursTab.MyHoursController._showClockInOut();
    },

    /**
    * Private functions called within the controller
    */
    //obtains current pay period from server via ajax request
    _getPayPeriod : function(callback) {
        $.ajax({
            url: 'api/payperiod'
        })
        .done(callback);
    },
    //creates and displays shfit list view populated with shiftList collection
    _showShiftList : function() {
        var listContent = new MyHoursTab.ShiftListView({collection: MyHoursTab.shiftList, 'contentName': 'myHours/shiftListTable', model: MyHoursTab.tabInfoModel});
        EmployeeApp.myHoursContent.shiftListSection.show(listContent);
    },
    //creates and displays filter view
    _showShiftFilter : function(payPeriodData) {
        //model used to store some pay period data and associate it with the filter view
        var theModel = new Backbone.Model(JSON.parse(payPeriodData));
        var filterContent = new MyHoursTab.ShiftFilterView({model: theModel,'contentName': 'myHours/shiftFilter'});        
        EmployeeApp.myHoursContent.shiftFilterSection.show(filterContent);
        $('#datepicker1').datepicker();
        $('#datepicker2').datepicker();
    },
    //obtains current server time via ajax request
    _getServerTime: function() {
        console.log("Retrieving initial server time information.")
        $.ajax({ 
        url: 'api/servertime', 
        success: EmployeeApp.MyHoursTab.MyHoursController._setInitialServerTime
        });
    },
    //sets server time on initial page load based on data passed in from _getServerTime return
    //also sets current time difference from last shift if user is clocked-in
    _setInitialServerTime : function(data) {
        var servertime = JSON.parse(data);
        console.log(servertime.date);
        console.log("Server time retrieved and set.");
        EmployeeApp.MyHoursTab.tabInfoModel.serverTimeInMS = new Date(servertime.date).getTime();
        if (MyHoursTab.shiftList.models.length !== 0){
            if (EmployeeApp.MyHoursTab.shiftList.last().get('clockOut') === '0000-00-00 00:00:00') 
            {
                console.log("User currently clocked in. Setting time difference.");
                EmployeeApp.MyHoursTab.MyHoursController._setTimeDiff();
            }
        }
    },
    //sets current time difference from last shift clock in time for a currently clocked in user
    _setTimeDiff : function() {
        var clockInTime = new Date(EmployeeApp.MyHoursTab.shiftList.last().get('clockIn'));
        var currentServerTime = MyHoursTab.tabInfoModel.serverTimeInMS;
        var msDiff = currentServerTime - clockInTime.getTime();
        
        MyHoursTab.tabInfoModel.shiftDiff = msDiff;
        MyHoursTab.tabInfoModel.shiftDiffString = MyHoursTab.MyHoursController._getTimeString(EmployeeApp.MyHoursTab.tabInfoModel.shiftDiff);
        console.log(MyHoursTab.tabInfoModel.shiftDiffString);
        $('#shiftDiffDisplay').html(MyHoursTab.tabInfoModel.shiftDiffString);
    },
    //determines total hours in specified filter range
    _getTotalHours : function(callback) {
        console.log("Calculating total hours...");
        //console.log("Old total hours are %d", MyHoursTab.tabInfoModel.get('totalhours'));
        
        MyHoursTab.tabInfoModel.set({'totalhours': 0});
        var totalMS = 0;

        MyHoursTab.shiftList.each(function(shift){  
            if (shift.get('clockOut') !== '0000-00-00 00:00:00'){
                var clockin = new Date(shift.get('clockIn'));
                var clockout = new Date(shift.get('clockOut'));

                var msdiff = clockout.getTime() - clockin.getTime();
                //console.log("difference of %d found",msdiff);
                totalMS += msdiff;
            }
        })
        //console.log("Returned: %s", MyHoursTab.MyHoursController._getTimeString(totalMS));
        EmployeeApp.MyHoursTab.tabInfoModel.set({'totalhours': MyHoursTab.MyHoursController._getTimeString(totalMS)});

        console.log("Returned updated total hours:" + MyHoursTab.tabInfoModel.get('totalhours'));

        if (callback)
            callback;
    },
    //returns a string with time in hours & minutes (converted from miliseconds)
    _getTimeString : function(timeInMS) {
        var temp,hours,minutes;
        //retrieve time in seconds
        totalSec = Math.floor(timeInMS / 1000);
        //convert minutes (less hours via modulus math)
        minutes = Math.floor((totalSec % 3600) / 60);
        //convert hours (minutes truncated by division math)
        
        hours = Math.floor(totalSec / 3600);
        //console.log('created time string, returned' + (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2))
        return (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2);
    },
    //updates server time and time since last clockin
    _updateTimes: function() {
        MyHoursTab.tabInfoModel.serverTimeInMS = MyHoursTab.tabInfoModel.serverTimeInMS + 60000;
        MyHoursTab.MyHoursController._setTimeDiff();
        //console.log("One minute since page load. Updating times.");

    },

    /**
    * Public functions called outside of the controller
    */
    getIndexShifts : function(callback) {
        if (typeof MyHoursTab.tabInfoModel === 'undefined') {
            MyHoursTab.tabInfoModel = new Backbone.Model();
        }
      //get shift data
      if (typeof MyHoursTab.shiftList === "undefined") {
        console.log('Getting shift data...');
        MyHoursTab.shiftList = new EmployeeApp.MyHoursTab.ShiftCollection();
        //get all shifts for current user
        MyHoursTab.shiftList.fetch({success : callback, data: {}});
      } else {
        callback();
      }
    },
    //retrieves shifts in specified range, updating total hours
    getShiftsInRange : function(rangeStart, rangeEnd) {
        //console.log('Applying filter...');
        MyHoursTab.shiftList.fetch({success: MyHoursTab.MyHoursController._getTotalHours, data: {start: rangeStart , end: rangeEnd}});  
        MyHoursTab.shiftList.totalhours = 0;
        MyHoursTab.shiftList.each(function(shift){
            MyHoursTab.shiftList.totalhours += shift.get('timeRec');
        });
    },
    //main function called in employee controller; calls numerous other functions to populate and display page content
    showPageContent : function(callback) {
        console.log('Retrieved shift data.');

        EmployeeApp.MyHoursTab.MyHoursController._getServerTime();

        //console.log("Current Shift List:");
        //console.log(MyHoursTab.shiftList);
        //console.log('Rendering shift list...');
        EmployeeApp.MyHoursTab.MyHoursController._showShiftList();

        //console.log('Rendering list filter...');
        EmployeeApp.MyHoursTab.MyHoursController._getPayPeriod(EmployeeApp.MyHoursTab.MyHoursController._showShiftFilter);

        //check to see if there were no shifts returned in search range
        if (MyHoursTab.shiftList.models.length === 0){
            MyHoursTab.MyHoursController._renderClockIn();
        }
        else {
            //console.log('Rendering clockin/out button...');
            EmployeeApp.MyHoursTab.MyHoursController._showClockInOut();
        }

        EmployeeApp.EmployeeTab.minuteTimer = setInterval(function(){EmployeeApp.MyHoursTab.MyHoursController._updateTimes();}, 60000);
    },
    //clocks out the currently clocked in shift
    clockOut : function(callback) {
        var lastShift = EmployeeApp.MyHoursTab.shiftList.last();
        lastShift.clockOut();
    },
    //creates a new shift and clocks the current user in
    clockIn : function(callback) {
        MyHoursTab.shiftDiff = 0;
        EmployeeApp.MyHoursTab.shiftList.create({},{wait:true});
    }

  };
});