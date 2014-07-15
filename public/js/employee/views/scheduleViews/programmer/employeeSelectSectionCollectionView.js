EmployeeApp.module('ProgrammerScheduleTab', function (ProgrammerScheduleTab, App, Backbone, Marionette, $, _) {
  ProgrammerScheduleTab.EmployeeSelectSectionCollectionView = Backbone.Marionette.CollectionView.extend({
    
    itemView: EmployeeApp.ProgrammerScheduleTab.EmployeeSelectSectionItemView,

    id:'innerEmployeeSelectSection'
    
  });
});