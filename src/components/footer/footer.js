/**
 * @ngdoc directive
 */
angular.module('footerModule',[])
    .directive('footer',footerDirective);

function footerDirective() {
    return {
        restrict: 'E',
        templateUrl: 'components/footer/footer.html'
    };
}

















