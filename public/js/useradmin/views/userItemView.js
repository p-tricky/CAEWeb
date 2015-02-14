UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'tr',

    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('_usersRow'));
      this.model.attributes.phone = this.formatPhone(this.model.attributes.phone);
      this.model.bind('change', this.render, this);
    },

    attributes : function(){
      var classValue = UserListTab.userList.indexOf(this.model);
      var classProperty = '';
      if ((Number(classValue)%2) === 0) {
        classProperty = 'even';
      } else {
        classProperty = 'odd';
      }
      return {
        id : this.model.get('id'),
        class : classProperty + ' itemRow'
      };
    },

    events : {
      'dblclick' : 'showDetails'
    },

    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this.el;
    },

    // Function to format
    formatPhone: function(phoneNumber){
      phoneNumber = "(" + phoneNumber.substring(0,3) + ") "
                          + phoneNumber.substring(3,6) + "-"
                          + phoneNumber.substring(6,10);
      return phoneNumber;
    },

    showDetails : function(e) {

      //If the user is not double clicking on the buttons in the view
      if (e.target.nodeName !== "BUTTON") {
        //call the showInventoryItemModal and pass it the views model
        UserAdminTab.InventoryController.showInventoryItemModal(this.model);
        UserListTab.UserListTabController.show
      }
    }

  });
});
