angular.module('translateModule',['pascalprecht.translate'])
.config(translate);

translate.$inject = ['$translateProvider'];

function translate($translateProvider) {

    $translateProvider.useSanitizeValueStrategy(null);
    $.getJSON('languages/fr.json',function(langContent){
        $translateProvider.translations('fr',langContent);
        console.log(langContent);
    });

    $.getJSON('languages/en.json',function(langContent){
        $translateProvider.translations('en',langContent);
        console.log(langContent);
    });
        $translateProvider.preferredLanguage('fr');
}
