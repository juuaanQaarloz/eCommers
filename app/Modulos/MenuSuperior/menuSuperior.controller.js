(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name eCommers.controller:MenuSuperiorControlador
     * @description
     * Definición del MenuSuperiorControlador en el modulo eCommers que da seguimiento a los accesos del sistema.
     */
    angular
        .module('eCommers')
        .controller('MenuSuperiorControlador', MenuSuperiorControlador);

    MenuSuperiorControlador.$inject = ['$log'];

    /* @ngInject */
    function MenuSuperiorControlador($log) {
        /* jshint validthis: true */
        var menuSuperiorCtrl = this;

        activar();
        menuSuperiorCtrl.hola = hola;

        /**
         * @ngdoc method
         * @name eCommers.MenuSuperiorControlador#activar
         * @methodOf eCommers.controller:MenuSuperiorControlador
         * @description
         * Funcion que se ejecuta con la configuracion inicial
         */
        function activar() {

        }

        function hola() {
            $('.dropdown-toggle').dropdownHover();
        }
    }
})();
