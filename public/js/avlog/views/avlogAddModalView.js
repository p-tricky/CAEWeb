//Put the modal view into the AVLogClassroomTab Module even though it is used for all of the Tabs
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {

  //Define a new view that will be used to display a modal box for user input about adding a new log entry.
  AVLogClassroomTab.AVLogAddModalView = Backbone.Marionette.ItemView.extend({

    //Tagname is DIV by default, but I redefined it to be explicit.
    tagName : "div",

    //On initalize get the template from the tpl function in util.js, and pass it to hanlebars.
    initialize : function() {
      this.template = Handlebars.compile(tpl.get('avlogAddModal'));
    },

    //Define events associated with the save and cancel buttons of the template
    events : {
      'click .save' : 'saveItem',
      'click .cancel' : 'cancelAction'
    },

    //Save function that is called when the save button is clicked
    saveItem : function() {
      //get the data to be saved from the input fields
      var fields = {
        room_name:$('#room_name').val(),
        message : $('#messageTextarea').val(),
      };

      //Pass the data to the addItem function of the model. Over in the model definition
      //you can see that this will do a save of the new information and return either true or
      //false depending on if it is successfull or not.
      var result = this.model.addItem(fields);
      //If successfull, remove the modal box.
      if (result) {
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        //Sort the collection so that the new entry is at the top of the display
        App.AVLogClassroomTab.roomLogCollection.sort();
        App.tabDiv.modalArea.close();
      }
    },

    //User didn't feel like creating a new entry, close the modal box.
    cancelAction : function() {
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      App.tabDiv.modalArea.close();
    }
  });
});