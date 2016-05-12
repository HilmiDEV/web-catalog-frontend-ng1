/**
 * Define Angular application module.
 *
 * @ngdoc application
 * @namespace app
 * @requires ng
 * @requires ol
 * @requires app.templates
 */
angular.module('app', [
    // Official modules.
    'ng',
    // Application modules.
    //the names of Modules
    'app.components.mainMap',
    'app.components.leftPanel',
    'searchCriteria',
    'listResult',
    'metadataModule',
    'notificationModule',
    'app.templates',
    'notification_initial_viewModule',
    'notification_left_panelModule',
    'headerModule',
    'ngAnimate',
    'footerModule',
    'translateModule']);

/**
 * In order to have more control over the initialization process, we use the manual bootstrapping
 * method of Angular (instead of "ng-app" directive). With this method we can properly handle the
 * configuration value to setup Angular modules (and also use the "ng-cloak" directive to display
 * a splash/loading screen until the configuration is loaded).
 *
 * @param {Object} config The application configuration.
 */
//BootStrap= préprepare
//Manual Initialization of the app instead of the automatic initialization ng-app="name_enter_module"
function bootstrapFn(config) {
    //config is the data get from the file config.json

    // TODO handle configuration value here...
    // For example make the parameters like a services
    //Constant on peut appeler dans n'imprte quel place de code contient la configuration de notre application
    angular.module('app').constant('config', config);
    // Bootstrap Angular application module.
    angular.bootstrap(window.document, ['app']);
}

// loading configuration with JQuery...
//bootstrap is the function of success promise
$.getJSON('config.json', bootstrapFn);









