EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  
  MyHoursTab.MyHoursController = {

    /**
    * Methods pertaining to clockin / clockout functionallity & view
    */
    //renders clockinout view w/ content determined on whether or not employee is currently clocked in
    _showClockInOut : function() {
        EmployeeApp.MyHoursTab.MyHoursController._getServerTime();
        //if employee is still clocked in...
        if (EmployeeApp.MyHoursTab.shiftList.last().get('clockOut') === '0000-00-00 00:00:00') {
            //render clock out content
            MyHoursTab.MyHoursController._renderClockOut();
        }
        //if employee is not currently clocked in
        else {
            
            //render clock in content
            MyHoursTab.MyHoursController._renderClockIn();
        }
        //set the current shift time length for display
        EmployeeApp.MyHoursTab.MyHoursController._setTimeDiff();
     
    },
    //render clock in content
    _renderClockIn : function() {
        var divContent = new MyHoursTab.ClockInOutView({'contentName' : 'myHours/clockIn'});
        EmployeeApp.myHoursContent.clockInOutSection.show(divContent);
    },
    //render clock out content
    _renderClockOut: function() {
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
        $.ajax({
            url: 'api/servertime',
            success: EmployeeApp.MyHoursTab.MyHoursController._setInitialServerTime
        });
    },
    //sets server time on initial page load based on data passed in from _getServerTime return
    //also sets current time difference from last shift if user is clocked-in
    _setInitialServerTime : function(data) {
        var servertime = JSON.parse(data);
        EmployeeApp.MyHoursTab.tabInfoModel.serverTimeInMS = new Date(servertime.date.substr(0, 4), servertime.date.substr(5, 2) - 1, servertime.date.substr(8, 2), servertime.date.substr(11, 2), servertime.date.substr(14, 2), servertime.date.substr(17, 2)).getTime();
        if (MyHoursTab.shiftList.models.length !== 0){
            if (EmployeeApp.MyHoursTab.shiftList.last().get('clockOut') === '0000-00-00 00:00:00') {
                EmployeeApp.MyHoursTab.MyHoursController._setTimeDiff();
            }
        }
    },
    //sets current time difference from last shift clock in time for a currently clocked in user
    _setTimeDiff : function() {
        if (EmployeeApp.MyHoursTab.shiftList.models.length !== 0){
            var clockInString = EmployeeApp.MyHoursTab.shiftList.last().get('clockIn');
            var clockInTime = new Date(clockInString.substr(0, 4), clockInString.substr(5, 2) - 1, clockInString.substr(8, 2), clockInString.substr(11, 2), clockInString.substr(14, 2), clockInString.substr(17, 2));
            var currentServerTime = MyHoursTab.tabInfoModel.serverTimeInMS;
            var msDiff = currentServerTime - clockInTime.getTime();
            
            MyHoursTab.tabInfoModel.shiftDiff = msDiff;
            MyHoursTab.tabInfoModel.shiftDiffString = MyHoursTab.MyHoursController._getTimeString(EmployeeApp.MyHoursTab.tabInfoModel.shiftDiff);
            $('#shiftDiffDisplay').html(MyHoursTab.tabInfoModel.shiftDiffString);
        }
    },
    //determines total hours in specified filter range
    _getTotalHours : function(callback) {
        
        MyHoursTab.tabInfoModel.set({'totalhours': 0});
        var totalMS = 0;

        MyHoursTab.shiftList.each(function(shift){
            if (shift.get('clockOut') !== '0000-00-00 00:00:00'){
                var clockInString = shift.get('clockIn');
                var clockOutString = shift.get('clockOut');
                var clockin = new Date(clockInString.substr(0, 4), clockInString.substr(5, 2) - 1, clockInString.substr(8, 2), clockInString.substr(11, 2), clockInString.substr(14, 2), clockInString.substr(17, 2));
                var clockout = new Date(clockOutString.substr(0, 4), clockOutString.substr(5, 2) - 1, clockOutString.substr(8, 2), clockOutString.substr(11, 2), clockOutString.substr(14, 2), clockOutString.substr(17, 2));

                var msdiff = clockout.getTime() - clockin.getTime();
                totalMS += msdiff;
            }
        });
        EmployeeApp.MyHoursTab.tabInfoModel.set({'totalhours': MyHoursTab.MyHoursController._getTimeString(totalMS)});

        if (callback) {
            callback;
        }
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
        return (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2);
    },
    //updates server time and time since last clockin
    _updateTimes: function() {
        MyHoursTab.tabInfoModel.serverTimeInMS = MyHoursTab.tabInfoModel.serverTimeInMS + 60000;
        MyHoursTab.MyHoursController._setTimeDiff();
    },

    /**
    * Public functions called outside of the controller
    */

    //used to show a modal box to modify the selecte shift
    showShiftModal : function(theModel) {
        $('#fade').addClass('fade');
        var modalBox = $('#modalBox');
        modalBox.addClass('modalBox');
        var theModalView = new MyHoursTab.MyShiftModalView({model: theModel});
        App.tabDiv.modalArea.show(theModalView);
        //if the shift that is being edited is still clocked in
        if (theModel.get('clockOut') === "0000-00-00 00:00:00") {
          //removes all of the clockout options that wont be used
          $('#myHoursShiftModalClockOutLabel').remove();
          $('#modalclockout').parent().remove();
          $('#datetimeholder2').remove();
          $('.div-table-col-leftBtns').width('auto');
          $('.div-table-col-rightBtns').width('auto');
          modalBox.width(335);
        }
        modalBox.css({
          "position": "absolute",
          "left": (((modalBox.parent().width() - modalBox.outerWidth()) / 2) + modalBox.parent().scrollLeft() + "px"),
        });
    },

    //called by myShiftModalView in order to delete a shift
    //TODO: change this to use backbone's built in delete function in the model
    deleteShift : function(id) {
      $.ajax({
        url: 'api/deleteshift',
        data: {id: id},
        wait: true
      });
    },
    
    //called by myShiftModalView in order to update a shift's clockin and clockout
    //TODO: change this to use backbone's built in update function in the model
    updateShift : function(id, clockin, clockout, callback) {
      $.ajax({
        url: 'api/updateshift',
        data: {id: id, clockin: clockin, clockout: clockout},
        wait: true,
      }).done(function(response) {
        if (response && callback) callback(response);
      });
    },
      //makes to tabInfoModel and the shiftList
    getIndexShifts : function(callback) {
      if (typeof MyHoursTab.tabInfoModel === 'undefined') {
        MyHoursTab.tabInfoModel = new Backbone.Model();
      }
      //get shift data
      MyHoursTab.shiftList = new EmployeeApp.MyHoursTab.ShiftCollection();
      //get all shifts for current user
      MyHoursTab.shiftList.fetch({success : callback, data: {}});

    },

    //retrieves shifts in specified range, updating total hours
    getShiftsInRange : function(rangeStart, rangeEnd) {
        MyHoursTab.shiftList.fetch({success: MyHoursTab.MyHoursController._getTotalHours, data: {start: rangeStart , end: rangeEnd}});
        MyHoursTab.shiftList.totalhours = 0;
        MyHoursTab.shiftList.each(function(shift){
            MyHoursTab.shiftList.totalhours += shift.get('timeRec');
        });

        EmployeeApp.MyHoursTab.shiftList.reset();
    },
    //main function called in employee controller; calls numerous other functions to populate and display page content
    showPageContent : function(callback) {
        EmployeeApp.MyHoursTab.MyHoursController._getServerTime();
        EmployeeApp.MyHoursTab.MyHoursController._showShiftList();
        EmployeeApp.MyHoursTab.MyHoursController._getPayPeriod(EmployeeApp.MyHoursTab.MyHoursController._showShiftFilter);

        //check to see if there were no shifts returned in search range
        if (MyHoursTab.shiftList.models.length === 0){
            MyHoursTab.MyHoursController._renderClockIn();
        }
        else {
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
        EmployeeApp.MyHoursTab.shiftList.create({ shiftNum: MyHoursTab.shiftList.length+1 },{wait:true});
    }

  };
});
