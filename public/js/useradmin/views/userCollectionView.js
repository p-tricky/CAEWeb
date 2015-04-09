//this is the view for the user collection
UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserCompositeView = Backbone.Marionette.CompositeView.extend({
    
    //define the items that will populate the view
    itemView: UserAdminApp.UserListTab.UserItemView,

    //set the options and load the template 
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //sets the id
    id:'usersTable',

    //defines the container for the item views
    itemViewContainer: "tbody",

    //defines a listener for the addNew button
    events: {
      'click #addNew' : 'addNew'
    },

    //calls the controller function that shows the userAddModal 
    addNew: function() {
      UserListTab.UserListTabController.showUserAddModal(this.model);
    }
    
  });
});
