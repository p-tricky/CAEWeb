EmployeeApp.module('EmployeeTab', function (EmployeeTab, App, Backbone, Marionette, $, _) {
  EmployeeTab.TabsItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'ul',
    id: 'tabs',
    className: 'tabs',

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('_tabRow'));
    },

    events : {

    },

  });
});