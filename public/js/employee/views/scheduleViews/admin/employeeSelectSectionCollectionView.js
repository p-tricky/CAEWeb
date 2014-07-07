EmployeeApp.module('AdminScheduleTab', function (AdminScheduleTab, App, Backbone, Marionette, $, _) {
  AdminScheduleTab.EmployeeSelectSectionCollectionView = Backbone.Marionette.CollectionView.extend({
    
    itemView: EmployeeApp.AdminScheduleTab.EmployeeSelectSectionItemView,

    id:'innerEmployeeSelectSection'
    
  });
});