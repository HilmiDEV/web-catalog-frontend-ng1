angular.module('notification_initial_viewModule',[
    'storageDataModule',
    'mapSettingsModule',
    'features.catalogue.layerModule',
    'mapStylesModule'])
    .directive('nivDir',NIVDirective);

function NIVDirective(){

    return {
        restrict:"E",
        templateUrl:"components/notification_initial_view/notification_initial_view.html",
        controller:notification_initial_viewController,
        controllerAs:'NIVCtrl'

    };
}

notification_initial_viewController.$inject=['storageData','$scope','olView','catalogueLayer','mapStyles'];

function notification_initial_viewController(storageData,$scope,olView,catalogueLayer,mapStyles){

    var self=this;
    self.state=storageData.zommed;
    self.returnInit = returnInit;

    $scope.$watch(angular.bind(this,function(){
        return storageData.zommed;
    }),function(){self.state= storageData.zommed;});
    
    function returnInit() {
        storageData.zommed = false;
        olView.view.setZoom(olView.initial_config.zoom);
        olView.view.setCenter(olView.initial_config.center);
        var index = storageData.selected_feature_Index;
        var feature = catalogueLayer.catalogueVectorSource.getFeatures()[index];
        feature.setStyle(mapStyles.feature_style);
    }
    
}