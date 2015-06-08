//this is the view that holds the information for a single user
EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.UserItemView = Backbone.Marionette.ItemView.extend({

    //sets the options, loads the template, and then sets the model
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('shiftManager/userDropDownItem'));
    },

    onRender: function(){
      //marionette wraps all itemViews in a <div> tag
      //<div> wrapping the options elements in a dropdown breaks the dropdown
      this.$el = this.$el.children();
      this.$el.unwrap();
      this.setElement(this.$el);
    },
  });
});
