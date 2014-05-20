AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  AVLogClassroomTab.AVLogAddModalView = Backbone.Marionette.ItemView.extend({

    tagName : "div",

    initialize : function() {
      this.template = Handlebars.compile(tpl.get('avlogAddModal'));
    },

    events : {
      'click .save' : 'saveItem',
      'click .cancel' : 'cancelAction'
    },

    saveItem : function() {
      var fields = {
        room_name:$('#room_name').val(),
        message : $('#messageTextarea').val(),
      };
      console.log(fields);
      var result = this.model.addItem(fields);
      if (result) {
        $('#fade').removeClass('fade');
        $('#modalBox').removeClass('modalBox');
        App.AVLogClassroomTab.roomLogCollection.sort();
        App.tabDiv.modalArea.close();
      }
    },

    cancelAction : function() {
      $('#fade').removeClass('fade');
      $('#modalBox').removeClass('modalBox');
      App.tabDiv.modalArea.close();
    }
  });
});