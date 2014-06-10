UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserListTabView = Backbone.Marionette.Layout.extend({

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    regions: {
      tabContent: '#tabsContent',
      modalArea: '#modalBox'
    },

    id:'innerTabsDiv',
    
    events : {
      'click .userlist' : 'navigateToUserList'
    },
    
    navigateToUserList : function() {
      UserAdminApp.navigate('userlist',true);
    }

  });
});