//this view populates the drop down from which virus users are selected when adding/editing scans
SysAdminApp.module('VirusTrackerTab', function (VirusTrackerTab, App, Backbone, Marionette, $, _) {
  VirusTrackerTab.VirusUserCompositeView = Backbone.Marionette.CompositeView.extend({
    
    //define the items that will populate the view
    itemView: SysAdminApp.VirusTrackerTab.VirusUserItemView,

    //set the options and load the template 
    initialize : function(options) {
      this.options = options || {};
      //this.template = Handlebars.compile(tpl.get(this.options.contentName));
      this.template = Handlebars.compile(tpl.get('virustracker/virusUserDropDown'));
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
