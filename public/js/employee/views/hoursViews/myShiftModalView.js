//Define module for the Shift Modal to live in.
EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.MyShiftModalView = Backbone.Marionette.CompositeView.extend({

    //define the tag that this view lives in
  	tagName: 'div',

    //gets the template for the modal
  	initialize : function() {
      this.template = Handlebars.compile(tpl.get('myHours/shiftModal'));
    },

    //event listeners; used for button clicks 
    events : {
    	'click .save' : 'saveShift',
    	'click .delete' : 'deleteShift',
    	'click .cancel' : 'cancelAction',
      'keyup #modalclockin' : 'adjustClockInSliders',
      'keyup #modalclockout': 'adjustClockOutSliders',
    },

    //will run on loading
    onShow : function() {
      //makes date objects of the clockin and clockout time
      //Firefox needs the dates to be defined like this. It wouldn't recognize the dateTimeString of clockin/clockout
      var clockInDate = new Date(this.model.get('clockIn').substr(0, 4), this.model.get('clockIn').substr(5, 2) - 1, this.model.get('clockIn').substr(8, 2), this.model.get('clockIn').substr(11, 2), this.model.get('clockIn').substr(14, 2), this.model.get('clockIn').substr(17, 2));
      var clockOutDate = new Date(this.model.get('clockOut').substr(0, 4), this.model.get('clockOut').substr(5, 2) - 1, this.model.get('clockOut').substr(8, 2), this.model.get('clockOut').substr(11, 2), this.model.get('clockOut').substr(14, 2), this.model.get('clockOut').substr(17, 2));

      //loads the sliders and times into the divs with all necessary options 
    	$('#datetimeholder1').datetimepicker({
            //sets the text field for the time
            altField: '#modalclockin',
            altFieldTimeOnly: false,
            //date formatting
            dateFormat: 'yy-mm-dd',
            //time formatting
            timeForamt: 'HH:mm:ss',
            //sets the inital time for the field
            hour: clockInDate.getHours(),
            minute: clockInDate.getMinutes(),
            //seconds are not shown by default. This will enable it
            showSecond: true,
            second: clockInDate.getSeconds(),
            defaultDate: clockInDate, 
        });
      $('#datetimeholder2').datetimepicker({
            //sets the text field for the time
            altField: '#modalclockout',
            altFieldTimeOnly: false,
            //date formatting
        	  dateFormat: 'yy-mm-dd',
            //time formatting
            timeForamt: 'HH:mm:ss',
            //sets the inital time for the field
            hour: clockOutDate.getHours(),
            minute: clockOutDate.getMinutes(),
            //seconds are not shown by default. This will enable it
            showSecond: true,
            second: clockOutDate.getSeconds(),
            defaultDate: clockOutDate,
        });

      //needed for other functions in the view
      //enables easy access to "this" without conflicts
    	MyHoursTab.MyShiftModalView.thisModel = this.model;
    },

    //saves the shift to the data base with the new clockin and clockout times.
    saveShift : function() {
      //makes sure that the clockin is before the clockout
      var clockIn = $('#modalclockin').val();
      var clockOut = $('#modalclockout').val();
      var modalBox = $('#modalBox');
      if (!clockOut) clockOut = "0000-00-00 00:00:00";
      //calls the ajax to modify the shift
      MyHoursTab.MyHoursController.updateShift(MyHoursTab.MyShiftModalView.thisModel.get('id'), clockIn, clockOut);
      //restores default width closes the modal box and fade 
      modalBox.css("width","");
      $('#fade').removeClass('fade');
      modalBox.removeClass('modalBox');
      //Close the modal view
      App.tabDiv.modalArea.close();
      //get updated shift list and diplays it
      MyHoursTab.MyHoursController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
    },

    //Deletes the current shift
    deleteShift : function() {
      //sets the current text of the dialog box. Must be done before calling the dialog
      $('#confirmModal').html('Are you sure you want to delete this shift?');
      //calls the dialog box to ensure the user wants to delete the shift
    	$('#confirmModal').dialog({
    		modal: true,
        //sets the title
    		title: 'Delete Shift',
        //creates two buttons, Delete Shift and Cancel
    		buttons: {
          //deletes the shift and closes the dialog, modal box, and fade
    			"Delete Shift": function() {
            //calls the ajax to delete the shift
    				MyHoursTab.MyHoursController.deleteShift(MyHoursTab.MyShiftModalView.thisModel.get('id'));
            //restores default width and closes the fade and modal box
            var modalBox = $('#modalBox');
            modalBox.css("width","");
    				$('#fade').removeClass('fade');
      			modalBox.removeClass('modalBox');
      			//Close the modal view
      			App.tabDiv.modalArea.close();
            //closes the dialog
      			$(this).dialog("close");
            //get updated shift list and diplays it
      			MyHoursTab.MyHoursController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
    			},
    			Cancel: function() {
            //closes the dialog
    				$(this).dialog("close");
    			}
    		}
    	});
    },

    //Function that is called when the cancel button is clicked
    cancelAction : function() {
      //Remove the fade overlay and modal box and restore default width
      var modalBox = $('#modalBox');
      modalBox.css("width","");
      $('#fade').removeClass('fade');
      modalBox.removeClass('modalBox');
      //Close the modal view
      App.tabDiv.modalArea.close();
    },

    adjustClockInSliders : function() {
      /*
    	$('#datetimeholder1').datetimepicker({
        )}
        */
    },

  });
});
