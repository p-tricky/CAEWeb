//Put the modal view into the AVLogClassroomTab Module even though it is used for all of the Tabs
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {

  //Define a new view that will be used to display a modal box for user input about adding a new log entry.
  AVLogClassroomTab.AVLogAddRoomModalView = Backbone.Marionette.ItemView.extend({

    //Tagname is DIV by default, but I redefined it to be explicit.
    tagName : "div",

    //On initalize get the template from the tpl function in util.js, and pass it to hanlebars.
    initialize : function() {
      this.template = Handlebars.compile(tpl.get('avlogAddRoomModal'));
    },

    //Define events associated with the save and cancel buttons of the template
    events : {
      'click .save' : 'saveRoom',
      'click .cancel' : 'cancel'
    },

    //Save function that is called when the save button is clicked
    saveRoom : function() {
      if (this.validate($('#room_name').val()))
      {
        //get the data to be saved from the input fields
        var fields = {
          room_name:$('#room_name').val()
        };

        $.ajax({
          type: "GET",
          url: 'api/createroom',
          data: {name: $('#room_name').val()}
        }).done(function(response) {
          if (response == "Room Already Exists")
          {
            alert('This Room already exists');
          } else {
            AVLogClassroomTab.otherRoomList.fetch({data: {type:'5'}});
            AVLogClassroomTab.otherRoomList.reset();
            $('#fade').removeClass('fade');
            $('#modalBox').removeClass('modalBox');
            App.tabDiv.modalArea.close();
          }
        });

      } else {
        alert('Invalid Name. Must be like B-125');
      }
      
    },

    //User didn't feel like creating a new entry, close the modal box.
    cancel : function() {
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      App.tabDiv.modalArea.close();
    },

    validate: function(value) {
      if (/[A-G]-[1|2]\d{2}/.test(value)) 
        return true;
      else return false;
    }
    
  });
});