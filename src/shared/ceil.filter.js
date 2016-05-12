angular.module('ceilFilter',[])
    .filter('ceil', ceil);

function ceil(){
        return function(input) {
            return Math.ceil(input);
        };
}