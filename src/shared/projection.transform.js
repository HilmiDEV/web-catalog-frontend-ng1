angular.module('projectionTransformModule',['olMap'])
.factory('projectionTransform',projectionTransformFactory);

projectionTransformFactory.$inject = ['config'];

function projectionTransformFactory(config){

    return {
        projection_transform: projection_transform
    };

    function projection_transform(coord,sourceProjection){
        return ol.proj.transform(coord,sourceProjection,config.mapProjection);
    }

}