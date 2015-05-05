//This defines the filter section of the tab. Is passed a model that contains the startDate and endDate
EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.ShiftSearchView = Backbone.Marionette.ItemView.extend({

  	initialize : function(options) {
    	this.options = options || {};
      this.template = Handlebars.compile(tpl.get(this.options.contentName));
    },

    //when a user clicks the search button
    events : 
    {
    	'click #search' : 'search',
    },

    //will pull a new shiftList that only includes shifts with the proper dearch value
    search : function() {
      //if search value is not empty
    	if ($('#searchText').val() !== '')
    	{
        //sends the string to escapeHTML inorder to sanitize the special characters in the string 
    		var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
        //gets a new shiftList that is sorted and only contains shifts with the searched for term
    	  ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
        //have to reset the shiftList to redisplay in the list
        ShiftManagerTab.shiftList.reset();
    	}
      //if the text area is empty,
    	else 
    	{
        //gets a new shiftList that doesn't have any search term
    		ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
        //have to reset the shiftList to redisplay in the list
        ShiftManagerTab.shiftList.reset();
    	}
    }

  });
});