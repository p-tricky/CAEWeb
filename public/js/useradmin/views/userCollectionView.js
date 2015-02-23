UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserCompositeView = Backbone.Marionette.CompositeView.extend({
    
    itemView: UserAdminApp.UserListTab.UserItemView,

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    id:'usersTable',

    itemViewContainer: "tbody",

    events: {
      'click #addNew' : 'addNew'
    },

    addNew: function() {
      // To change
      // InventoryTab.InventoryController.showInventoryItemAddModal(this.model);
      UserListTab.UserListTabController.showUserAddModal(this.model);
    }
    
  });
});
