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
    //if a normal user has selected the super user trying to edit the super user then
    //the modal will not show
    showUserModal : function(theModel) {
      UserListTab.UserListTabController._getUserPermissions(function() {
        debugger;
        if (UserAdminApp.currentUser.get('acc_super_user') === '1' ||
            theModel.get('acc_super_user') !== '1') {
          //dims the background
          $('#fade').addClass('fade');
          //shows the modal
          $('#modalBox').addClass('modalBox');
          // do NOT send a collection to the modal view!
          var modalView = new UserListTab.UserDetailsModalView({
            model: theModel, 
          });
          App.tabDiv.modalArea.show(modalView);
        }
      });
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
    },

    //function to create a new user model, and fetch thier permissions
    _getUserPermissions : function(callback) {
      //if we don't have the user model yet.
      if (typeof(UserAdminApp.currentUser === 'undefined')) {
        //create a new user model
        UserAdminApp.currentUser = new UserAdminApp.UserListTab.UserPermissionModel();
        //fetch the user model from the server, and on success call the callback
        UserAdminApp.currentUser.fetch({success : callback});
      } else { //already have the the current user. Just call the callback.    
        callback(); // 05/20/15--Pretty sure this line will never run.
      }
    },
    
  };
});
