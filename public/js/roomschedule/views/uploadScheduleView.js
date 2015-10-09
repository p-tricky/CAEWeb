//Put the general tabs into the RoomTabsList Module
RoomScheduleApp.module('RoomTabsList', function (RoomTabsList, App, Backbone, Marionette, $, _) {

  //Define a layout to be used
  RoomTabsList.UploadScheduleView = Backbone.Marionette.ItemView.extend({

    //When this view is initalized, do the following things
    initialize : function(options) {
      //fetch the options from the passed in ones, and assign them to the view. If none, default to empty object {}.
      this.options = options || {};
      //Get the tabName from the passed in options and pass it to the tpl function defined in util.js
      //Then pass the returned template to Handlebars.compile. This is the template that will be used
      //with this view. The template name can be see from main.js when this view is created. It is passed
      //as the first parameter.
      this.template = Handlebars.compile(tpl.get(this.options.tabName));
    },

    //Give this view an id. By default the tab will be a DIV
    id:'innerTabsDiv',
    
    //Setup events for elements in the template.
    events : {
      'click .classroom' : 'navigateToClassroom',
      'click .computerclassroom':'navigateToComputerClassroom',
      'click .breakoutroom':'navigateToBreakoutRoom',
      'click .specialroom':'navigateToSpecialRoom',
      'click .uploadschedule':'navigateToUploadSchedule',

      'click #delClassroom' : 'deleteClassroom',
      'click #delComputer' : 'deleteComputer',
      'click #delBreakout' : 'deleteBreakout',
      'click #delSpecial' : 'deleteSpecial',
    },

    onShow: function() {
      $('#fileupload').fileupload({
        url: 'uploadschedule',
        dataType: 'json',
        type: 'POST',
        done: function (e, data) { 
          $.each(data.files, function (index, file) {
            $('<p/>').text(file.name).appendTo($('#tabsContent'));
          });
          if (data.result.nonExistantRooms.length !== 0)
            alert("Schedules were not added for the following rooms: " + 
                data.result.nonExistantRooms.join(", ") + ". " +
                "We do not have a record of those rooms in our database. " +
                "Talk to the CAE programmers, if you want to have the rooms added.");
        },
        error: function(e, data) {
          alert(e.responseJSON.message);
        }
      });

      $.ajax({
        type: "GET",
        url: 'api/getsemesters',
      }).done(function(response) {
        var array = JSON.parse("[" + response + "]");
        $.each(array[0], function(value,key){
          $('#classroomSelect').append($("<option></option>").attr("value",value).text(key));
          $('#computerSelect').append($("<option></option>").attr("value",value).text(key));
          $('#breakoutSelect').append($("<option></option>").attr("value",value).text(key));
          $('#specialSelect').append($("<option></option>").attr("value",value).text(key));
        });        
      });
    },

    //Functions to be run from the events setup right above.
    navigateToClassroom : function() {
      RoomScheduleApp.navigate('classroom',true);
    },

    navigateToComputerClassroom : function() {
      RoomScheduleApp.navigate('computerclassroom',true);
    },

    navigateToBreakoutRoom : function() {
      RoomScheduleApp.navigate('breakoutroom',true);
    },

    navigateToSpecialRoom : function() {
      RoomScheduleApp.navigate('specialroom',true);
    },

    navigateToUploadSchedule : function() {
      RoomScheduleApp.navigate('uploadschedule',true);
    },

    deleteClassroom : function() {
      this.doubleCheck("Classroom", $('#classroomSelect option:selected').attr("value"));
    },

    deleteComputer : function() {
      this.doubleCheck("Computer", $('#computerSelect option:selected').attr("value"));
    },

    deleteBreakout : function() {
      this.doubleCheck("Breakout", $('#breakoutSelect option:selected').attr("value"));
    },

    deleteSpecial : function() {
      this.doubleCheck("Special", $('#specialSelect option:selected').attr("value"));
    },
    
    doubleCheck : function(rooms, semester) {
      $('#confirmModalBox').html("Are you sure you want to delete all the events for " + rooms + " for the " + semester + " semester?");
      $('#confirmModalBox').dialog({
        modal:true,
        wait: true,
        title: 'Delete Events?',
        buttons: {
          'Cancel': function() {
            $(this).dialog('close');
            return false;
          },
          'Ok': function() {
            $.ajax({
              type: "GET",
              url: 'api/deletesemesterevents',
              data: {semester: semester, roomType: rooms}
            });
            $(this).dialog('close');
            return true;
          }
        },
      });
    }

  });
});
