SysAdminApp.module('CheckoutLabTab', function (CheckoutLabTab, App, Backbone, Marionette, $, _) {
  //Define a composite view to be used to show the modal box that allows the user to update tasks
  CheckoutLabTab.OpenTaskListModalView = Backbone.Marionette.CompositeView.extend({

    //Define the tab for this view. div is default, we don't need to explicitly define it, but we are.
    tagName : "div",

    //When this view is instanciated, run this function
    initialize : function() {
      //use tpl to fetch the template, and pass it to handlebars
      this.template = Handlebars.compile(tpl.get('checkoutlab/openTaskListModal'));
    },

    //Define the events to be associated with this view
    events : {
      'click .save' : 'save',
      'click .cancel' : 'cancel',
    },

    onShow : function() {
      ///////////////////// configure checklist values ////////////////////
      if (this.model.get('cico_system_on') == 1) {
        $('#cico_system_on').prop('checked',true);
      }
      if (this.model.get('printers_on') == 1) {
        $('#printers_on').prop('checked',true);
      }
      if (this.model.get('print_stations_on') == 1) {
        $('#print_stations_on').prop('checked',true);
      }
      if (this.model.get('open_main_doors') == 1) {
        $('#open_main_doors').prop('checked',true);
      }
      if (this.model.get('open_side_doors') == 1) {
        $('#open_side_doors').prop('checked',true);
      }
    },

    //Function to be called when the save button is clicked
    save : function() {
      this.model.attributes.opened_by = $('#opened_by').val();
      //update model to values in checkbox
      this.model.attributes.cico_system_on = $('#cico_system_on').is(':checked') ? '1' : '0';
      this.model.attributes.printers_on = $('#printers_on').is(':checked') ? '1' : '0';
      this.model.attributes.print_stations_on = $('#print_stations_on').is(':checked') ? '1' : '0';
      this.model.attributes.open_main_doors = $('#open_main_doors').is(':checked') ? '1' : '0';
      this.model.attributes.open_side_doors = $('#open_side_doors').is(':checked') ? '1' : '0';

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
