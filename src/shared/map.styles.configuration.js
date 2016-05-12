angular.module('mapStylesModule',[])
.factory('mapStyles',mapStylesFactory);

function mapStylesFactory(){
return {
    feature_style : new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(255, 255, 255, 0.2)'}),
        stroke: new ol.style.Stroke({color: '#ffcc33', width: 2})
    }),
    selected_record_style : new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'red', width: 2})
    }),
    DrawBoxStyle : new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(255, 255, 255, 0.2)'}),
        stroke: new ol.style.Stroke({color: 'blue', width: 2}),
        image: new ol.style.Circle({radius: 7, fill: new ol.style.Fill({color: '#ffcc33'})})
    }),
    DrawCircleStyle : new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(255, 255, 255, 0.2)'}),
        stroke: new ol.style.Stroke({color: 'blue', width: 2}),
        image: new ol.style.Circle({radius: 7, fill: new ol.style.Fill({color: '#ffcc33'})})
    })
};

}