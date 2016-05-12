angular.module('headerModule',['pascalprecht.translate'])
    .directive('header',headerDirective);


function headerDirective(){

    return {
        restrict : "E",
        templateUrl : "components/header/header.html",
        controller : headerController,
        controllerAs : "headerCtrl"
    };
}

headerController.$inject = ['$translate'];
    function headerController($translate){
    var self = this;
    self.status = {
            isopen: false
        };
        self.toggled = function(open) {
           if(open){
               angular.element("#header_acceuil_menu").removeClass("active");
           }
            else {
               angular.element("#header_acceuil_menu").addClass('active');
           }
        };

        self.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            self.status.isopen = !self.status.isopen;
        };
        self.select_bg=function(){
            angular.element("#fr").css('background-color','blue');
        };

        self.change_language=change_language;

        function change_language(langkey){

            $translate.use(langkey);
        }


    }
