//This is used to show the container that hold all of the shifts. On showing the view, 
//it grabs a new copy of the shift list so that it is up to date. If you loaded the 
//view without getting a new shift list, the coloring would be off for the items. 

EmployeeApp.module('ShiftManagerTab', function (ShiftManagerTab, App, Backbone, Marionette, $, _) {
  ShiftManagerTab.ShiftListView = Backbone.Marionette.CompositeView.extend({
    
    //declares the items that are going to be in the container
    itemView: EmployeeApp.ShiftManagerTab.ShiftItemView,

    initialize : function(options) {
        this.options = options || {};
        this.template = Handlebars.compile(tpl.get(this.options.contentName));
        //this is a global variable that will be set and used for determining how to sort the shiftList
        ShiftManagerTab.sort = 'default';
    },

    onShow : function() {
        //gets a new set of shifts before displaying them. 
        ShiftManagerTab.ShiftManagerController.getShiftsInRange($('datepicker1').val(), $('#datepicker2').val());
    },

    id:'shiftListTable',

    itemViewContainer: "tbody",

    //define events. when you click the column header
    events : {
        'click #timeIn' : 'sortByTimeIn',
        'click #timeOut' : 'sortByTimeOut',
        'click #timeRec' : 'sortByTimeRec',
        'click #clockoutCol' : 'sortByClockOutCol',
        'click #name' : 'sortByName'
    },

    //when 'Time In' is clicked, it will get a new shiftList that is pre-sorted
    sortByName : function() {
        //sets two date objects to see if the dates are correct
        var date1 = new Date($('#datepicker1').val());
        var date2 = new Date($('#datepicker2').val());

        //if the first date is after the second date, it swaps the dates
        if (date1 > date2)
        {
            temp = $('#datepicker1').val();
            $('#datepicker1').val($('#datepicker2').val());
            $('#datepicker2').val(temp);
        }

        //if sorted by name descending, then it switches to descending
        if (ShiftManagerTab.sort == 'nameDes')
        {
            //removes the arrows from the header regardless of which one has it
            ShiftManagerTab.ShiftManagerController.clearSort();
            //set the global sort variable to the new sort method
            ShiftManagerTab.sort = 'nameAsc';
            //if the search bar isn't empty
            if ($('#searchText').val() !== '')
            {
                //sets input variable and gets the new shiftList
                var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
            }
            else
                //if the earch bar is empty, it gets a list without a search string
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
            //have to reset the shiftList to redisplay in the list
            ShiftManagerTab.shiftList.reset();
            //add an arrow to the header to show how its sorted
            $('#name').html('&#9650 Name');
        }
        else
        {
            //removes the arrows from the header regardless of which one has it
            ShiftManagerTab.ShiftManagerController.clearSort();
            //set the global sort variable to the new sort method
            ShiftManagerTab.sort = 'nameDes';
            //if the search bar isn't empty
            if ($('#searchText').val() !== '')
            {
                //sets input variable and gets the new shiftList
                var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
            }
            //if the earch bar is empty, it gets a list without a search string
            else
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
            //have to reset the shiftList to redisplay in the list
            ShiftManagerTab.shiftList.reset();
            //add an arrow to the header to show how its sorted
            $('#name').html('&#9660 Name');
        } 
    },

    //when 'Time In' is clicked, it will get a new shiftList that is pre-sorted
    sortByTimeIn : function() {
        //sets two date objects to see if the dates are correct
        var date1 = new Date($('#datepicker1').val());
        var date2 = new Date($('#datepicker2').val());

        //if the first date is after the second date, it swaps the dates
        if (date1 > date2)
        {
            temp = $('#datepicker1').val();
            $('#datepicker1').val($('#datepicker2').val());
            $('#datepicker2').val(temp);
        }

        //if sorted by time in descending, then it switches to descending
        if (ShiftManagerTab.sort == 'timeInDes')
        {
            //removes the arrows from the header regardless of which one has it
            ShiftManagerTab.ShiftManagerController.clearSort();
            //set the global sort variable to the new sort method
            ShiftManagerTab.sort = 'timeInAsc';
            //if the search bar isn't empty
            if ($('#searchText').val() !== '')
            {
                //sets input variable and gets the new shiftList
                var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
            }
            else
                //if the earch bar is empty, it gets a list without a search string
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
            //have to reset the shiftList to redisplay in the list
            ShiftManagerTab.shiftList.reset();
            //add an arrow to the header to show how its sorted
            $('#timeIn').html('&#9650 Time In');
        }
        else
        {
            //removes the arrows from the header regardless of which one has it
            ShiftManagerTab.ShiftManagerController.clearSort();
            //set the global sort variable to the new sort method
            ShiftManagerTab.sort = 'timeInDes';
            //if the search bar isn't empty
            if ($('#searchText').val() !== '')
            {
                //sets input variable and gets the new shiftList
                var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
            }
            //if the earch bar is empty, it gets a list without a search string
            else
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
            //have to reset the shiftList to redisplay in the list
            ShiftManagerTab.shiftList.reset();
            //add an arrow to the header to show how its sorted
            $('#timeIn').html('&#9660 Time In');
        } 
    },

    //when 'Time Out' is clicked, it will get a new shiftList that is pre-sorted
    sortByTimeOut : function() {
        //sets two date objects to see if the dates are correct
        var date1 = new Date($('#datepicker1').val());
        var date2 = new Date($('#datepicker2').val());

        //if the first date is after the second date, it swaps the dates
        if (date1 > date2)
        {
            temp = $('#datepicker1').val();
            $('#datepicker1').val($('#datepicker2').val());
            $('#datepicker2').val(temp);
        }

        //if sorted by time out descending, then it switches to descending
        if (ShiftManagerTab.sort == 'timeOutDes')
        {
            //removes the arrows from the header regardless of which one has it
            ShiftManagerTab.ShiftManagerController.clearSort();
            //set the global sort variable to the new sort method
            ShiftManagerTab.sort = 'timeOutAsc';
            //if the search bar isn't empty
            if ($('#searchText').val() !== '')
            {
                //sets input variable and gets the new shiftList
                var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
            }
            else
                //if the earch bar is empty, it gets a list without a search string
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
            //have to reset the shiftList to redisplay in the list
            ShiftManagerTab.shiftList.reset();
            //add an arrow to the header to show how its sorted
            $('#timeOut').html('&#9650 Time Out');
        }
        else
        {
            //removes the arrows from the header regardless of which one has it
            ShiftManagerTab.ShiftManagerController.clearSort();
            //set the global sort variable to the new sort method
            ShiftManagerTab.sort = 'timeOutDes';
            //if the search bar isn't empty
            if ($('#searchText').val() !== '')
            {
                //sets input variable and gets the new shiftList
                var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
            }
            else
                //if the earch bar is empty, it gets a list without a search string
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
            //have to reset the shiftList to redisplay in the list
            ShiftManagerTab.shiftList.reset();
            //add an arrow to the header to show how its sorted
            $('#timeOut').html('&#9660 Time Out');
        } 
    },

    //when 'Hours' is clicked, it will get a new shiftList that is pre-sorted
    sortByTimeRec : function() {
        //sets two date objects to see if the dates are correct
        var date1 = new Date($('#datepicker1').val());
        var date2 = new Date($('#datepicker2').val());

        //if the first date is after the second date, it swaps the dates
        if (date1 > date2)
        {
            temp = $('#datepicker1').val();
            $('#datepicker1').val($('#datepicker2').val());
            $('#datepicker2').val(temp);
        }

        //if sorted by time recorded descending, then it switches to descending
        if (ShiftManagerTab.sort == 'timeRecDes')
        {
            //removes the arrows from the header regardless of which one has it
            ShiftManagerTab.ShiftManagerController.clearSort();
            //set the global sort variable to the new sort method
            ShiftManagerTab.sort = 'timeRecAsc';
            //if the search bar isn't empty
            if ($('#searchText').val() !== '')
            {
                //sets input variable and gets the new shiftList
                var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
            }
            else
                //if the earch bar is empty, it gets a list without a search string
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
            //have to reset the shiftList to redisplay in the list
            ShiftManagerTab.shiftList.reset();
            //add an arrow to the header to show how its sorted
            $('#timeRec').html('&#9650 Hours');
        }
        else
        {
            //removes the arrows from the header regardless of which one has it
            ShiftManagerTab.ShiftManagerController.clearSort();
            //set the global sort variable to the new sort method
            ShiftManagerTab.sort = 'timeRecDes';
            //if the search bar isn't empty
            if ($('#searchText').val() !== '')
            {
                //sets input variable and gets the new shiftList
                var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
            }
            else
                //if the earch bar is empty, it gets a list without a search string
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
            //have to reset the shiftList to redisplay in the list
            ShiftManagerTab.shiftList.reset();
            //add an arrow to the header to show how its sorted
            $('#timeRec').html('&#9660 Hours');
        } 
    },

    //when 'Clock Out' is clicked, it will get a new shiftList that is pre-sorted
    sortByClockOutCol : function() {
        //sets two date objects to see if the dates are correct
        var date1 = new Date($('#datepicker1').val());
        var date2 = new Date($('#datepicker2').val());

        //if the first date is after the second date, it swaps the dates
        if (date1 > date2)
        {
            temp = $('#datepicker1').val();
            $('#datepicker1').val($('#datepicker2').val());
            $('#datepicker2').val(temp);
        }
        
        //if sorted by clocked out descending, then it switches to descending
        if (ShiftManagerTab.sort == 'clockedInAsc')
        {
            //removes the arrows from the header regardless of which one has it
            ShiftManagerTab.ShiftManagerController.clearSort();
            //set the global sort variable to the new sort method
            ShiftManagerTab.sort = 'clockedInDes';
            //if the search bar isn't empty
            if ($('#searchText').val() !== '')
            {
                //sets input variable and gets the new shiftList
                var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
            }
            else
                //if the earch bar is empty, it gets a list without a search string
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
            //have to reset the shiftList to redisplay in the list
            ShiftManagerTab.shiftList.reset();
            //add an arrow to the header to show how its sorted
            $('#clockoutCol').html('&#9650 Clock Out');
        }
        else
        {
            //removes the arrows from the header regardless of which one has it
            ShiftManagerTab.ShiftManagerController.clearSort();
            //set the global sort variable to the new sort method
            ShiftManagerTab.sort = 'clockedInAsc';
            //if the search bar isn't empty
            if ($('#searchText').val() !== '')
            {
                //sets input variable and gets the new shiftList
                var input = ShiftManagerTab.ShiftManagerController.escapeHtml($('#searchText').val());
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort, search: input}});
            }
            else
                //if the earch bar is empty, it gets a list without a search string
                ShiftManagerTab.shiftList.fetch({data: { start: $('#datepicker1').val(), end: $('#datepicker2').val(), sort: ShiftManagerTab.sort}});
            //have to reset the shiftList to redisplay in the list
            ShiftManagerTab.shiftList.reset();
            //add an arrow to the header to show how its sorted
            $('#clockoutCol').html('&#9660 Clock Out');
            
        } 
    }
  });
});