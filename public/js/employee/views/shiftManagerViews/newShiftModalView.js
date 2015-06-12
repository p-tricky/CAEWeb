//This view appears when editting or adding a new shift
EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.NewShiftModalView = Backbone.Marionette.Layout.extend({

    //sets the options and loads the template
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('shiftManager/newShiftModalView'));
    },

    //defines the regions on the page
    regions: {
        userDropDownContent: '#userDropDownContainer',
    },

    //gives the view an id tag for css
    id:'newShiftModalView',

     //event listeners; used for button clicks 
    events : {
    	'click .save' : 'saveShift',
    	'click .cancel' : 'cancelAction',
      'keyup #modalclockin' : 'adjustClockInSliders',
      'keyup #modalclockout': 'adjustClockOutSliders',
    },

    //will run on loading the modal
    onShow : function() {
      //debugger;
      ShiftManagerTab.NewShiftModalView.prototype.populateDatePickerWidget($('#datetimeholder1'), '#modalclockin');
      ShiftManagerTab.NewShiftModalView.prototype.populateDatePickerWidget($('#datetimeholder2'), '#modalclockout');
    },

    //saves the shift to the data base with the new clockin and clockout times.
    saveShift : function() {
      var clockIn = $('#modalclockin').val();
      var clockOut = $('#modalclockout').val();
      var modalBox = $('#modalBox');
      ShiftManagerTab.ShiftManagerController.newShift($("select.select-user-id").val(), clockIn, clockOut,
          function(response) {
            errorResponse = JSON.parse(response);
            if (errorResponse.error === 'none') {
              //restores default width closes the modal box and fade 
              $('#fade').removeClass('fade');
              modalBox.removeClass('modalBox');
              //Close the modal view
              App.tabDiv.modalArea.close();
              //get updated shift list and diplays it
              ShiftManagerTab.ShiftManagerController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
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

    //Function that is called when the cancel button is clicked
    //closes the modal
    cancelAction : function() {
      //Remove the fade overlay and modal box
      var modalBox = $('#modalBox');
      modalBox.removeAttr("style");
      $('#fade').removeClass('fade');
      modalBox.removeClass('modalBox');
      //Close the modal view
      App.tabDiv.modalArea.close();
    },

    populateDatePickerWidget : function(container, altField) {
      //makes date objects of the clockin and clockout time
      //Firefox needs the dates to be defined like this. It wouldn't recognize the dateTimeString of clockin/clockout
      var date = new Date();
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
          ShiftManagerTab.MyShiftModalView.prototype.populateDatePickerWidget(cInDate, $('#datetimeholder1'), '#modalclockin');
        }
        e.target.setSelectionRange(start, end);  // restore cursor position
      }
    },

    //automatically adjusts the time of the clockout sliders for any change in the text field and vice versa
    adjustClockOutSliders : function(e) {
      if (47 < e.which && e.which < 58) { // ignore non integer key presses
        var start = e.target.selectionStart, end = e.target.selectionEnd; // get the cursor's position in the text input element
        var cOutDate = $('#modalclockout').val();
        // check that user put in valid date before creating new date widget
        var cOutIsCompleteDateString = /^\d{4}[\/-]\d{2}[\/-]\d{2}\ \d{2}:\d{2}:\d{2}/.test(cOutDate);
        if (cOutIsCompleteDateString) {
          ShiftManagerTab.MyShiftModalView.prototype.populateDatePickerWidget(cOutDate, $('#datetimeholder2'), '#modalclockout');
        }
        e.target.setSelectionRange(start, end);
      }
    },

  });
});
