//defines the model that holds the UserPositions 
UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserPositionsModel = Backbone.Model.extend({
    defaults : {
      'position_name':'',
      'created_at':'',
      'updated_at':''
    },

    urlRoot : 'useradmin/api/userstype'
  });
});
