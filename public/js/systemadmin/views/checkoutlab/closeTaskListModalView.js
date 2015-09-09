SysAdminApp.module('CheckoutLabTab', function (CheckoutLabTab, App, Backbone, Marionette, $, _) {
  //Define a composite view to be used to show the modal box that allows the user to update tasks
  CheckoutLabTab.CloseTaskListModalView = Backbone.Marionette.CompositeView.extend({

    //Define the tab for this view. div is default, we don't need to explicitly define it, but we are.
    tagName : "div",

    //When this view is instanciated, run this function
    initialize : function() {
      //use tpl to fetch the template, and pass it to handlebars
      this.template = Handlebars.compile(tpl.get('checkoutlab/closeTaskListModal'));
    },

    //Define the events to be associated with this view
    events : {
      'click .save' : 'save',
      'click .cancel' : 'cancel',
    },

    onShow : function() {
      ///////////////////// configure checklist values ////////////////////
      if (this.model.get('cico_system_off') == 1) {
        $('#cico_system_off').prop('checked',true);
      }
      if (this.model.get('printers_off') == 1) {
        $('#printers_off').prop('checked',true);
      }
      if (this.model.get('print_stations_off') == 1) {
        $('#print_stations_off').prop('checked',true);
      }
      if (this.model.get('close_main_doors') == 1) {
        $('#close_main_doors').prop('checked',true);
      }
      if (this.model.get('close_side_doors') == 1) {
        $('#close_side_doors').prop('checked',true);
      }
      if (this.model.get('refill_printer_paper') == 1) {
        $('#refill_printer_paper').prop('checked',true);
      }
      if (this.model.get('push_in_chairs') == 1) {
        $('#push_in_chairs').prop('checked',true);
      }
      if (this.model.get('turn_off_machines') == 1) {
        $('#turn_off_machines').prop('checked',true);
      }
      if (this.model.get('recycle_prints') == 1) {
        $('#recycle_prints').prop('checked',true);
      }
      if (this.model.get('lock_cae_office_doors') == 1) {
        $('#lock_cae_office_doors').prop('checked',true);
      }
    },

    //Function to be called when the save button is clicked
    save : function() {
      this.model.attributes.closed_by = $('#closed_by').val();
      //update model to values in checkbox
      this.model.attributes.cico_system_off = $('#cico_system_off').is(':checked') ? '1' : '0';
      this.model.attributes.printers_off = $('#printers_off').is(':checked') ? '1' : '0';
      this.model.attributes.print_stations_off = $('#print_stations_off').is(':checked') ? '1' : '0';
      this.model.attributes.close_main_doors = $('#close_main_doors').is(':checked') ? '1' : '0';
      this.model.attributes.close_side_doors = $('#close_side_doors').is(':checked') ? '1' : '0';
      this.model.attributes.refill_printer_paper = $('#refill_printer_paper').is(':checked') ? '1' : '0';
      this.model.attributes.push_in_chairs = $('#push_in_chairs').is(':checked') ? '1' : '0';
      this.model.attributes.turn_off_machines = $('#turn_off_machines').is(':checked') ? '1' : '0';
      this.model.attributes.recycle_prints = $('#recycle_prints').is(':checked') ? '1' : '0';
      this.model.attributes.lock_cae_office_doors = $('#lock_cae_office_doors').is(':checked') ? '1' : '0';

      //Remove the fade overlay and modal box
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      //Close the modal box
      App.tabDiv.modalArea.close();
    },

    //Function to be called when the cancel button is clicked
    cancel : function() {
      //Remove the fade overlay and modal box
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      //Close the modal box
      App.tabDiv.modalArea.close();
    },

  });
});
