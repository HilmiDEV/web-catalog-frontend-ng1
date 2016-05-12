angular.module('requestParameterModule',[])
.factory('requestParameter', requestParameterFactory);

requestParameterFactory.$inject = ['config'];

function requestParameterFactory(config){
return {
    parameter : function(currentPage,keywords,startdate,enddate,extentDragBox){
        return {
            "keywords": keywords,
            "pageNumber": currentPage,
            "pageSize": config.pageSize,
            "startDate" : startdate,
            "endDate" : enddate,
            "extentDragBox": extentDragBox
        };
    }
};
}