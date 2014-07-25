//Define the module for the AttendantScheduleTab logic to live in
EmployeeApp.module('AttendantScheduleTab', function (AttendantScheduleTab, App, Backbone, Marionette, $, _) {
  //Define a collecton view to be used for the list of employees toggle and hours section.
  AttendantScheduleTab.EmployeeSelectSectionCollectionView = Backbone.Marionette.CollectionView.extend({
    //Use the following itemview for each model in the collection
    itemView: EmployeeApp.AttendantScheduleTab.EmployeeSelectSectionItemView,
    //id that this div element will receive.
    id:'innerEmployeeSelectSection'
    
  });
});