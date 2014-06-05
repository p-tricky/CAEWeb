AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  AVLogClassroomTab.RoomDetailsItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('_roomDetailRow'));
    },

    attributes : function(){
      var classValue = AVLogClassroomTab.classroomList.indexOf(this.model);
      var classProperty = '';
      if ((Number(classValue)%2) === 0) {
        classProperty = 'even';
      } else {
        classProperty = 'odd';
      }
      return {
        id : this.model.get('id'),
        class : classProperty + ' roomDetailsRow'
      };
    },

    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this.el;
    },

  });
});