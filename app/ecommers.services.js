(function () {
    'use strict';

    angular
        .module('eCommers')
        .factory('serviciosRest', serviciosRest);

    serviciosRest.$inject = ['$http', '$log', '$window', '$resource', 'urlServicios'];

    /* @ngInject */
    function serviciosRest($http, $log, $window, $resource, urlServicios) {

        var store = $window.localStorage;
        var llave = 'at-finance';

        var serviciosJava = $resource(urlServicios+'apiRest/:servicio', {servicio: "@servicio"}, {
            login: {
                method: 'POST', isArray: 'true', headers: {'Content-Type': 'application/json'}
            }, seguimiento: {
                method: 'POST', isArray: 'true', headers: {'Content-Type': 'application/json'}
            }, justificacion: {
                method: 'POST', isArray: 'true', headers: {'Content-Type': 'application/json'}
            }, nuevaConexionBD: {
                method: 'POST', isArray: 'true', headers: {'Content-Type': 'application/json'}
            }
        });

        var servicios = {
            setT: setT,
            login: login,
            searchSeguimiento: searchSeguimiento,
            searchJustificacion: searchJustificacion,
            cargarAlumnosExcel: cargarAlumnosExcel,
            confirmarCargaAsistencia: confirmarCargaAsistencia,
            validarDato: validarDato,
            conexionDB: conexionDB,
        };
        return servicios;

        function setT(t) {
            if (t) {
                store.setItem(llave, t);
            } else {
                store.removeItem(llave);
            }
        };

        function login(parametros) {
            return serviciosJava.login({servicio: "login"}, parametros);
        }

        function searchSeguimiento(parametros) {
            return serviciosJava.seguimiento({servicio: "seguimiento"}, parametros);
        }

        function searchJustificacion(parametros) {
            return serviciosJava.justificacion({servicio: "justificacion"}, parametros);
        }
        function conexionDB(parametros) {
            return serviciosJava.nuevaConexionBD({servicio: "nuevaConexionBD"}, parametros);
        }

        function validarDato(valor) {
            var bandera = false;
            if (valor != undefined && valor != null && valor != '') {
                bandera = true;
            }
            return bandera;
        }

        function cargarAlumnosExcel(formData) {
            return $http.post(urlServicios + 'apiRest/cargarArchivoAlumnos', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
        }
        function confirmarCargaAsistencia(formData) {
            return $http.post( urlServicios + 'apiRest/confirmarCargaAsistencia', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
        }
    }
})();