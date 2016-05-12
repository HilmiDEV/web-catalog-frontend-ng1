angular.module('modalDetailResult',['ui.bootstrap',
    'storageDataModule',
    'mapSettingsModule',
    'features.catalogue.layerModule',
    'mapStylesModule'
]).factory('modalDetail',modalDetail)
    .controller('ModalInstanceCtrl',ModalInstanceCtrl);

ModalInstanceCtrl.$inject=['storageData','$uibModalInstance',
    'olView','catalogueLayer','mapStyles'];

function ModalInstanceCtrl(storageData,$uibModalInstance,olView,
                           catalogueLayer,mapStyles){
    var self=this;
    //Get the selected record
    self.current_record = storageData.currentdata;
    //Get the id pf the selected record
    var id = self.current_record.identifier;
    //Execute the request getRecordById
    
    self.fermer=fermer;
    function fermer(){
        $uibModalInstance.close();
        storageData.zommed = false;
        olView.view.setZoom(olView.initial_config.zoom);
        olView.view.setCenter(olView.initial_config.center);
        var index = storageData.selected_feature_Index;
        var feature = catalogueLayer.catalogueVectorSource.getFeatures()[index];
        feature.setStyle(mapStyles.feature_style);
    }
}

modalDetail.$inject=['$uibModal'];

function modalDetail($uibModal){

    return {
        ModalInstance: function (){
            return $uibModal.open({
                animation: true,
                size:'lg',
                templateUrl: 'components/modal-detail-result/modal-detail-result.html',
                controller:ModalInstanceCtrl,
                controllerAs: 'modalCtrl',
                backdrop : 'static'
            });
        }
    };
}

