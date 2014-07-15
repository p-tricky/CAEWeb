EmployeeApp.module('AttendantScheduleTab', function (AttendantScheduleTab, App, Backbone, Marionette, $, _) {
  AttendantScheduleTab.EmployeeSelectSectionCollectionView = Backbone.Marionette.CollectionView.extend({
    
    itemView: EmployeeApp.AttendantScheduleTab.EmployeeSelectSectionItemView,

    id:'innerEmployeeSelectSection'
    
  });
});