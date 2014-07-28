UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserModel = Backbone.Model.extend({
    defaults : {
      'position_name':'',
      'created_at':'',
      'updated_at':''
    },

    urlRoot : 'useradmin/api/userstype'
  });
});