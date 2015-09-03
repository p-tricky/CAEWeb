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
      CheckoutLabTab.sortBy = "totalDesc";
      $('#totalViruses').html('&#9660 Total Viruses and PUPs');
    },

    //will be called when the view is shown
    onShow : function()
    {
      //add an arrow to the total header when the view loads
      //$('#totalViruses').html('&#9660 Total Viruses and PUPs');
    },

    //Define an id field for this view. The tab for this view is a div by default
    id:'usersTable',

    //Define the container for the Item Views to be inserted into
    itemViewContainer: "tbody",

    //Define events for the view
    events: {
      'click #addNewCheckout' : 'addNew',
      //'click #userName' : 'sortByName',
      //'click #scanDate' : 'sortByDate',
      //'click #totalViruses' : 'sortByVirus',
    },

    //When the add New button is clicked, this function will run
    addNew: function() {
      //Call the showCheckoutAddModal function in the Checkout Lab controller
      CheckoutLabTab.CheckoutLabController.showCheckoutAddModal();
    },

    //function to sort the user's list by a different method
    sortByName : function() {
      //if the list is already sorted by that method, it swaps it to the reverse
      if (VirusUserTab.sort == "nameAsc")
      {
        //removes the arrows from the headers
        this.clearArrows();
        //declares the new global sortBy
        VirusUserTab.sort = "nameDesc";
        //gets a new user list that is pre-sorted
        VirusUserTab.usersList.fetch({data: {sort : VirusUserTab.sort}});
        //must reset inorder to see the changes
        VirusUserTab.usersList.reset();
        //adds an arrow to the header
        $('#userName').html("&#9650 User's Name");
      }
      //if it is sorted by any other method
      else
      {
        //removes the arrows from the headers
        this.clearArrows();
        //sets the global sortBy
        VirusUserTab.sort = "nameAsc";
        //gets a new user list that is pre-sorted
        VirusUserTab.usersList.fetch({data: {sort : VirusUserTab.sort}});
        //must reset in order to see the changes
        VirusUserTab.usersList.reset();
        //adds an arrow to the header
        $('#userName').html("&#9660 User's Name");
      }
    },

    //function to sort the user's list by a different method
    sortByDate : function() {
      //if the list is already sorted by that method, it swaps it to the reverse
      if (VirusUserTab.sort == "dateAsc")
      {
        //removes the arrows from the headers
        this.clearArrows();
        //declares the new global sortBy
        VirusUserTab.sort = "dateDesc";
        //gets a new user list that is pre-sorted
        VirusUserTab.usersList.fetch({data: {sort : VirusUserTab.sort}});
        //must reset inorder to see the changes
        VirusUserTab.usersList.reset();
        //adds an arrow to the header
        $('#scanDate').html('&#9650 Most Recent Scan Date');
      }
      //if it is sorted by any other method
      else
      {
        //removes the arrows from the headers
        this.clearArrows();
        //sets the global sortBy
        VirusUserTab.sort = "dateAsc";
        //gets a new user list that is pre-sorted
        VirusUserTab.usersList.fetch({data: {sort : VirusUserTab.sort}});
        //must reset in order to see the changes
        VirusUserTab.usersList.reset();
        //adds an arrow to the header
        $('#scanDate').html('&#9660 Most Recent Scan Date');
      }
    },

    //function to sort the user's list by a different method
    sortByVirus : function() {
      //if the list is already sorted by that method, it swaps it to the reverse
      if (VirusUserTab.sort == "totalDesc")
      {
        //removes the arrows from the headers
        this.clearArrows();
        //declares the new global sortBy
        VirusUserTab.sort = "totalAsc";
        //gets a new user list that is pre-sorted
        VirusUserTab.usersList.fetch({data: {sort : VirusUserTab.sort}});
        //must reset inorder to see the changes
        VirusUserTab.usersList.reset();
        //adds an arrow to the header
        $('#totalViruses').html('&#9660 Total Viruses and PUPs');
      }
      //if it is sorted by any other method
      else
      {
        //removes the arrows from the headers
        this.clearArrows();
        //sets the global sortBy
        VirusUserTab.sort = "totalDesc";
        //gets a new user list that is pre-sorted
        VirusUserTab.usersList.fetch({data: {sort : VirusUserTab.sort}});
        //must reset in order to see the changes
        VirusUserTab.usersList.reset();
        //adds an arrow to the header
        $('#totalViruses').html('&#9650 Total Viruses and PUPs');
      }
    },

    //removes the arrows from the headers. This is called before resorting the users
    clearArrows : function()
    {
      
    }
    
  });
});