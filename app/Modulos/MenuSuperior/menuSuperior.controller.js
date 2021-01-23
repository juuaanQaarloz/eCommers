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

    MenuSuperiorControlador.$inject = ['$log', '$location', 'serviciosRest', '$timeout', 'alertasServicios', '$scope',
    '$rootScope'];

    /* @ngInject */
    function MenuSuperiorControlador($log, $location, serviciosRest, $timeout, alertasServicios, $scope, $rootScope) {
        /* jshint validthis: true */
        var menuSuperiorCtrl = this;

        menuSuperiorCtrl.usuarioSesion = null;
        $rootScope.ocultarBuscarMenuSuperior = false;

        menuSuperiorCtrl.cbxTipoUsuario = {
            placeholder: "Seleccione",
            dataTextField: "tipo",
            dataValueField: "idTipo"
        };
        menuSuperiorCtrl.tiposdeUsuario = [
            {tipo: "Comprador", idTipo: "C"}
        ];



        menuSuperiorCtrl.datosSesion = serviciosRest.getDatosSesion();

        menuSuperiorCtrl.irAPortal = irAPortal;
        menuSuperiorCtrl.irAdminPantalla = irAdminPantalla;
        menuSuperiorCtrl.mdlLogin = mdlLogin;
        menuSuperiorCtrl.login = login;
        menuSuperiorCtrl.mdlVentasUsuario = mdlVentasUsuario;
        menuSuperiorCtrl.agregarUsuario = agregarUsuario;
        menuSuperiorCtrl.mdlSoloResgistro = mdlSoloResgistro;
        menuSuperiorCtrl.buscarProducto = buscarProducto;
        menuSuperiorCtrl.cerrarSesion = cerrarSesion;

        $scope.$watch('menuSuperiorCtrl.datosSesion', function (registro) {
            if(registro){
                menuSuperiorCtrl.usuarioSesion = registro;
            }
        }, true);

        /**
         * @ngdoc method
         * @name eCommers.MenuSuperiorControlador#activar
         * @methodOf eCommers.controller:MenuSuperiorControlador
         * @description
         * Funcion que se ejecuta con la configuracion inicial
         */
        function buscarProducto() {
            serviciosRest.setTextoBuscar(menuSuperiorCtrl.busqueda);
            $timeout(function () {
                $location.path('/producto');
            });
        }

        function login() {
            var mapa = {
                pcUsuario: menuSuperiorCtrl.usr.username,
                pcPassword: menuSuperiorCtrl.usr.password
            };
            var promesa = serviciosRest.getUsuarios(mapa).$promise;
            promesa.then(function (respuesta) {
                if(respuesta.length > 0) {
                    menuSuperiorCtrl.usuarioSesion = respuesta[0];
                    $rootScope.usuarioSesion = respuesta[0];
                    serviciosRest.setDatosSesion(menuSuperiorCtrl.usuarioSesion);
                } else menuSuperiorCtrl.usuarioSesion = null;
                angular.element("#mdlLogin").modal("hide");
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }

        function irAPortal() {
            $location.path('/inicio');
        }

        function irAdminPantalla() {
            $location.path('/mntAdministracionDatos');
        }

        function mdlLogin() {
            menuSuperiorCtrl.bndRegistrar = false;
            $timeout(function () {
                menuSuperiorCtrl.nuevoUsr = {};
                menuSuperiorCtrl.tipoUsuario = null;
                angular.element("#mdlLogin").modal("show");
            });
        }

        function mdlSoloResgistro() {
            $timeout(function () {
                menuSuperiorCtrl.nuevoUsr = {};
                menuSuperiorCtrl.tipoUsuario = null;
                angular.element("#mdlSoloResgistro").modal("show");
            });
        }

        function mdlVentasUsuario() {
            angular.element("#mdlVentasUsuario").modal('show');
        }

        function agregarUsuario() {
            var email = angular.copy(menuSuperiorCtrl.nuevoUsr.eMail);
            var clave = angular.copy(menuSuperiorCtrl.nuevoUsr.clave);
            var mapa = 0 + ",";
            mapa += "17/01/2021" + ",";
            mapa += menuSuperiorCtrl.nuevoUsr.nombre + ",";
            mapa += menuSuperiorCtrl.nuevoUsr.eMail + ",";
            mapa += menuSuperiorCtrl.nuevoUsr.clave + ",";
            mapa += menuSuperiorCtrl.nuevoUsr.tipoUsuario + ",";
            mapa += (menuSuperiorCtrl.nuevoUsr.calle?menuSuperiorCtrl.nuevoUsr.calle:null) + ",";
            mapa += (menuSuperiorCtrl.nuevoUsr.noExterior?menuSuperiorCtrl.nuevoUsr.noExterior:null) + ",";
            mapa += (menuSuperiorCtrl.nuevoUsr.noInterior?menuSuperiorCtrl.nuevoUsr.noInterior:null) + ",";
            mapa += (menuSuperiorCtrl.nuevoUsr.codigoPostal?menuSuperiorCtrl.nuevoUsr.codigoPostal:null) + ",";
            mapa += (menuSuperiorCtrl.nuevoUsr.colonia?menuSuperiorCtrl.nuevoUsr.colonia:null) + ",";
            mapa += (menuSuperiorCtrl.nuevoUsr.municipio?menuSuperiorCtrl.nuevoUsr.municipio:null) + ",";
            mapa += (menuSuperiorCtrl.nuevoUsr.ciudad?menuSuperiorCtrl.nuevoUsr.ciudad:null) + ",";
            mapa += (menuSuperiorCtrl.nuevoUsr.estado?menuSuperiorCtrl.nuevoUsr.estado:null) + ",";
            mapa += (menuSuperiorCtrl.nuevoUsr.pais?menuSuperiorCtrl.nuevoUsr.pais:null) + ",";
            mapa += menuSuperiorCtrl.nuevoUsr.referencias;
            var datosMapa = {
                pcAccion:  "INSERT",
                pcTextoAdd:  mapa
            };

            var promesa = serviciosRest.crudTblUsuario(datosMapa).$promise;
            promesa.then(function (respuesta) {
                menuSuperiorCtrl.nuevoUsr = {};
                menuSuperiorCtrl.tipoUsuario = null;
                menuSuperiorCtrl.usr = {};
                $timeout(function () {
                    menuSuperiorCtrl.usr.username = email;
                    menuSuperiorCtrl.usr.password = clave;
                    login();
                })
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }

        function cerrarSesion() {
            menuSuperiorCtrl.usuarioSesion = null;
            $rootScope.usuarioSesion = null;
            $location.path('/inicio');
        }

    }
})();
