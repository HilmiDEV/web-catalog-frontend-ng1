/**
 * @namespace app.components.leftPanel
 * @requires ng
 * @requires olMap
 */
angular.module('app.components.leftPanel', [
    'ng',
    'olMap',
    //Ajouter la dépendence du module de service
    'metadataModule',
    'searchCriteria',
    'listResult',
    'storageDataModule',
    'requestParameterModule',
    'ui.bootstrap'
]).directive('leftPanel', leftPanelDirective);
/**
 * @ngdoc controller
 *
 * @param olMap {olMap}
 */
    //Supporter avec la minification
    //Injecter le nom de la service dans le dépendence de la controller
LeftPanelController.$inject=['metadata','storageData','requestParameter','$uibModal','$scope'];

function LeftPanelController(metadata,storageData,requestParameter,$uibModal,$scope) {
    var self=this;
    self.init_page=1;
    self.loading = false;
    self.nbre_matched_elements = storageData.nbre_matched_elements;
    var parameter = requestParameter.parameter(self.init_page,"","","",storageData.extentDragBox);
    console.log(parameter);
    metadata.getRecords(parameter).then(function(response){
        self.mydata=response.data;
        storageData.mydata=response.data;
        storageData.loading_finish=true;
        self.loading = storageData.loading_finish;
        storageData.nbre_matched_elements = response.data.totalElements;
    });



    $scope.$watch(angular.bind(this,function(){ return storageData.nbre_matched_elements; }),
    function() {
        self.nbre_matched_elements = storageData.nbre_matched_elements;
    });

} //Fin de controller
/**
 * @ngdoc directive
 */
function leftPanelDirective() {
    return {
        restrict: 'E',
        controller: LeftPanelController,
        controllerAs: 'panelCtrl',
        templateUrl: 'components/left-panel/left-panel.html'

    };
}