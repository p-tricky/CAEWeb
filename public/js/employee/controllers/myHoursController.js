EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  
  MyHoursTab.MyHoursController = {

    _showClockInOut : function() {
        console.log(EmployeeApp.MyHoursTab.shiftList.last().get('clockOut'));
        console.log(MyHoursTab.shiftList);
        EmployeeApp.MyHoursTab.shiftList.initialServerTime = EmployeeApp.MyHoursTab.shiftList.last().get('clockIn');
        if (EmployeeApp.MyHoursTab.shiftList.last().get('clockOut') === '0000-00-00 00:00:00') 
        {
            console.log('Rendering clock out content...');
            var divContent = new MyHoursTab.ClockInOutView({'contentName' : 'myHours/clockOut'});
            EmployeeApp.myHoursContent.clockInOutSection.show(divContent);
        }
        else
        {
            console.log('Rendering clock in content...');
            var divContent = new MyHoursTab.ClockInOutView({'contentName' : 'myHours/clockIn'});
            EmployeeApp.myHoursContent.clockInOutSection.show(divContent);
        }
        EmployeeApp.MyHoursTab.MyHoursController._setTimeDiff();
    },

    _showShiftList : function() {
        var divContent = new MyHoursTab.ShiftListView({collection: MyHoursTab.shiftList, 'contentName': 'myHours/shiftListTable'});        
        EmployeeApp.myHoursContent.shiftListSection.show(divContent);
    },

    getShifts : function(callback) {
      //get shift data
      if (typeof MyHoursTab.shiftList === "undefined") {
        console.log('Getting shift data...');
        MyHoursTab.shiftList = new EmployeeApp.MyHoursTab.ShiftCollection();
        MyHoursTab.shiftList.fetch({success : callback});
      } else {
        callback();
      }

    },

    _getServerTime: function() {
        $.ajax({ 
        url: 'api/servertime', 
        success: EmployeeApp.MyHoursTab.MyHoursController._setInitialServerTime
        });
    },

    _setInitialServerTime : function(data) {
        var servertime = JSON.parse(data);
        console.log(servertime.date);
        EmployeeApp.MyHoursTab.shiftList.initialServerTime = servertime.date;
        if (EmployeeApp.MyHoursTab.shiftList.last().get('clockOut') === '0000-00-00 00:00:00') 
        {
            EmployeeApp.MyHoursTab.MyHoursController._setTimeDiff();
        }
    },

    _setTimeDiff : function() {
        
        var clockin = new Date(EmployeeApp.MyHoursTab.shiftList.last().get('clockIn'));
        var servertime = new Date(EmployeeApp.MyHoursTab.shiftList.initialServerTime);

        var diff = MyHoursTab.shiftDiff || servertime.getTime() - clockin.getTime();
        
        console.log(servertime.getTime());
        console.log(clockin.getTime());
        console.log(diff);

        var temp,hours,minutes;
        temp = Math.floor(diff / 1000);
        hours = Math.floor(temp / 3600);
        minutes = Math.floor((temp %= 3600) / 60);

        EmployeeApp.MyHoursTab.shiftDiff = diff;
        EmployeeApp.MyHoursTab.diffString = (hours < 10 ? '0' : '') + hours + ':' + ("0" + minutes).slice(-2);
        console.log(MyHoursTab.diffString);
        $('#shiftDiffDisplay').html(EmployeeApp.MyHoursTab.diffString);
    },

    updateTimes: function() {
        MyHoursTab.servertime = MyHoursTab.shiftList.initialServerTime +60000;
        MyHoursTab.shiftDiff = MyHoursTab.shiftDiff + 60000;
        MyHoursTab.MyHoursController._setTimeDiff();

    },

    showPageContent : function(callback) {
        console.log('Retrieved shift data.');
        console.log('Retrieving last shift info...');
        EmployeeApp.MyHoursTab.MyHoursController._getServerTime();

        console.log(MyHoursTab.shiftList);
        console.log('Rendering shift list...');
        EmployeeApp.MyHoursTab.MyHoursController._showShiftList();
        console.log('Rendering clockin/out button...');
        EmployeeApp.MyHoursTab.MyHoursController._showClockInOut();
        setInterval(function(){EmployeeApp.MyHoursTab.MyHoursController.updateTimes();}, 60000);
    },

    clockOut : function(callback) {
        var lastShift = EmployeeApp.MyHoursTab.shiftList.last();
        lastShift.clockOut();

    },

    clockIn : function(callback) {
        MyHoursTab.shiftDiff = 0;
        EmployeeApp.MyHoursTab.shiftList.create({},{wait:true});
    }

  };
});