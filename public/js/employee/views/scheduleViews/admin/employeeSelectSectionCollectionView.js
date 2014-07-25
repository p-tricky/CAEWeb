//Define the module for the AdminScheduleTab logic to live in
EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  //Define a collecton view to be used for the list of employees toggle and hours section.
  AdminScheduleTab.EmployeeSelectSectionCollectionView = Backbone.Marionette.CollectionView.extend({
    //Use the following itemview for each model in the collection
    itemView: EmployeeApp.AdminScheduleTab.EmployeeSelectSectionItemView,
    //id that this div element will receive.
    id:'innerEmployeeSelectSection'
    
  });
});