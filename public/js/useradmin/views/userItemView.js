//this is the view that holds the information for a single user
UserAdminApp.module('UserListTab', function (UserListTab, App, Backbone, Marionette, $, _) {
  UserListTab.UserItemView = Backbone.Marionette.ItemView.extend({

    //tag name for the view
    tagName: 'tr',

    //sets the options, loads the template, and then sets the model
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('_usersRow'));
      this.model.attributes.phone = this.formatPhone(this.model.attributes.phone);
      this.model.bind('change', this.render, this);
    },

    //this will set the class and id of the view for css
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

    //when a user double clicks the item
    events : {
      'dblclick' : 'showDetails'
    },

    //renders the view
    render: function(){
      this.model.attributes.phone = this.formatPhone(this.model.attributes.phone);
      $(this.el).html(this.template(this.model.toJSON()));
      return this.el;
    },

    // Function to format the phone number
    formatPhone: function(phoneNumber){
      if (phoneNumber) {
        phoneNumber = phoneNumber.replace(/.*(\d{3}).*(\d{3}).*(\d{4})/, "$1$2$3");
        phoneNumber = "(" + phoneNumber.substring(0,3) + ") "
                          + phoneNumber.substring(3,6) + "-"
                          + phoneNumber.substring(6,10);
        return phoneNumber;
      }
    },

    //loads the edit user modal
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
