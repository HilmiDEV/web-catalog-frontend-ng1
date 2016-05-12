/*
* Angular Module for display the data comes from the server in the Vue
* */
angular.module('listResult',[
    'storageDataModule',
    'metadataModule',
    'requestParameterModule',
    'ceilFilter',
    'ui.bootstrap',
    'modalDetailResult',
    'mapSettingsModule',
    'features.catalogue.layerModule',
    'mapStylesModule'])
.directive('listResult',listResultDirective);

function listResultDirective(){
return {
    restrict:'E',
    controller:listResultController,
    controllerAs: 'lrCtrl',
    templateUrl:'components/list_result/list_result.html'
};
}

listResultController.$inject=['storageData',
    'metadata',
    'requestParameter',
    '$uibModal',
    'modalDetail',
    '$scope',
    'catalogueLayer',
    'olLayers',
    'olView',
    'config',
    'mapStyles'];

function listResultController (storageData,metadata,requestParameter,$uibModal,modalDetail,
                               $scope,catalogueLayer,olLayers,olView,config,mapStyles) {
    var self=this;
    //Le nbre totale des items
    self.totalItems = 0;
    //Limiter le nbre des page afficher en bas
    self.maxSize= config.nbre_pagination_tab;
    //LA page choisir par l'utilisateur
    self.currentPage = 1;
    self.page_size = config.pageSize;
    self.pageChanged = pageChanged;
    self.detail=detail;
    self.selectedRecord=selectedRecord;
    self.leavedRecord = leavedRecord;
    self.zoomExtent = zoomExtent;
    self.loading_finish = false;
    //Watch the loading data to the service storageData in the property mydata
    $scope.$watch(angular.bind(this,function(){
        return storageData.mydata;}), function(){
        self.mydata= storageData.mydata;
        self.totalItems = storageData.mydata.totalElements;
        self.loading_finish = storageData.loading_finish;
    });

    function pageChanged() {
        storageData.loading_finish=false;
        catalogueLayer.catalogueVectorSource.clear();
        var parameter = requestParameter.parameter(self.currentPage,"","","",storageData.extentDragBox);
        //Reload the data from the server
        metadata.getRecords(parameter).then(function(response){
            self.mydata=response.data;
            storageData.mydata=response.data;
            storageData.loading_finish=true;
            storageData.nbre_matched_elements = response.data.totalElements;
        });
    }
    //For display the Modal(Popup) of the selected record details
    function detail(record){
        storageData.currentdata=record;
         modalDetail.ModalInstance();
    }

    function selectedRecord(index){
        var feature = catalogueLayer.catalogueVectorSource.getFeatures()[index];
        if(!jQuery.isEmptyObject(feature)){
            feature.setStyle(mapStyles.selected_record_style);
        }

    }

    function leavedRecord (index){
        if(! storageData.zommed){
        var feature = catalogueLayer.catalogueVectorSource.getFeatures()[index];
            if(!jQuery.isEmptyObject(feature)){feature.setStyle(mapStyles.feature_style);}
        }
    }

    function zoomExtent(index){
        storageData.zommed = true;
        //Get the view used by the Map
        var view = olView.view;
        //Get the selected feature of index
        var feature = catalogueLayer.catalogueVectorSource.getFeatures()[index];
        //Get the extent of the selected feature
        var extent = feature.getGeometry().getExtent();
        //Set the vue to the extent of the selected feature
        view.fit(extent,[500,600]);
        feature.setStyle(mapStyles.selected_record_style);
        storageData.selected_feature_Index = index;



    }


}