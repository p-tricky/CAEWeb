//This view appears when editting or adding a new shift
SysAdminApp.module('VirusTrackerTab', function (VirusTrackerTab, App, Backbone, Marionette, $, _) {
  VirusTrackerTab.ScanDetailsModalView = Backbone.Marionette.Layout.extend({

    //sets the options and loads the template
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('virustracker/scanDetailsModalView'));
    },

    //defines the regions on the page
    regions: {
        userDropDownContent: '#virusUserDropDownContainer',
    },

    //gives the view an id tag for css
    id:'scanDetailsModalView',

     //event listeners; used for button clicks 
    events : {
    	'click .save' : 'saveScan',
    	'click .delete' : 'deleteScan',
    	'click .cancel' : 'cancelAction',
    },

    //will run on loading the modal
    onShow : function() {
      VirusTrackerTab.ScanDetailsModalView.prototype.populateDatePickerWidget($('#scan_date'), this.model.get('scan_date'));
      var virusUsers = [];
      SysAdminApp.VirusUserTab.VirusUserController.getVirusUser(function() {
        SysAdminApp.VirusUserTab.usersList.forEach( function(vUser) {
          virusUsers.push({
            value: vUser.get('id'),
            label: vUser.get('user_name')
          });
        });
      });
      $('#virusUserAutoCompleteName').autocomplete({
        minLength: 0,
        source: virusUsers,
        focus: function(event, ui) {
          $('#virusUserAutoCompleteName').val(ui.item.label);
          return false;
        },
        select: function(event, ui) {
          $( "#virusUserAutoCompleteName" ).val( ui.item.label );
          $( "#virusUserID" ).val( ui.item.value );
          return false;
        }
      });
      $('#virusUserAutoCompleteName').val(this.model.get('user_name'));
      $('#virusUserID').val(this.model.get('uid'));
    },

    //saves the shift to the data base with the new clockin and clockout times.
    saveScan : function() {
      var fields = {
        id: this.model.get('id'),
        user_name: $('#virusUserAutoCompleteName').val(), 
        uid: $('#virusUserID').val(),
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
      var result = this.model.saveScan(fields);
      if (result) {
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        App.tabDiv.modalArea.close();
      }
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


    //when attempting to delete the scan
    deleteScan : function() {
      //defines this for easy reference
      var self = this;
      //makes the confirm modal
      var confirmDialogue = $('#confirmModalBox');
      //sets the text for the confirm modal
      confirmDialogue.html("Are you sure you want to delete this user?");
      //this loads the modal and the options
      confirmDialogue.dialog({
        modal: true,
        title: 'Delete User',
        //'no' button
        buttons: {
          'No': function() {
            //doesn't delete the user
            $(this).dialog('close');
          },
          //deletes the user
          'Yes': function() {
            //closes the confirmModal
            $(this).dialog('close');
            //destroys the selected model
            self.model.destroy({
              wait : true,
              //if successful closes the modal
              success : function() {
                $('#fade').removeClass('fade');
                $('#modalBox').removeClass('modalBox');
                App.tabDiv.modalArea.close();
              },
              //if there is an error, it alerts the user to the error
              error : function(m,e,o) {
                var errorAlert = $('#confirmModalBox');
                errorAlert.html("Sorry, the deletion failed.");
                errorAlert.dialog({
                  modal: true,
                  title: 'Delete Error',
                  buttons: {
                    'Ok': function() {
                      $(this).dialog('close');
                    }
                  }
                });
              }
            });
            //gets a new scan list and displays it
            VirusTrackerTab.VirusTrackerController.getVirusTracker(VirusTrackerTab.VirusTrackerController.showVirusTrackerTable);
          },
        }
      });
    },

    populateDatePickerWidget : function(container, dateString) {
      //makes date objects of the clockin and clockout time
      //Firefox needs the dates to be defined like this. It wouldn't recognize the dateTimeString of clockin/clockout
      // if a datepicker exists, we need to destroy it before creating the new datepicker 
      // (datepickers probs have update methods, but I'm too lazy to look right now)
      if (container.children()) container.datepicker("destroy");  
      // loads the sliders and times into the divs with all necessary options 
      var dateParts = dateString.split("-");
      var jsDate = new Date(dateParts[0], dateParts[1]-1, dateParts[2]);
      container.datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
      });
      container.datepicker('setDate', jsDate);
    },

  });
});
