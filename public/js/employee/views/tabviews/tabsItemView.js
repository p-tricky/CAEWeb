//Define the module EmployeeTab for all functions that apply to all tabs. Tab specific ones will be namespaced to thier specific tab.
EmployeeApp.module('EmployeeTab', function (EmployeeTab, App, Backbone, Marionette, $, _) {
  //Define an item view that will be used to display the tabs. It does not use a collection view / item view to do the displaying.
  //It instead passes a collection to the template, and the mustache (handlebars) template does the logic of outputing each model
  //in the collection. Look at the template and the mustache docs for more info.
  EmployeeTab.TabsItemView = Backbone.Marionette.ItemView.extend({

    //Define the tag, id, and class for the view
    tagName: 'ul',
    id: 'tabs',
    className: 'tabs',

    //Define the template to use for the view.
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('_tabRow'));
    }

  });
});