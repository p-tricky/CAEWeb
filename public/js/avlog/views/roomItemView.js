AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  AVLogClassroomTab.RoomItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('_roomRow'));
    },

    attributes : function(){
      var classValue = this.model.get('id');
      var classProperty = '';
      if ((Number(classValue)%2) === 0) {
        classProperty = 'even';
      } else {
        classProperty = 'odd';
      }
      return {
        id : this.model.get('id'),
        class : classProperty + ' roomRow'
      };
    },

    events : {
      'click' : 'showLog'
    },

    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this.el;
    },

    showLog : function(e) {
      if (typeof(AVLogClassroomTab.selectedElement) === 'undefined') {
        AVLogClassroomTab.selectedElement = e.delegateTarget;
        $(AVLogClassroomTab.selectedElement).addClass('selectedRoom');
      } else {
        $(AVLogClassroomTab.selectedElement).removeClass('selectedRoom');
        AVLogClassroomTab.selectedElement = e.delegateTarget;
        $(AVLogClassroomTab.selectedElement).addClass('selectedRoom');
      }
      AVLogClassroomTab.ClassroomController.getLogForRoom(this.model,AVLogClassroomTab.ClassroomController.showRoomDetails);
    }

  });
});