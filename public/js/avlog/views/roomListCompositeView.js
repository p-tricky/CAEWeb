AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  AVLogClassroomTab.RoomListCompositeView = Backbone.Marionette.CompositeView.extend({
    
    itemView: AVLogApp.AVLogClassroomTab.RoomItemView,

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    id:'roomListTable',

    itemViewContainer: "tbody"
    
  });
});