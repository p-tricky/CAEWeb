UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserListTabController = {

    getUserList : function(callback) {
      if (typeof UserListTab.userList === "undefined") {
        console.log('Getting Users Data');
        UserListTab.userList = new UserAdminApp.UserListTab.UserCollection();
        UserListTab.userList.fetch({success : callback});
      } else {
        callback();
      }
    },

    showUserTable : function() {
      var tabContentDiv = new UserListTab.UserCompositeView({collection: UserListTab.userList,'contentName':'usersTable'});
      App.tabDiv.tabContent.show(tabContentDiv);
    },

    // To fix
    showInventoryItemAddModal : function(theModel) {
      $('#addNew').prop('disabled',true);
      $('#fade').addClass('fade');
      $('#modalBox').addClass('modalBox');
      $('#addNew').prop('disabled',false);
      InventoryTab.InventoryController.getVendors(function(){
        var modalView = new InventoryTab.ItemAddModalView({model:new InventoryTab.ItemModel(),collection:InventoryTab.vendorCollection});
        App.tabDiv.modalArea.show(modalView);
        $('#delete').hide();
      });
    }
    
  };
});