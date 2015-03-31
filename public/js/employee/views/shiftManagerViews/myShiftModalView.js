//Define module for the Shift Modal to live in.
EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.MyShiftModalView = Backbone.Marionette.CompositeView.extend({

    //define the tag that this view lives in
  	tagName: 'div',

    //gets the template for the modal
  	initialize : function() {
      this.template = Handlebars.compile(tpl.get('shiftManager/shiftModal'));
    },

    //event listeners; used for button clicks 
    events : {
    	'click .save' : 'saveShift',
    	'click .delete' : 'deleteShift',
    	'click .cancel' : 'cancelAction'
    },

    //will run on loading
    onShow : function() {
      //makes date objects of the clockin and clockout time
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
            showSecond: true,
            second: clockOutDate.getSeconds(),
            defaultDate: clockOutDate,
        });

      //needed for other functions in the view
    	ShiftManagerTab.MyShiftModalView.thisModel = this.model;
    },

    //saves the shift to the data base with the new clockin and clockout times.
    saveShift : function() {
      //makes sure that the clockin is before the clockout
      if ($('#modalclockin').val() <= $('#modalclockout').val())
      {
        //calls the ajax to modify the shift
        ShiftManagerTab.ShiftManagerController.updateShift(ShiftManagerTab.MyShiftModalView.thisModel.get('id'), $('#modalclockin').val(), $('#modalclockout').val());
        //closes the modal box and fade
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        //Close the modal view
        App.tabDiv.modalArea.close();
        //get updated shift list and diplays it
        ShiftManagerTab.ShiftManagerController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
      }
    	else 
      {
        //alerts the user to invalid times.
        $('#confirmModal').html('Clock In time must be before the Clock Out Time.');
        $('#confirmModal').dialog({
          modal:true,
          title: 'Invalid Clock In/Clock Out',
          buttons: {
            'Ok': function() {
              $(this).dialog('close');
            }
          },
        });
      }


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
    				ShiftManagerTab.ShiftManagerController.deleteShift(ShiftManagerTab.MyShiftModalView.thisModel.get('id'));
            //closes the fade and modal box
    				$('#fade').removeClass('fade');
      			$('#modalBox').removeClass('modalBox');
      			//Close the modal view
      			App.tabDiv.modalArea.close();
            //closes the dialog
      			$(this).dialog("close");
            //get updated shift list and diplays it
      			ShiftManagerTab.ShiftManagerController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
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
      //Remove the fade overlay and modal box
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      //Close the modal view
      App.tabDiv.modalArea.close();
    }

  });
});