//Define the module for the AdminScheduleTab logic to live in. Note:this view is used by all views even though it is namespaced to admin.
EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  //Define a layout to be used to split the content area into a employee select section, and a schedule section.
  AdminScheduleTab.ScheduleView = Backbone.Marionette.Layout.extend({

    //Get any options, and define the template to use.
    initialize : function(options) {
      this.options = options || {};
      this.template = Handlebars.compile(tpl.get('schedule/scheduleView'));
    },

    //Define the two regions for content
    regions: {
        employeeSelectSection: '#employeeSelectSection',
        scheduleSection: '#scheduleSection'
    },

    //Give this div for this view an id
    id:'innerTabsContentDiv',


    events: {
      'click #print': 'printSchedule'
    },

    printSchedule : function() {
      this.printGrid();

    }, 

    printGrid : function() {
      var schedulerElement = $("#scheduleSection")
      schedulerElement.width(1260);
      // readjust events' positions
      schedulerElement.data("kendoScheduler")._resize();
      window.print();
      // restore previous Scheduler layout
      schedulerElement.width("100%");
      schedulerElement.data("kendoScheduler")._resize();
      

      /*
      var height = window.outerHeight, width = window.outerWidth;
      //console.log(window.outerHeight);
      var schedulerElement = $('#scheduleSection'),
        printableContent = '',
        //win = window.open('', '', 'width=' + width +', height=' + height),
        win = window.open('', '', 'width=1260, height=1100'),
        doc = win.document.open();

      var htmlStart =
            '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<meta charset="utf-8" />' +
            '<title>Kendo UI Grid</title>' +
            //'<link href="http://cdn.kendostatic.com/2013.2.716/styles/kendo.common.min.css" rel="stylesheet" /> ' +
            '<link rel="stylesheet" href="../css/roomschedule/kendo/kendo.common.css" type="text/css" charset="utf-8" />' +
            '<link rel="stylesheet" href="../css/roomschedule/kendo/kendo.default.css" type="text/css" charset="utf-8">' +
            //'<link rel="stylesheet" href="../css/roomschedule/kendo/kendo.common.unmin.css" type="text/css" media="screen" charset="utf-8" />' +
            '<style>' +
            'html { font: 11pt sans-serif; }' +
            '.k-grid { border-top-width: 0; }' +
            '.k-grid, .k-grid-content { height: 100% !important; }' +
            '.k-grid-content { overflow: visible !important; }' +
            'div.k-grid table { table-layout: auto; width: 100% !important; }' +
            '.k-grid .k-grid-header th { border-top: 1px solid; }' +
            '.k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
            '</style>' +
            '</head>' +
            '<body>';

      var htmlEnd =
            '</body>' +
            '</html>';

      var gridHeader = schedulerElement.children('.k-grid-header');
      console.log(gridHeader);
      if (gridHeader[0]) {
        var thead = gridHeader.find('thead').clone().addClass('k-grid-header');
        printableContent = schedulerElement
            .clone()
                .children('.k-grid-header').remove()
            .end()
                .children('.k-grid-content')
                    .find('table')
                        .first()
                            .children('tbody').before(thead)
                        .end()
                    .end()
                .end()
            .end()[0].outerHTML;
      } else {
        printableContent = schedulerElement.clone()[0].outerHTML;
      }
      //console.log(printableContent)
      doc.write(htmlStart + printableContent + htmlEnd);
      doc.close();
      //win.print();
      */
      
  }


  });
});