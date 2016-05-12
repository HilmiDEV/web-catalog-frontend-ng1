angular.module('notificationModule',['storageDataModule'])
.directive('notificationDir',notificationDirective);

function notificationDirective(){

    return {
        restrict:"E",
        templateUrl:"components/notification/notification.html",
        controller:notificationController,
        controllerAs:'notificationCtrl'
    };
}

notificationController.$inject=['storageData','$scope'];

function notificationController(storageData,$scope){
    var self=this;
    self.state=storageData.loading_finish;
    $scope.$watch(angular.bind(this,function(){
        return storageData.loading_finish;
    }),function(){self.state= storageData.loading_finish;});
    
}