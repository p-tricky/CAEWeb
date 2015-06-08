//this is the view for the user collection
EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.UserCompositeView = Backbone.Marionette.CompositeView.extend({
    
    //define the items that will populate the view
    itemView: EmployeeApp.ShiftManagerTab.UserItemView,

    //set the options and load the template 
    initialize : function(options) {
      this.options = options || {};
      //this.template = Handlebars.compile(tpl.get(this.options.contentName));
      this.template = Handlebars.compile(tpl.get('shiftManager/userDropDown'));
    },

    //defines the container for the item views
    itemViewContainer: "select",

    onRender: function(){
      //marionette wraps all itemViews in a <div> tag
      //<div> wrapping the options elements in a dropdown breaks the dropdown
      this.$el = this.$el.children();
      this.$el.unwrap();
      this.setElement(this.$el);
    },

  });
});
