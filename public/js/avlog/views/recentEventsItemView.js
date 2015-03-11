//Put the room specific ItemView into the AVLogClassroomTab Module even though it is used for all of the rooms in all of the Tabs
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {

  //Define the ItemView that will be used in conjuction with the CompositeView to render the table.
  //The counterpart view is the roomLogDetailsCompositeView.js  
  AVLogClassroomTab.RecentEventsItemView = Backbone.Marionette.ItemView.extend({

    //The tagname is a tr. The composite view is a tbody. It only makes sense that the tbody will
    //contain many of these tr views. In fact it will be a tr for each model in the collection.
    tagName: 'tr',

    //On initalize get the passed in options if there are any. I don't believe any are passed in, but
    //if they need to be at a later time, they can be.
    initialize : function(options) {
      this.options = options || {};
      //Get the template for the view from the tpl function in util.js, and pass it to hanalebars.
      this.template = Handlebars.compile(tpl.get('_recentEventsDetailRow'));
    }



  });
});