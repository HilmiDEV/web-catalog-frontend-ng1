angular.module('searchCriteria',[
    'storageDataModule',
    'mapSettingsModule',
    'requestParameterModule',
    'metadataModule',
    'features.catalogue.layerModule'
]).directive('searchCriteria',searchCriteriaDirective);

function searchCriteriaDirective(){
return {
    restrict:"E",
    controller:searchCriteriaController,
    controllerAs:"scCtrl",
    templateUrl:'components/search_criteria/search_criteria.html'
};

}

searchCriteriaController.$inject=['storageData',
    'olInteractions',
    'olDragBoxInteraction',
    'olDrawCircleInteraction',
    'olLayers',
    'requestParameter',
    'metadata',
    'catalogueLayer'];

function searchCriteriaController(storageData,olInteractions,olDragBoxInteraction,
                                  olDrawCircleInteraction, olLayers, requestParameter,
                                  metadata,catalogueLayer){
    var self=this;
    self.keywords = "";
    self.isCollapsed=true;
    self.format="dd/MM/yyyy";
    self.dt1="";
    self.dt2="";
    self.popup1 = {opened: false};
    self.popup2 = {opened: false};
    self.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2100, 5, 22),
        minDate: new Date(1991,9,27),
        startingDay: 1
    };
    self.active_search = true;
    self.date_error=false;
    self.drawBox=drawBox;
    self.drawCircle=drawCircle;
    self.search=search;
    self.cleanMap=cleanMap;
    self.init_res = init_res;
    //La fonction de ouvrit la calendrier
    self.open_calender1=function(){ self.popup1.opened = true; };

    self.open_calender2=function(){ self.popup2.opened = true; };
    function drawBox(){ olInteractions.Interactions.push(olDragBoxInteraction.DragBox); }

    function drawCircle(){  olInteractions.Interactions.push(olDrawCircleInteraction.DrawCircle); }

    function cleanMap(){
        olLayers.layers.remove(olDrawCircleInteraction.vector);
        olLayers.layers.remove(olDragBoxInteraction.DragBoxLayerInstance);
        storageData.extentDragBox=[];
    }
    function search(){
        //Verification of the date
        var d_begin = new Date(self.dt1);
        var d_end = new Date(self.dt2);
        //Make more efficient design for the error msg
        if (d_begin > d_end){ self.date_error=true; }
        else {
            self.date_error=false;
            self.active_search=false;
            //Reinitialise the loading Flag
            storageData.loading_finish=false;
            //Clean the catalogue layer from the ancient features
            catalogueLayer.catalogueVectorSource.clear();
            //Get the extent of the drawn DragBow from the storage service
            var extentDragBox = storageData.extentDragBox;
            //Recreate the parameter of the new request
            var parameter = requestParameter.parameter(1,self.keywords,self.dt1,self.dt2,extentDragBox);
            //Reload the data from the server
            metadata.getRecords(parameter).then(function(response){
                storageData.mydata=response.data;
                storageData.loading_finish=true;
                storageData.nbre_matched_elements = response.data.totalElements;
                self.active_search=true;
            });
        }
    }

    function init_res(){
        //Clean the keywords
        self.keywords = "";
        //Clean the dates
        self.dt1="";
        self.dt2="";
        self.date_error=false;
        //Clean the drawn shapes in the map
        olLayers.layers.remove(olDrawCircleInteraction.vector);
        olLayers.layers.remove(olDragBoxInteraction.DragBoxLayerInstance);
        storageData.extentDragBox=[];
        //************** > Reload the initial data from the server
        self.active_search=false;
        //Reinitialise the loading Flag
        storageData.loading_finish=false;
        //Clean the catalogue layer from the ancient features
        catalogueLayer.catalogueVectorSource.clear();
        //Get the extent of the drawn DragBow from the storage service
        var extentDragBox = storageData.extentDragBox;
        //Recreate the parameter of the new request
        var parameter = requestParameter.parameter(1,self.keywords,self.dt1,self.dt2,extentDragBox);
        //Reload the data from the server
        metadata.getRecords(parameter).then(function(response){
            storageData.mydata=response.data;
            storageData.loading_finish=true;
            storageData.nbre_matched_elements = response.data.totalElements;
            self.active_search=true;
        });





    }
}







