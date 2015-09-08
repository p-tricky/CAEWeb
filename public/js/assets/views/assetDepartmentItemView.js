//Define module for the asset list tab to live in.
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  //Define a Department Item View to be used in conjunction with the Composite view: assetDepartmentCompositeView
  AssetListTab.AssetDepartmentItemView = Backbone.Marionette.ItemView.extend({

    //Function that is called on Instanciation
    initialize : function() {
      this.template = Handlebars.compile(tpl.get("assetsList/assetDepartmentItemView"));
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
