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
        	ShiftManagerTab.shiftList = new ShiftManagerTab.ShiftCollection();
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

    getUserCollection : function(callback) {
        ShiftManagerTab.userList = new ShiftManagerTab.UserCollection();
        ShiftManagerTab.userList.fetch({success : callback});
    },

  	//retrieves shifts in specified range
    getShiftsInRange : function(rangeStart, rangeEnd) {
      //if search value is not empty
      if ($('#searchText').val() !== '')
      {
        //sends the string to escapeHTML inorder to sanitize the special characters in the string 
        var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
        //gets a new shiftList that is sorted and only contains shifts with the searched for term
        ShiftManagerTab.shiftList.fetch({data: { start: rangeStart, end: rangeEnd, sort: ShiftManagerTab.sort, search: input}});
        //have to reset the shiftList to redisplay in the list
        ShiftManagerTab.shiftList.reset();
      }
      //if the text area is empty,
      else 
      {
        //gets a new shiftList that doesn't have any search term
        ShiftManagerTab.shiftList.fetch({data: { start: rangeStart, end: rangeEnd, sort: ShiftManagerTab.sort}});
        //have to reset the shiftList to redisplay in the list
        ShiftManagerTab.shiftList.reset();
      }
    },

  	//used to show a modal box to modify the selected shift
    showShiftModal : function(theModel) {
      //debugger;
        //dims the background material
        $('#fade').addClass('fade');
        //shows the modal that allows users to edit shifts
        $('#modalBox').addClass('modalBox');
        var shiftModalView = new ShiftManagerTab.MyShiftModalView({model: theModel});
        App.tabDiv.modalArea.show(shiftModalView);
        //if the shift that is being edited is still clocked in
        if (theModel.get('clockOut') === "0000-00-00 00:00:00") {
          //removes all of the clockout options that wont be used
          var modalBox = $('#modalBox');
          $('#shiftManagerShiftModalClockOutLabel').remove();
          $('#modalclockout').parent().remove();
          $('#datetimeholder2').remove();
          $('.div-table-col-leftBtns').width('auto');
          $('.div-table-col-rightBtns').width('auto');
          modalBox.width(335);
          //center
          modalBox.css({
            "position": "absolute",
            "left": (((modalBox.parent().width() - modalBox.outerWidth()) / 2) + modalBox.parent().scrollLeft() + "px"),
          });
        } 
    },

    showNewShift: function(theModel) {
        //dims the background material
        $('#fade').addClass('fade');
        //shows the modal that allows users to edit shifts
        $('#modalBox').addClass('modalBox');
        var newShiftModalView = new ShiftManagerTab.NewShiftModalView({'newShift':theModel.attributes.newShift});
        App.tabDiv.modalArea.show(newShiftModalView);
        var shiftModalView = new ShiftManagerTab.MyShiftModalView({model: theModel});
        newShiftModalView.shiftContent.show(shiftModalView);
        var users = ShiftManagerTab.ShiftManagerController.getUserCollection(function() {
          var dropDown = new ShiftManagerTab.UserCompositeView({collection: ShiftManagerTab.userList,'contentName':'shiftManager/userDropDown'});
          newShiftModalView.userDropDownContent.show(dropDown);
        });
    },

  	//called by myShiftModalView in order to update a shift's clockin and clockout
    updateShift : function(id, eid, clockin, clockout, callback) {
        $.ajax({
            url: 'api/updateshift',
            data: {id: id, eid: eid, clockin: clockin, clockout: clockout},
            wait: true
        }).done(function(response) {
          if (response && callback) callback(response);
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
        //creates the ShiftFilter view and saves it as a variable
        var filterContent = new ShiftManagerTab.ShiftFilterView({model: theModel,'contentName': 'shiftManager/shiftFilter'});
        //shows the shiftFilterView in the shiftFilterSection that is defined in the shiftManagerContent
        EmployeeApp.shiftManagerContent.shiftFilterSection.show(filterContent);
        //creates the ShiftSearch view and saves it as a variable
        var searchContent = new ShiftManagerTab.ShiftSearchView({'contentName': 'shiftManager/shiftSearch'});
        //shows the shiftSearchView in the shiftFilterSection that is defined in the shiftManagerContent
        EmployeeApp.shiftManagerContent.shiftSearchSection.show(searchContent);
        $('#datepicker1').datepicker();
        $('#datepicker2').datepicker();
        //shows the newShift view
        var newShiftContent = new ShiftManagerTab.NewShiftView({'contentName': 'shiftManager/newShift'});
        EmployeeApp.shiftManagerContent.newShiftSection.show(newShiftContent);
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
        if ($('#searchText').val() !== '')
        {
          //sets input variable and gets the new shiftList
          var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
          ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
        }
        else
          //if the earch bar is empty, it gets a list without a search string
          ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
        //have to reset the shiftList to redisplay in the list
        ShiftManagerTab.shiftList.reset();
    },

    //will remove all arrows in the column headers of the shift list
    clearSort : function() {
        $('#name').html('Name');
        $('#timeIn').html('Time In');
        $('#timeOut').html('Time Out');
        $('#timeRec').html('Hours');
        $('#clockoutCol').html('Clock Out');
    },    

    //will convert and sanitize a string
    escapeHtml : function(string) {
      entityMap = {
          "&": "&amp",
          "<": "&lt",
          ">": "&gt",
          '"': '&quot',
          "'": '&#39',
          "/": '&#x2F',
          "~": '&#732'
        };
      return String(string).replace(/[&<>"'\~/]/g, function (s) {
          return entityMap[s];
      });
    }
  };
});
