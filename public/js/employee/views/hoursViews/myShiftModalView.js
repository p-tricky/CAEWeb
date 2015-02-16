//Define module for the Shift Modal to live in.
EmployeeApp.module('MyHoursTab', function (MyHoursTab, App, Backbone, Marionette, $, _) {
  MyHoursTab.MyShiftModalView = Backbone.Marionette.CompositeView.extend({

  	tagName: 'div',

  	initialize : function() {
      this.template = Handlebars.compile(tpl.get('myHours/shiftModal'));
    },

    events : {
    	'click .save' : 'saveShift',
    	'click .delete' : 'deleteShift',
    	'click .cancel' : 'cancelAction'
    },

    //will run on loading
    onShow : function() {
    	var clockInDate = new Date(this.model.get('clockIn'));
    	var clockOutDate = new Date(this.model.get('clockOut'));

      console.log(clockInDate.getSeconds());

    	$('#datetimeholder1').datetimepicker({
            altField: '#modalclockin',
            altFieldTimeOnly: false,
            dateFormat: 'yy-mm-dd',
            timeForamt: 'HH:mm:getShiftsInRange',
            hour: clockInDate.getHours(),
            minute: clockInDate.getMinutes(),
            //timeSuffix: ':00',
            showSecond: true,
            second: clockInDate.getSeconds(),
        });
        $('#datetimeholder2').datetimepicker({
            altField: '#modalclockout',
            altFieldTimeOnly: false,
        	  dateFormat: 'yy-mm-dd',
            timeForamt: 'HH:mm:ss',
            hour: clockOutDate.getHours(),
            minute: clockOutDate.getMinutes(),
            showSecond: true,
            second: clockOutDate.getSeconds(),
        });

    	MyHoursTab.MyShiftModalView.thisModel = this.model;
    },

    saveShift : function() {
    	MyHoursTab.MyHoursController.updateShift(MyHoursTab.MyShiftModalView.thisModel.get('id'), $('#modalclockin').val(), $('#modalclockout').val());
    	$('#fade').removeClass('fade');
      	$('#modalBox').removeClass('modalBox');
      	//Close the modal view
      	App.tabDiv.modalArea.close();
      	MyHoursTab.MyHoursController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
    },

    deleteShift : function() {
    	$('#confirmModal').dialog({
    		modal: true,
    		text: "Are you sure you want to delete this shift?",
    		buttons: {
    			"Delete Shift": function() {
    				MyHoursTab.MyHoursController.deleteShift(MyHoursTab.MyShiftModalView.thisModel.get('id'));
    				$('#fade').removeClass('fade');
      				$('#modalBox').removeClass('modalBox');
      				//Close the modal view
      				App.tabDiv.modalArea.close();
      				$(this).dialog("close");
      				MyHoursTab.MyHoursController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
    			},
    			Cancel: function() {
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