//Define module for the inventory tab to live in.
SysAdminApp.module('OpenCloseChecklistTab', function (OpenCloseChecklistTab, App, Backbone, Marionette, $, _) {
  //Define the Item Model to hold information about a item
  OpenCloseChecklistTab.OpenCloseChecklistModel = Backbone.Model.extend({

    //Define some defaults for new models that are created clientside
    defaults : {
      'id': null,
      'task_date' : '',
      'cico_system_on': '',
      'printers_on': '',
      'print_stations_on': '',
      'open_main_doors': '',
      'open_side_doors': '',
      'opened_by': '',
      'cico_system_off': '',
      'printers_off': '',
      'print_stations_off': '',
      'close_main_doors': '',
      'close_side_doors': '',
      'refill_printer_paper': '',
      'push_in_chairs': '',
      'turn_off_machines': '',
      'recycle_prints': '',
      'lock_cae_office_doors': '',
      'closed_by': '',
      'updated_at':'',
      'created_at':'',
    },

    //url for the model to use to persist data to the server side
    urlRoot : 'api/openclosechecklist',

    updateModel : function() {
      result = this.save();
      return result;
    },

  });

  //Define the collection for scans that is based on the above defined item model
  OpenCloseChecklistTab.OpenCloseChecklistCollection = Backbone.Collection.extend({
    //Define which model to use
    model : OpenCloseChecklistTab.OpenCloseChecklistModel,
    //define url for persistance
    url : 'api/openclosechecklist'
  });

});
