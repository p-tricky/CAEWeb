//Define module for the Virus User tab to live in.
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  //Define a composite view for displaying a table of the the items
  AssetListTab.AssetsCompositeView = Backbone.Marionette.CompositeView.extend({
    
    //Define which Item view to associate with this composite view
    itemView: AssetMgmtApp.AssetListTab.AssetItemView,

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
      //add an arrow to the total header when the view loads
      $('#brand').html('&#9660 Brand Name');
      AssetListTab.sort = 'brandAsc';
    },

    //Define an id field for this view. The tab for this view is a div by default
    id:'assetsTable',

    //Define the container for the Item Views to be inserted into
    itemViewContainer: "tbody",

    //Define events for the view
    events: {
      'click #addNew' : 'addNew',
      'click #brand' : 'sortByBrand',
      'click #roomNum' : 'sortByRoom',
      'click #dpt' : 'sortByDepartment',
      'click #type' : 'sortByType',
      'click #name' : 'sortByName',
    },

    //When the add New button is clicked, this function will run
    addNew: function() {
      AssetListTab.AssetListController.showAssetsAddModal();
    },

    //function to sort the user's list by a different method
    sortByName : function() {
      //if the list is already sorted by that method, it swaps it to the reverse
      if (AssetListTab.sort == "nameAsc")
      {
        //removes the arrows from the headers
        this.clearArrows();
        //declares the new global sortBy
        AssetListTab.sort = "nameDesc";
        //gets a new user list that is pre-sorted
        AssetListTab.assetsList.fetch({data: {sort : AssetListTab.sort}});
        //must reset inorder to see the changes
        AssetListTab.assetsList.reset();
        //adds an arrow to the header
        $('#name').html("&#9650 Assignee's Name");
      }
      //if it is sorted by any other method
      else
      {
        //removes the arrows from the headers
        this.clearArrows();
        //sets the global sortBy
        AssetListTab.sort = "nameAsc";
        //gets a new user list that is pre-sorted
        AssetListTab.assetsList.fetch({data: {sort : AssetListTab.sort}});
        //must reset in order to see the changes
        AssetListTab.assetsList.reset();
        //adds an arrow to the header
        $('#name').html("&#9660 Assignee's Name");
      }
    },

    //function to sort the user's list by a different method
    sortByBrand : function() {
      //if the list is already sorted by that method, it swaps it to the reverse
      if (AssetListTab.sort == "brandAsc")
      {
        //removes the arrows from the headers
        this.clearArrows();
        //declares the new global sortBy
        AssetListTab.sort = "brandDesc";
        //gets a new user list that is pre-sorted
        AssetListTab.assetsList.fetch({data: {sort : AssetListTab.sort}});
        //must reset inorder to see the changes
        AssetListTab.assetsList.reset();
        //adds an arrow to the header
        $('#brand').html('&#9650 Brand Name');
      }
      //if it is sorted by any other method
      else
      {
        //removes the arrows from the headers
        this.clearArrows();
        //sets the global sortBy
        AssetListTab.sort = "brandAsc";
        //gets a new user list that is pre-sorted
        AssetListTab.assetsList.fetch({data: {sort : AssetListTab.sort}});
        //must reset in order to see the changes
        AssetListTab.assetsList.reset();
        //adds an arrow to the header
        $('#brand').html('&#9660 Brand Name');
      }
    },

    //function to sort the user's list by a different method
    sortByRoom : function() {
      //if the list is already sorted by that method, it swaps it to the reverse
      if (AssetListTab.sort == "roomAsc")
      {
        //removes the arrows from the headers
        this.clearArrows();
        //declares the new global sortBy
        AssetListTab.sort = "roomDesc";
        //gets a new user list that is pre-sorted
        AssetListTab.assetsList.fetch({data: {sort : AssetListTab.sort}});
        //must reset inorder to see the changes
        AssetListTab.assetsList.reset();
        //adds an arrow to the header
        $('#roomNum').html('&#9650 Room Number');
      }
      //if it is sorted by any other method
      else
      {
        //removes the arrows from the headers
        this.clearArrows();
        //sets the global sortBy
        AssetListTab.sort = "roomAsc";
        //gets a new user list that is pre-sorted
        AssetListTab.assetsList.fetch({data: {sort : AssetListTab.sort}});
        //must reset in order to see the changes
        AssetListTab.assetsList.reset();
        //adds an arrow to the header
        $('#roomNum').html('&#9660 Room Number');
      }
    },

    //function to sort the user's list by a different method
    sortByDepartment : function() {
      //if the list is already sorted by that method, it swaps it to the reverse
      if (AssetListTab.sort == "dptAsc")
      {
        //removes the arrows from the headers
        this.clearArrows();
        //declares the new global sortBy
        AssetListTab.sort = "dptDesc";
        //gets a new user list that is pre-sorted
        AssetListTab.assetsList.fetch({data: {sort : AssetListTab.sort}});
        //must reset inorder to see the changes
        AssetListTab.assetsList.reset();
        //adds an arrow to the header
        $('#dpt').html('&#9650 Department');
      }
      //if it is sorted by any other method
      else
      {
        //removes the arrows from the headers
        this.clearArrows();
        //sets the global sortBy
        AssetListTab.sort = "dptAsc";
        //gets a new user list that is pre-sorted
        AssetListTab.assetsList.fetch({data: {sort : AssetListTab.sort}});
        //must reset in order to see the changes
        AssetListTab.assetsList.reset();
        //adds an arrow to the header
        $('#dpt').html('&#9660 Department');
      }
    },

    //function to sort the user's list by a different method
    sortByType : function() {
      //if the list is already sorted by that method, it swaps it to the reverse
      if (AssetListTab.sort == "typeAsc")
      {
        //removes the arrows from the headers
        this.clearArrows();
        //declares the new global sortBy
        AssetListTab.sort = "typeDesc";
        //gets a new user list that is pre-sorted
        AssetListTab.assetsList.fetch({data: {sort : AssetListTab.sort}});
        //must reset inorder to see the changes
        AssetListTab.assetsList.reset();
        //adds an arrow to the header
        $('#type').html('&#9650 Asset Type');
      }
      //if it is sorted by any other method
      else
      {
        //removes the arrows from the headers
        this.clearArrows();
        //sets the global sortBy
        AssetListTab.sort = "typeAsc";
        //gets a new user list that is pre-sorted
        AssetListTab.assetsList.fetch({data: {sort : AssetListTab.sort}});
        //must reset in order to see the changes
        AssetListTab.assetsList.reset();
        //adds an arrow to the header
        $('#type').html('&#9660 Asset Type');
      }
    },

    //removes the arrows from the headers. This is called before resorting the users
    clearArrows : function()
    {
      $('#brand').html("Brand Name");
      $('#roomNum').html("Room Number");
      $('#dpt').html("Department");
      $('#type').html("Asset Type");
      $('#name').html("Assignee's Name");

    }
    
  });
});
