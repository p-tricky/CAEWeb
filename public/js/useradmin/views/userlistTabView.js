//this is the view for the user admin tab
UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserListTabView = Backbone.Marionette.Layout.extend({

    //sets the options and loads the template
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //defines the regions
    regions: {
      tabContent: '#tabsContent',
      modalArea: '#modalBox'
    },

    //defines the id for css
    id:'innerTabsDiv',
    
    //when a user clicks the User List tab
    events : {
      'click .userlist' : 'navigateToUserList'
    },
    
    //navigates to the user list tab
    navigateToUserList : function() {
      UserAdminApp.navigate('userlist',true);
    }

  });
});
