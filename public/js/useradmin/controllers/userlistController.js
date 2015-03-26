UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserListTabController = {

    getUserList : function(callback) {
        UserListTab.userList = new UserAdminApp.UserListTab.UserCollection();
        UserListTab.userList.fetch({success : callback});
    },

    showUserTable : function() {
      var tabContentDiv = new UserListTab.UserCompositeView({collection: UserListTab.userList,'contentName':'usersTable'});
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    showUserModal : function(theModel) {
      $('#fade').addClass('fade');
      $('#modalBox').addClass('modalBox');
      // do NOT send a collection to the modal view!
      var modalView = new UserListTab.UserDetailsModalView({
        model: theModel, 
      });
      App.tabDiv.modalArea.show(modalView);
    },

    showUserAddModal : function(theModel) {
      $('#addNew').prop('disabled',true);
      $('#fade').addClass('fade');
      $('#modalBox').addClass('modalBox');
      $('#addNew').prop('disabled',false);

      var modalView = new UserListTab.UserAddModalView({
        model: new UserListTab.UserModel(),
      });
      App.tabDiv.modalArea.show(modalView);
      $('#delete').hide();
    }
    
  };
});
