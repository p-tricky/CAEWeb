UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserListTabController = {

    getUserList : function() {
    	// Testing
    	$('#loadingDiv').remove();
    	var testingView = new UserListTab.TestingView();
    	App.tabDiv.tabContent.show(testingView);
    }
    
  };
});