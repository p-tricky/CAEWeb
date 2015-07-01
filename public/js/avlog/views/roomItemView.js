//Put the room specific ItemView into the AVLogClassroomTab Module even though it is used for all of the rooms in all of the Tabs
AVLogApp.module('AVLogClassroomTab', function (AVLogClassroomTab, App, Backbone, Marionette, $, _) {

  //Define the ItemView that will be used in conjuction with the CompositeView to render the table.
  //The counterpart view is the roomListCompositeView.js  
  AVLogClassroomTab.RoomItemView = Backbone.Marionette.ItemView.extend({

    //The tagname is a tr. The composite view is a tbody. It only makes sense that the tbody will
    //contain many of these tr views. In fact it will be a tr for each model in the collection.
    tagName: 'tr',

    //On initalize get the passed in options if there are any. I don't believe any are passed in, but
    //if they need to be at a later time, they can be.
    initialize : function(options) {
      this.options = options || {};
      //Get the template for the view from the tpl function in util.js, and pass it to hanalebars.
      this.template = Handlebars.compile(tpl.get('_roomRow'));
    },

    //This function will add addtional properties to the tr element such as classes.
    //The main reason for this function is to assign an alternating even or odd class name to the
    //element so that css can alternate the trs in the table.
    attributes : function(){
      var classValue = this.model.get('roomNum');
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

    //Setup events that may happen to the template
    events : {
      'click' : 'showLog'
    },

    //Function that will get the room that was selected from this tr view, and then display the
    //associated details about the room.
    showLog : function(e) {
      //Check to see if we are already keeping track of a selectedElement
      if (typeof(AVLogClassroomTab.selectedElement) === 'undefined') {
        //Get the element that was selected
        AVLogClassroomTab.selectedElement = e.delegateTarget;
        //Add a class to the selected row so that CSS will change the color of it.
        $(AVLogClassroomTab.selectedElement).addClass('selectedRoom');
      } else { //Already have a selected item. Need to remove the class before adding it to another.
        //Remove the class from the old selected element
        $(AVLogClassroomTab.selectedElement).removeClass('selectedRoom');
        //store the newly selected element as the selected one.
        AVLogClassroomTab.selectedElement = e.delegateTarget;
        //Add a class to the selected row so that CSS will change the color it.
        $(AVLogClassroomTab.selectedElement).addClass('selectedRoom');
      }
      //Call the getLogForRoom function and pass it the model of the room that was clicked, and a callback function.
      //In this case, the callback function will be the showRoomDetails function. We don't want to show the details until
      //we are done getting the log for the room.
      AVLogClassroomTab.ClassroomController.getLogForRoom(this.model,AVLogClassroomTab.ClassroomController.showRoomDetails);
    }

  });
});