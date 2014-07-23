//Put the room specific ItemView into the AVLogClassroomTab Module even though it is used for all of the rooms in all of the Tabs
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {
  
  //Define the CompositeView that will be used in conjuction with the ItemView to render the table.
  //The counterpart view is the roomDetailsItemView.js  
  AVLogClassroomTab.RoomLogDetailsCompositeView = Backbone.Marionette.CompositeView.extend({

    //Define the ItemView counterpart to be used with this view.    
    itemView: AVLogApp.AVLogClassroomTab.RoomDetailsItemView,

    //On initialize get any passed in options. In this case the template name is being passed in with a
    //key of contentName
    initialize : function(options) {
      this.options = options || {};
      //Get the template name that is passed in as a parameter, use tpl from util.js to get the actual tempalte
      //then send the template to handlebars
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
      //Bind the collection so that when it is sorted, it also gets re-rendered.
      this.collection.bind('sort', this.render, this);
    },

    //Give this DIV an id
    id:'roomLogList',

    //Define the element within the template that the ItemViews should be rendered within
    itemViewContainer: "tbody",

    //Setup events that may happen to the template
    events: {
      'click #addNew' : 'addNew' //on click of addNew, call addNew
    },

    //Display the modal box that can used to enter a new log entry
    addNew: function() {
      AVLogClassroomTab.ClassroomController.showAVLogAddModal();
    }
    
  });
});