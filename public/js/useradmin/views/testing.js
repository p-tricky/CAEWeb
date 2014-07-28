UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.TestingView = Backbone.Marionette.ItemView.extend({

    tagName : "div",
    //template: "#testing-time",

    initialize : function() {
      this.template = Handlebars.compile(tpl.get('testing'));
    }
  });
});