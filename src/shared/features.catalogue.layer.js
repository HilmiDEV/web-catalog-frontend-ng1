/*
* Angular Module for Save and Manipulate the layer of the catalogue services bounding Boxes
* Hilmi BOUALLEGUE 2016
* */
angular.module('features.catalogue.layerModule',[
    'ng',
    'olMap',
    'mapSettingsModule',
    'mapStylesModule'])
    .factory('catalogueLayer',featurescataloguelayerFactory);



featurescataloguelayerFactory.$inject = ['mapStyles'];

function featurescataloguelayerFactory(mapStyles){

     var vectorSource = new ol.source.Vector({});
     var vectorlayer = new ol.layer.Vector({
         source: vectorSource,
     });
     function addFeatureCatalogue(lcX, lcY, ucX, ucY, source){
                 var thing = new ol.geom.Polygon( [[[lcX,lcY], [lcX,ucY], [ucX,ucY], [ucX,lcY]]]);
                 var featurething = new ol.Feature({geometry: thing});
                     featurething.setStyle(mapStyles.feature_style);
                 source.addFeature( featurething );
         }

    return {
        catalogueVectorLayer : vectorlayer,
        catalogueVectorSource : vectorSource,
        addFeatureCatalogue : addFeatureCatalogue
    };
}
