//This is the controller that holds all of the functions that will be used in this tab 
UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserListTabController = {

    //defines and populates that userList collection
    getUserList : function(callback) {
        UserListTab.userList = new UserAdminApp.UserListTab.UserCollection();
        UserListTab.userList.fetch({success : callback});
    },

    //loads the view that will hold all of the users
    showUserTable : function() {
      var tabContentDiv = new UserListTab.UserCompositeView({collection: UserListTab.userList,'contentName':'usersTable'});
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    //will show the modal that allows users to be edited
    showUserModal : function(theModel) {
      //dims the background
      $('#fade').addClass('fade');
      //shows the modal
      $('#modalBox').addClass('modalBox');
      // do NOT send a collection to the modal view!
      var modalView = new UserListTab.UserDetailsModalView({
        model: theModel, 
      });
      App.tabDiv.modalArea.show(modalView);
    },

    //will show the modal that allows new users to be added
    showUserAddModal : function(theModel) {
      //disables the add new button until the modal is opened
      $('#addNew').prop('disabled',true);
      //dims the background
      $('#fade').addClass('fade');
      //shows the modal
      $('#modalBox').addClass('modalBox');
      //enables the add new button after the modal is loaded
      $('#addNew').prop('disabled',false);
      //loads the modal view
      var modalView = new UserListTab.UserAddModalView({
        model: new UserListTab.UserModel(),
      });
      App.tabDiv.modalArea.show(modalView);
      //hides the delete button in the modal
      //new users can't be deleted
      $('#delete').hide();
    }
    
  };
});
