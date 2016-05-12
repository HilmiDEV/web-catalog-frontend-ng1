/**
 * @namespace app.components.mainMap
 * @requires ng
 * @requires olMap
 * @requires olmapConfigOptionsModule
 */
angular.module('app.components.mainMap', [
    'ng',
    'olMap',
    'storageDataModule',
    'mapSettingsModule',
    'features.catalogue.layerModule'])
    .directive('mainMap', mainMapDirective)
    .config(myMapConfig)
    .constant('olOptions', olOptionsFactory);
/**
 * @ngdoc directive
 */
function mainMapDirective() {
    return {
        restrict: 'EA',
        templateUrl: 'components/main-map/main-map.html',
        controller: mainMapController,
        controllerAs: 'mapCtrl'
    };
}

olOptionsFactory.$inject=['olView', 'olLayers', 'olInteractions'];

function olOptionsFactory(olView, olLayers, olInteractions) {

    // The object options contains all the options  used for define the map
    return {
        layers: olLayers.layers,
        view: olView.view,
        interactions: olInteractions.Interactions
    };
}

//La fonction mapMapConfig permet de configurer la map de notre directive
//olMapProvider est un service prédefine dans olMap angular module
function myMapConfig(olMapProvider,olOptions) {
    //Send the object options to the service olMapProvider.provideOptions of the angular module olMap
    olMapProvider.provideOptions('main', olOptions);
}

mainMapController.$inject=['olDragBoxInteraction',
    'olInteractions',
    'storageData',
    'olLayers',
    'olDrawCircleInteraction',
    'catalogueLayer',
    '$scope'];
//The controller of the main Map
function mainMapController(olDragBoxInteraction,olInteractions,storageData,olLayers,olDrawCircleInteraction,
                           catalogueLayer,$scope){

    var self=this;
    self.mydata = storageData.mydata;
    //Manipulation de l'interaction dans notre controller sur ol Map
    olDragBoxInteraction.DragBox.on('boxend', function() {
        //Creation d'une source
        var source = new ol.source.Vector();
        //Read the geometry data from the box drawn with the DragBox.
        var geometry = olDragBoxInteraction.DragBox.getGeometry();
        //Save the geometry object
        storageData.extentDragBox = geometry.getExtent();
        var feature = new ol.Feature({geometry : geometry});
        //Add the feature to the source
        source.addFeature(feature);
        olDragBoxInteraction.DragBoxLayerInstance = olDragBoxInteraction.DragBoxLayer(source);
        //Add the new layer to the list of layers of our map.
        olLayers.layers.push(olDragBoxInteraction.DragBoxLayerInstance);
        //Delete the DragBox interaction from the Map
        olInteractions.Interactions.remove(olDragBoxInteraction.DragBox);
    });

    // Manipulate the interaction with the start of Drawing
    olDragBoxInteraction.DragBox.on('boxstart', function() {
        //Delete the last DragBow drawn in the map from the layers
        if(olLayers.layers.getLength()>1){
            olLayers.layers.remove(olDragBoxInteraction.DragBoxLayerInstance);
        }
        });
    //Draw a circle in the Map
    olDrawCircleInteraction.DrawCircle.on('drawend', function() {
        //ADD the Drawn cercle the the layers of the Map
        olLayers.layers.push(olDrawCircleInteraction.vector);
        //Remove the Interaction from the Map
        olInteractions.Interactions.remove(olDrawCircleInteraction.DrawCircle);
    });

    olDrawCircleInteraction.DrawCircle.on('drawstart', function() {
        if(olLayers.layers.getLength()>1){
             olLayers.layers.remove(olDrawCircleInteraction.vector);
            olDrawCircleInteraction.vector.getSource().clear();
        }
    });

    olLayers.layers.push(catalogueLayer.catalogueVectorLayer);

    //Manipulation of Catalogue Layers
    $scope.$watch(angular.bind(this,function(){
        return storageData.mydata;}), function(){
        self.mydata = storageData.mydata;

        angular.forEach(self.mydata.content, function(record,index) {
            if(angular.isArray(record.boundingBox) && record.boundingBox.length > 0 ){
                for(var i =0;i<record.boundingBox.length;i++){
                    catalogueLayer.addFeatureCatalogue(record.boundingBox[i].value.lowerCorner[0],
                        record.boundingBox[i].value.lowerCorner[1],
                        record.boundingBox[i].value.upperCorner[0],
                        record.boundingBox[i].value.upperCorner[1],
                        catalogueLayer.catalogueVectorSource);
                }
                
            }

        });
    });
    
}
