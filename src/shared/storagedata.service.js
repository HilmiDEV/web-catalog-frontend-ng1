/*
* Angular Module for storage the common data and dispatch them over the application
* */
angular.module('storageDataModule',[])
.factory('storageData',storageData);

function storageData(){

    return {
        mydata:{},
        nbre_matched_elements: 0,
        currentdata:{},
        loading_finish:false,
        extentDragBox:[],
        zommed : false,
        selected_feature_Index : -1,
        
    };

}