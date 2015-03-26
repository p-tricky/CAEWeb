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
      var classValue = this.model.get('userNum');
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
      this.model.attributes.phone = this.formatPhone(this.model.attributes.phone);
      $(this.el).html(this.template(this.model.toJSON()));
      return this.el;
    },

    // Function to format
    formatPhone: function(phoneNumber){
      phoneNumber = phoneNumber.replace(/.*(\d{3}).*(\d{3}).*(\d{4})/, "$1$2$3");
      phoneNumber = "(" + phoneNumber.substring(0,3) + ") "
                          + phoneNumber.substring(3,6) + "-"
                          + phoneNumber.substring(6,10);
      return phoneNumber;
    },

    showDetails : function(e) {

      //If the user is not double clicking on the buttons in the view
      //which would be hard since there are none
      if (e.target.nodeName !== "BUTTON") {
        //call the showInventoryItemModal and pass it the views model
        UserListTab.UserListTabController.showUserModal(this.model);
      }
    }

  });
});
