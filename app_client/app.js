(function() {

    //  angular.module('fisecApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);
    //    angular.module('fisecApp', ['ngRoute', 'ui.bootstrap']);
    //    angular.module('fisecApp', ['ngRoute', 'ui.bootstrap']).constant('_', _);
    //    angular.module('fisecApp', ['ngRoute', 'ui.bootstrap']).constant('_', window._);
    //    angular.module('fisecApp', ['ngRoute', 'ui.bootstrap', 'ui-leaflet']).constant('_', window._);
    angular.module('fisecApp', ['ngRoute', 'ui.bootstrap', 'leaflet-directive']).constant('_', window._)
        .config(function($logProvider) {
            $logProvider.debugEnabled(false);
        });

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/view/home.view.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })
            .when('/user', {
                templateUrl: '/view/user.view.html',
                controller: 'userController',
                controllerAs: 'vm'
            })
            .when('/app', {
                templateUrl: '/view/app.view.html',
                controller: 'appController',
                controllerAs: 'vm'
            })
            .when('/role', {
                templateUrl: '/view/role.view.html',
                controller: 'roleController',
                controllerAs: 'vm'
            })
            .when('/userRole', {
                templateUrl: '/view/userRole.view.html',
                controller: 'userRoleController',
                controllerAs: 'vm'
            })
            .when('/auth', {
                templateUrl: '/view/auth.view.html',
                controller: 'authController',
                controllerAs: 'vm'
            })
            .when('/map', {
                templateUrl: '/view/map.view.html',
                controller: 'mapController',
                controllerAs: 'vm'
            })
            .when('/facebook', {
                templateUrl: '/view/facebook.view.html',
                controller: 'facebookController',
                controllerAs: 'vm'
            })
            .when('/secApp', {
                templateUrl: '/view/secapp.view.html',
                controller: 'secappController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });

        // use the HTML5 History API
        //        $locationProvider.html5Mode(true);
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }

    angular
        .module('fisecApp')
        .config(['$routeProvider', '$locationProvider', config]);

})();