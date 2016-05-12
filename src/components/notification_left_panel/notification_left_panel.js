angular.module('notification_left_panelModule', [])
    .directive('notificationLeftPanel', notification_left_panelDirective);


function notification_left_panelController() {
    var self = this;
}

function notification_left_panelDirective() {
    return {
        restrict: 'E',
        scope: true,
        controller: notification_left_panelController,
        controllerAs: 'nlpCtrl',
        templateUrl: 'components/notification_left_panel/notification_left_panel.html'
    };
}

