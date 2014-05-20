AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  AVLogClassroomTab.RoomLogDetailsCompositeView = Backbone.Marionette.CompositeView.extend({
    
    itemView: AVLogApp.AVLogClassroomTab.RoomDetailsItemView,

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
      this.collection.bind('sort', this.render, this);
    },

    id:'roomLogList',

    itemViewContainer: "tbody",

    events: {
      'click #addNew' : 'addNew'
    },

    addNew: function() {
      AVLogClassroomTab.ClassroomController.showAVLogAddModal();
    }
    
  });
});