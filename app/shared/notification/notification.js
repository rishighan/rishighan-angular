import notificationComponent from './notification.component';

let notificationModule = angular.module('notificationModule',[])
.directive('notification', notificationComponent);

export default notificationModule;