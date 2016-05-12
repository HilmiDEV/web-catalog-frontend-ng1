angular.module('mapSettingsModule',['ng','olMap','mapStylesModule'])
    .factory('olView', olViewFactory)
    .factory('olInteractions', olInteractionsFactory)
    .factory('olLayers', olLayersFactory)
    .factory('olDragBoxInteraction', olDragBoxInteractionFactory)
    .factory('olDrawCircleInteraction', olDrawCircleInteractionFactory);


olViewFactory.$inject = ['config'];

function olViewFactory(config) {
    var initial_view_config = {
        projection: config.mapProjection,
        center: config.mapCenter,
        zoom: config.mapZoom
    };
    var view = new ol.View(initial_view_config);

    return {
        view: view,
        initial_config: initial_view_config
    };
}

function olInteractionsFactory(){

    var InteractionsCollection = new ol.Collection();

    InteractionsCollection.push(new ol.interaction.DoubleClickZoom());

    InteractionsCollection.push(new ol.interaction.MouseWheelZoom());

    InteractionsCollection.push(new ol.interaction.DragPan());

    return {
        "Interactions": InteractionsCollection
    };
}
olDragBoxInteractionFactory.$inject= ['mapStyles'];

function olDragBoxInteractionFactory(mapStyles){
    return {
        DragBox: new ol.interaction.DragBox({condition:false}),
        DragBoxLayer: function (source){
            // Create vector layer used to keep drawn boxes on map.
            var layer = new ol.layer.Vector({source: source, style: mapStyles.DrawBoxStyle});
            return layer;
        },
        DragBoxLayerInstance :{}
    };
}

olDrawCircleInteractionFactory.$inject = ['mapStyles'];

function olDrawCircleInteractionFactory(mapStyles){
    var source = new ol.source.Vector({
        wrapX: false
    });

    var vector = new ol.layer.Vector({source: source, style: mapStyles.DrawCircleStyle});

    return {
        DrawCircle: new ol.interaction.Draw({source : source, type : "Circle"}),
        vector : vector
    };
}

function olLayersFactory(){
    var layers = new ol.Collection();
    var source = new ol.source.MapQuest({layer: 'sat'});
    layers.push(new ol.layer.Tile({source: source}));

    return {layers : layers};

}