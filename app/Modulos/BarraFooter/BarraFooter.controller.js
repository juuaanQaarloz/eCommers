(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name eCommers.controller:BarraFooter
     * @description
     * Definición del BarraFooter en el modulo eCommers que da seguimiento a los accesos del sistema.
     */
    angular
        .module('eCommers')
        .controller('BarraFooter', BarraFooter);

    BarraFooter.$inject = ['$log', '$location'];

    /* @ngInject */
    function BarraFooter($log, $location) {
        /* jshint validthis: true */
        var barraFooterCtrl = this;

        barraFooterCtrl.activar = activar;

        /**
         * @ngdoc method
         * @name eCommers.BarraFooter#activar
         * @methodOf eCommers.controller:BarraFooter
         * @description
         * Funcion que se ejecuta con la configuracion inicial
         */
        function activar(politica) {
            barraFooterCtrl.politica = politica;
            angular.element("#mdlPoliticas").modal('show');
        }
    }
})();