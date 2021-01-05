(function () {
    'use strict';
    angular
        .module('eAspayb')
        .config(configuracion);

    configuracion.$inject = ['$routeProvider'];
    /* @ngInject */
    function configuracion($routeProvider) {

        $routeProvider.when('/', {templateUrl: 'Modulos/Acceso/inicio/inicio.html'});

        $routeProvider.when('/inicio', {templateUrl: 'Modulos/Acceso/inicio/inicio.html'});

        $routeProvider.otherwise({redirectTo: '/inicio'});

    };
})();
