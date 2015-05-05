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
      MyHoursTab.MyShiftModalView.prototype.populateDatePickerWidget(this.model.get('clockIn'), $('#datetimeholder1'), '#modalclockin');
      MyHoursTab.MyShiftModalView.prototype.populateDatePickerWidget(this.model.get('clockOut'), $('#datetimeholder2'), '#modalclockout');

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
      MyHoursTab.MyHoursController.updateShift(MyHoursTab.MyShiftModalView.thisModel.get('id'), clockIn, clockOut,
          function(response) {
            errorResponse = JSON.parse(response);
            if (errorResponse.error === 'none') {
              //restores default width closes the modal box and fade 
              modalBox.css("width","");
              $('#fade').removeClass('fade');
              modalBox.removeClass('modalBox');
              //Close the modal view
              App.tabDiv.modalArea.close();
              //get updated shift list and diplays it
              MyHoursTab.MyHoursController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
            }
            else if (errorResponse.error === 'conflict') {
              conflicts = errorResponse.info;
              //alerts the user to conflicting times
              $('#confirmModal').html('You have overlapping shifts starting at:<div align="center">' + 
                  conflicts + '</div>Please edit the conflicting shifts before saving this one.');
              $('#confirmModal').dialog({                                                 
                modal:true,                                                               
                title: 'Invalid Clock In/Clock Out',                                      
                buttons: {                                                                
                  'Ok': function() {                                                      
                    $(this).dialog('close');                                              
                  }                                                                       
                },
              });
            } else {
              msg = errorResponse.info;
              //alerts the user to conflicting times
              $('#confirmModal').html(msg);
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
          }
      );
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

    populateDatePickerWidget : function(dateString, container, altField) {
      //makes date objects of the clockin and clockout time
      //Firefox needs the dates to be defined like this. It wouldn't recognize the dateTimeString of clockin/clockout
      var date = new Date(dateString.substr(0, 4), dateString.substr(5, 2) - 1, dateString.substr(8, 2), dateString.substr(11, 2), dateString.substr(14, 2), dateString.substr(17, 2));
      // if a datetimepicker exists, we need to destroy it before creating the new datetimepicker 
      // (datetimepickers probs have update methods, but I'm too lazy to look right now)
      if (container.children()) container.datetimepicker("destroy");  
      // loads the sliders and times into the divs with all necessary options 
      container.datetimepicker({
        //sets the text field for the time
        altField: altField,
        altFieldTimeOnly: false,
          //date formatting
        dateFormat: 'yy-mm-dd',
          //time formatting
        timeForamt: 'HH:mm:ss',
          //sets the inital time for the field
        hour: date.getHours(),
        minute: date.getMinutes(),
          //seconds are not shown by default. This will enable it
        showSecond: true,
        second: date.getSeconds(),
        defaultDate: date, 
      });
    },

      //automatically adjusts the time of the clockin sliders for any change in the text field and vice versa 
    adjustClockInSliders : function(e) {
      if (47 < e.which && e.which < 58) { // ignore non integer key presses
        var start = e.target.selectionStart, end = e.target.selectionEnd; // get the cursor's position in the text input element
        var cInDate = $('#modalclockin').val();
        // check that user put in valid date before creating new date widget
        var cInIsCompleteDateString = /^\d{4}[\/-]\d{2}[\/-]\d{2}\ \d{2}:\d{2}:\d{2}/.test(cInDate); 
        if (cInIsCompleteDateString) {
          MyHoursTab.MyShiftModalView.prototype.populateDatePickerWidget(cInDate, $('#datetimeholder1'), '#modalclockin');
        }
        e.target.setSelectionRange(start, end);  // restore cursor position
      }
    },

      //automatically adjusts the time of the clockout sliders for any change in the text field and vice versa
    adjustClockOutSliders : function(e) {
      if (47 < e.which && e.which < 58) { // ignore non integer key presses
        var start = e.target.selectionStart, end = e.target.selectionEnd;
        var cOutDate = $('#modalclockout').val();
        // check that user put in valid date before creating new date widget
        var cOutIsCompleteDateString = /^\d{4}[\/-]\d{2}[\/-]\d{2}\ \d{2}:\d{2}:\d{2}/.test(cOutDate);
        if (cOutIsCompleteDateString) {
          MyHoursTab.MyShiftModalView.prototype.populateDatePickerWidget(cOutDate, $('#datetimeholder2'), '#modalclockout');
        }
        e.target.setSelectionRange(start, end);
      }
    },

  });
});
