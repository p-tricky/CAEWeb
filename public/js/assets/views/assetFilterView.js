//This is the view that is used for the shift filter section of the tab
AssetMgmtApp.module('AssetListTab', function (AssetListTab, App, Backbone, Marionette, $, _) {
  AssetListTab.AssetsFilterView = Backbone.Marionette.ItemView.extend({

    //sets the options and loads the template
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //defines the listener for the apply filter button
    events:
    {
      'click #searchBtn': 'applySearch',
      'change #searchAllCheck' : 'clickAll',
      'keypress #searchTxt' : 'runSearch'
    },

    //will get a new set of shifts that are within the range of the dates
    applySearch : function() {
      if ($('#searchTxt').val() == "")
        AssetListTab.assetsList.fetch({data: {sort : AssetListTab.sort}, success: AssetListTab.assetsList.reset()});
      else
      {
        //foreach checkbox, it will send either a 1 or 0, representing the boolean of that checkbox for searching
        AssetListTab.assetsList.fetch({data: {
          sort: AssetListTab.sort, 
          search:$('#searchTxt').val(), 
          brand: $('#brandCheck').prop('checked') ? 1 : 0,
          serial: $('#serialCheck').prop('checked') ? 1 : 0,
          tag: $('#tagCheck').prop('checked') ? 1 : 0,
          room: $('#roomCheck').prop('checked') ? 1 : 0,
          dpt: $('#dptCheck').prop('checked') ? 1 : 0,
          mac: $('#macCheck').prop('checked') ? 1 : 0,
          ip: $('#ipCheck').prop('checked') ? 1 : 0,
          type: $('#typeCheck').prop('checked') ? 1 : 0,
          assignee: $('#nameCheck').prop('checked') ? 1 : 0,
          //on success, it will reset the checklist. This will show the new list and add the css styling
        }, success: AssetListTab.assetsList.reset()});
      }      
    },

    clickAll : function() {
      //if the checkbox is checked, it will uncheck all checkboxes
      if ($('#searchAllCheck').prop('checked'))
      {
        $('#brandCheck').prop('checked', true);
        $('#serialCheck').prop('checked', true);
        $('#tagCheck').prop('checked', true);
        $('#roomCheck').prop('checked', true);
        $('#dptCheck').prop('checked', true);
        $('#macCheck').prop('checked', true);
        $('#ipCheck').prop('checked', true);
        $('#typeCheck').prop('checked', true);
        $('#nameCheck').prop('checked', true);
      //otherwise it will check all the boxes
      } else {
        $('#brandCheck').prop('checked', false);
        $('#serialCheck').prop('checked', false);
        $('#tagCheck').prop('checked', false);
        $('#roomCheck').prop('checked', false);
        $('#dptCheck').prop('checked', false);
        $('#macCheck').prop('checked', false);
        $('#ipCheck').prop('checked', false);
        $('#typeCheck').prop('checked', false);
        $('#nameCheck').prop('checked', false);
      }
    },

    //if the user presses the enter key, it will run this instead of the default
    runSearch : function(e) {
      //if the enter key is pressed
      if (e.which === 13)
      {
        //prevents the page reload
        e.preventDefault();
        //runs the search function instead
        this.applySearch();
      }
    }

  });
});