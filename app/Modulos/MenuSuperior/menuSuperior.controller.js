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

    MenuSuperiorControlador.$inject = ['$log', '$location'];

    /* @ngInject */
    function MenuSuperiorControlador($log, $location) {
        /* jshint validthis: true */
        var menuSuperiorCtrl = this;

        menuSuperiorCtrl.usuarioSesion = null;

        activar();
        menuSuperiorCtrl.irAPortal = irAPortal;
        menuSuperiorCtrl.irAdminPantalla = irAdminPantalla;
        menuSuperiorCtrl.mdlLogin = mdlLogin;
        menuSuperiorCtrl.mdlPoliticas = mdlPoliticas;
        menuSuperiorCtrl.mdlVentasUsuario = mdlVentasUsuario;

        /**
         * @ngdoc method
         * @name eCommers.MenuSuperiorControlador#activar
         * @methodOf eCommers.controller:MenuSuperiorControlador
         * @description
         * Funcion que se ejecuta con la configuracion inicial
         */
        function activar() {

        }

        function irAPortal() {
            $location.path('/inicio');
        }

        function irAdminPantalla() {
            $location.path('/mntAdministracionDatos');
        }

        function mdlLogin() {
            console.log("Modal de Login");
            angular.element("#mdlLogin").modal("show");
        }

        function mdlPoliticas() {
            angular.element("#mdlPoliticas").modal('show');
        }

        function mdlVentasUsuario() {
            angular.element("#mdlVentasUsuario").modal('show');
        }
    }
})();
