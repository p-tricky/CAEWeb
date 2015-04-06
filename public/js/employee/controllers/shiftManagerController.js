EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  
  ShiftManagerTab.ShiftManagerController = {
  	
  	//main function called in employee controller; calls numerous other functions to populate and display page content
    showPageContent : function(callback) {
        EmployeeApp.ShiftManagerTab.ShiftManagerController._showShiftList();

        //calls the MyHours function getPayPeriod in order to set the Start Date and End Date in the shift filter
        EmployeeApp.MyHoursTab.MyHoursController._getPayPeriod(EmployeeApp.ShiftManagerTab.ShiftManagerController._showShiftFilter);
    },

    //If the shift list hasn't been created, it makes a new shiftList and gets the base models. This happens when the page
    //is loaded for the first time. Otherwise, it just gets the shifts for the base range. 
  	getAllShifts : function(callback) {
  	  	//get shift data
      	if (typeof ShiftManagerTab.shiftList === "undefined") {
        	//console.log('Getting shift data...');
        	ShiftManagerTab.shiftList = new EmployeeApp.ShiftManagerTab.ShiftCollection();
        	//get all shifts for current user
        	ShiftManagerTab.shiftList.fetch({success : callback, data: {}});
      	} else {
          //fetchs and resets the shift list. this will refresh it whih will get the shifts in the current pay period
        	ShiftManagerTab.shiftList.fetch();
          ShiftManagerTab.shiftList.reset();
          //calls the function that was passed in as a callback
          callback();
      	}
  	},

  	//retrieves shifts in specified range
    getShiftsInRange : function(rangeStart, rangeEnd) {
        ShiftManagerTab.shiftList.fetch({data: {start: rangeStart , end: rangeEnd}});
        //reset the shiftList to ensure everything is up to date
        ShiftManagerTab.shiftList.reset();
    },

  	//used to show a modal box to modify the selected shift
    showShiftModal : function(theModel) {
        //dims the background material
        $('#fade').addClass('fade');
        //shows the modal that allows users to edit shifts
        $('#modalBox').addClass('modalBox');
        var theModalView = new ShiftManagerTab.MyShiftModalView({model: theModel});
        App.tabDiv.modalArea.show(theModalView);
        if (theModel.get('clockOut') === "0000-00-00 00:00:00") {
          $('#shiftManagerShiftModalClockOutLabel').remove();
          $('#modalclockout').parent().remove();
          $('#datetimeholder2').remove();
          $('.div-table-col-leftBtns').width('auto');
          $('.div-table-col-rightBtns').width('auto');
          $('#modalBox').width(335);
        }
    },

  	//called by myShiftModalView in order to update a shift's clockin and clockout
    updateShift : function(id, clockin, clockout) {
        $.ajax({
            url: 'api/updateshift',
            data: {id: id, clockin: clockin, clockout: clockout},
            wait: true
        });
    },

  	//called by myShiftModalView in order to delete a shift
    deleteShift : function(id) {
        $.ajax({
            url: 'api/deleteshift',
            data: {id: id},
            wait: true
        });
    },

  	//creates and displays shfit list view populated with shiftList collection
    _showShiftList : function() {
        var listContent = new ShiftManagerTab.ShiftListView({collection: ShiftManagerTab.shiftList, 'contentName': 'shiftManager/shiftListTable'});
        EmployeeApp.shiftManagerContent.shiftListSection.show(listContent);
    },

  	//creates and displays filter view
    _showShiftFilter : function(payPeriodData) {
        //model used to store some pay period data and associate it with the filter view
        var theModel = new Backbone.Model(JSON.parse(payPeriodData));
        var filterContent = new ShiftManagerTab.ShiftFilterView({model: theModel,'contentName': 'shiftManager/shiftFilter'});
        EmployeeApp.shiftManagerContent.shiftFilterSection.show(filterContent);
        $('#datepicker1').datepicker();
        $('#datepicker2').datepicker();
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

    //calls the clockout function for the specified model. This will update the collection with the clockout time. 
    clockOut : function(id) {
      var shift = ShiftManagerTab.shiftList.get(id);
      shift.clockOut();
    },

  };
});
