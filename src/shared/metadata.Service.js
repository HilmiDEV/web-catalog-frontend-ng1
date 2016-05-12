angular.module('metadataModule', [])
    .factory("metadata", function($http){
        return{
            getRecords: function(parameter){
                return $http.post('http://localhost:8080/web-catalog/rest/metadata',parameter)
                    .success(function(data, status) {
                        return data;
                    });

            }
        };
    });




