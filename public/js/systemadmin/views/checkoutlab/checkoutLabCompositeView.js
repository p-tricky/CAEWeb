//Define module for the Virus User tab to live in.
SysAdminApp.module('CheckoutLabTab', function (CheckoutLabTab, App, Backbone, Marionette, $, _) {
  //Define a composite view for displaying a table of the the items
  CheckoutLabTab.CheckoutLabCompositeView = Backbone.Marionette.CompositeView.extend({
    
    //Define which Item view to associate with this composite view
    itemView: SysAdminApp.CheckoutLabTab.CheckoutLabItemView,

    //When this view is intanciated, run the following function
    initialize : function(options) {
      //fetch any options that are passed in, and assign them to this view
      this.options = options || {};
      //Define the template to use for this view by using tpl to fetch it and pass it to handlbars
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //will be called when the view is shown
    onShow : function()
    {
      CheckoutLabTab.sortBy = "dateDesc";
      $('#checkoutDate').html('&#9660 Checkout Date');
    },

    //Define an id field for this view. The tab for this view is a div by default
    id:'usersTable',

    //Define the container for the Item Views to be inserted into
    itemViewContainer: "tbody",

    //Define events for the view
    events: {
      'click #addNewCheckout' : 'addNew',
      'click #checkoutDate' : 'sortByDate',
      'click #labNumber' : 'sortByLab',
      'click #checkoutName' : 'sortByName',
    },

    //When the add New button is clicked, this function will run
    addNew: function() {
      //Call the showCheckoutAddModal function in the Checkout Lab controller
      CheckoutLabTab.CheckoutLabController.showCheckoutAddModal();
    },

    //function to sort the user's list by a different method
    sortByName : function() {
      //if the list is already sorted by that method, it swaps it to the reverse
      if (CheckoutLabTab.sort == "nameDesc")
      {
        //removes the arrows from the headers
        this.clearArrows();
        //declares the new global sortBy
        CheckoutLabTab.sort = "nameAsc";
        //gets a new user list that is pre-sorted
        CheckoutLabTab.checkoutLabList.fetch({data: {sort : CheckoutLabTab.sort}});
        //must reset inorder to see the changes
        CheckoutLabTab.checkoutLabList.reset();
        //adds an arrow to the header
        $('#checkoutName').html("&#9650 Name");
      }
      //if it is sorted by any other method
      else
      {
        //removes the arrows from the headers
        this.clearArrows();
        //sets the global sortBy
        CheckoutLabTab.sort = "nameDesc";
        //gets a new user list that is pre-sorted
        CheckoutLabTab.checkoutLabList.fetch({data: {sort : CheckoutLabTab.sort}});
        //must reset in order to see the changes
        CheckoutLabTab.checkoutLabList.reset();
        //adds an arrow to the header
        $('#checkoutName').html("&#9660 Name");
      }
    },

    //function to sort the user's list by a different method
    sortByDate : function() {
      //if the list is already sorted by that method, it swaps it to the reverse
      if (CheckoutLabTab.sort == "dateDesc")
      {
        //removes the arrows from the headers
        this.clearArrows();
        //declares the new global sortBy
        CheckoutLabTab.sort = "dateAsc";
        //gets a new user list that is pre-sorted
        CheckoutLabTab.checkoutLabList.fetch({data: {sort : CheckoutLabTab.sort}});
        //must reset inorder to see the changes
        CheckoutLabTab.checkoutLabList.reset();
        //adds an arrow to the header
        $('#checkoutDate').html('&#9650 Checkout Date');
      }
      //if it is sorted by any other method
      else
      {
        //removes the arrows from the headers
        this.clearArrows();
        //sets the global sortBy
        CheckoutLabTab.sort = "dateDesc";
        //gets a new user list that is pre-sorted
        CheckoutLabTab.checkoutLabList.fetch({data: {sort : CheckoutLabTab.sort}});
        //must reset in order to see the changes
        CheckoutLabTab.checkoutLabList.reset();
        //adds an arrow to the header
        $('#checkoutDate').html('&#9660 Checkout Date');
      }
    },

    //function to sort the user's list by a different method
    sortByLab : function() {
      //if the list is already sorted by that method, it swaps it to the reverse
      if (CheckoutLabTab.sort == "labDesc")
      {
        //removes the arrows from the headers
        this.clearArrows();
        //declares the new global sortBy
        CheckoutLabTab.sort = "labAsc";
        //gets a new user list that is pre-sorted
        CheckoutLabTab.checkoutLabList.fetch({data: {sort : CheckoutLabTab.sort}});
        //must reset inorder to see the changes
        CheckoutLabTab.checkoutLabList.reset();
        //adds an arrow to the header
        $('#labNumber').html('&#9650 Lab');
      }
      //if it is sorted by any other method
      else
      {
        //removes the arrows from the headers
        this.clearArrows();
        //sets the global sortBy
        CheckoutLabTab.sort = "labDesc";
        //gets a new user list that is pre-sorted
        CheckoutLabTab.checkoutLabList.fetch({data: {sort : CheckoutLabTab.sort}});
        //must reset in order to see the changes
        CheckoutLabTab.checkoutLabList.reset();
        //adds an arrow to the header
        $('#labNumber').html('&#9660 Lab');
      }
    },

    //removes the arrows from the headers. This is called before resorting the users
    clearArrows : function()
    {
      $('#labNumber').html('Lab');
      $('#checkoutName').html("Name");
      $('#checkoutDate').html('Checkout Date');
    }
    
  });
});
