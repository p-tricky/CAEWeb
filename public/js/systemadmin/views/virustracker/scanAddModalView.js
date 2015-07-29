//This view appears when editting or adding a new shift
SysAdminApp.module('VirusTrackerTab', function (VirusTrackerTab, App, Backbone, Marionette, $, _) {
  VirusTrackerTab.ScanAddModalView = Backbone.Marionette.Layout.extend({

    //sets the options and loads the template
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('virustracker/scanAddModalView'));
    },

    //defines the regions on the page
    regions: {
        userDropDownContent: '#virusUserDropDownContainer',
    },

    //gives the view an id tag for css
    id:'scanAddModalView',

     //event listeners; used for button clicks 
    events : {
    	'click .save' : 'addScan',
    	'click .cancel' : 'cancelAction',
    },

    //will run on loading the modal
    onShow : function() {
      VirusTrackerTab.ScanAddModalView.prototype.populateDatePickerWidget($('#scan_date'));
    },

    //saves the shift to the data base with the new clockin and clockout times.
    addScan : function() {
      var dropDown = $('.select-virus-user-id option:selected');
      var fields = {
        user_name: dropDown.text(),
        uid: dropDown.val(),
        mac_addr: $('#mac_addr').val(),
        scan_date: $('#scan_date').datepicker('getDate').toISOString().substring(0,10),
        room_number: $('#room_number').val(),
        cpu_desc: $('#cpu_desc').val(),
        troj_mal: $('#troj_mal').val(),
        pups: $('#pups').val(),
        notes: $('#notes').val(),
        scanned_by: $('#scanned_by').val(),
      };

      //TODO: only close modal view if save succeeds
      var result = this.model.addScan(fields);
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

    populateDatePickerWidget : function(container) {
      //makes date objects of the clockin and clockout time
      //Firefox needs the dates to be defined like this. It wouldn't recognize the dateTimeString of clockin/clockout
      // if a datepicker exists, we need to destroy it before creating the new datepicker 
      // (datepickers probs have update methods, but I'm too lazy to look right now)
      if (container.children()) container.datepicker("destroy");  
      // loads the sliders and times into the divs with all necessary options 
      var jsDate = new Date();
      container.datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
      });
      container.datepicker('setDate', jsDate);
    },

  });
});
