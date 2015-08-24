//this view populates the drop down from which departments selected when adding/editing assets
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  AssetListTab.AssetDepartmentCompositeView = Backbone.Marionette.CompositeView.extend({
    
    //define the items that will populate the view
    itemView: AssetMgmtApp.AssetListTab.AssetDepartmentItemView,

    //set the options and load the template 
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('assetsList/assetDepartmentCompositeView'));
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

    onShow : function() {
      // if there is a model, then set the dropdowns to the appropriate values
      if (this.model) {
        $('.select-department-id>option[value='+this.model.get('department_id')+']').prop('selected', true);
      }
    }

  });
});
