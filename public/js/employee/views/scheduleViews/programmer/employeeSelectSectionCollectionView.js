//Define the module for the ProgrammerScheduleTab logic to live in
EmployeeApp.module('ProgrammerScheduleTab', function (ProgrammerScheduleTab, App, Backbone, Marionette, $, _) {
  //Define a collecton view to be used for the list of employees toggle and hours section.
  ProgrammerScheduleTab.EmployeeSelectSectionCollectionView = Backbone.Marionette.CollectionView.extend({
    //Use the following itemview for each model in the collection
    itemView: EmployeeApp.ProgrammerScheduleTab.EmployeeSelectSectionItemView,
    //id that this div element will receive.
    id:'innerEmployeeSelectSection'
    
  });
});