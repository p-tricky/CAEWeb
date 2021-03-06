SysAdminApp.module('OpenCloseChecklistTab', function (OpenCloseChecklistTab, App, Backbone, Marionette, $, _) {
  //Define a composite view to be used to show the modal box that allows the user to add a new
  //user to the virus users. 
  OpenCloseChecklistTab.OpenCloseChecklistDetailsModalView = Backbone.Marionette.CompositeView.extend({

    //Define the tab for this view. div is default, we don't need to explicitly define it, but we are.
    tagName : "div",

    //When this view is instanciated, run this function
    initialize : function() {
      //use tpl to fetch the template, and pass it to handlebars
      this.template = Handlebars.compile(tpl.get('openclosechecklist/openCloseChecklistDetailsModal'));
    },

    //Define the events to be associated with this view
    events : {
      'click .save' : 'save',
      'click .cancel' : 'cancel',
      'click .delete' : 'delete',
    },

    onShow : function() {
      OpenCloseChecklistTab.OpenCloseChecklistDetailsModalView.prototype.populateDatePickerWidget($('#task_date'), this.model.get('task_date'));
    },

    //Function to be called when the save button is clicked
    save : function() {
      //Get the values from the fields and put them in an object to pass to the model
      this.model.attributes.task_date = $('#task_date').val();
      //Send the object of parameters to the model to be saved with the addUser function.
      //The result will be returned to the result variable
      var result = this.model.updateModel();
      //If the save was successful
      if (result) {
        //Remove the fade overlay and modalbox
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        //close the modal box view
        App.tabDiv.modalArea.close();
      }
    },

    //Function to be called when the cancel button is clicked
    cancel : function() {
      //Remove the fade overlay and modal box
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      //Close the modal box
      App.tabDiv.modalArea.close();
    },

    delete : function() {
      //deletes the current user
      this.model.destroy();
      //Remove the fade overlay and modal box
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      //Close the modal box
      App.tabDiv.modalArea.close();
    },

    populateDatePickerWidget : function(container, dateString) {
      //makes date objects of the clockin and clockout time
      //Firefox needs the dates to be defined like this. It wouldn't recognize the dateTimeString of clockin/clockout
      // if a datepicker exists, we need to destroy it before creating the new datepicker 
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
