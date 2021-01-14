(function () {
    'use strict';
    angular
        .module('eCommers')
        .controller('InicioControlador', InicioControlador);

    /* @ngInject */
    function InicioControlador($log, tblsServicios, $timeout, serviciosRest, alertasServicios, $scope) {
        /* jshint validthis: true */
        var inicioCtrl = this;

        inicioCtrl.viewCarrucel = false;
        /** Obtener configuracion de Tabla **/
        inicioCtrl.tblTokens = tblsServicios.getTabla('tblsGenerales', 'tblTokens');

        inicioCtrl.dataArray = [
            {
                src: 'https://www.pallomaro.com/wp-content/uploads/2018/09/Gran-promocion-pallomaro-02-02.png',
                orden: 1
            },
            {
                src: 'https://www.travelexcellence.com/images/movil/La_Paz_Waterfall.jpg',
                orden: 4
            },
            {
                src: 'http://www.parasholidays.in/blog/wp-content/uploads/2014/05/holiday-tour-packages-for-usa.jpg',
                orden: 3
            },
            {
                src: 'http://clickker.in/wp-content/uploads/2016/03/new-zealand-fy-8-1-Copy.jpg',
                orden: 2
            },
            {
                src: 'http://clickker.in/wp-content/uploads/2016/03/new-zealand-fy-8-1-Copy.jpg',
                orden: 6
            },
            {
                src: 'http://clickker.in/wp-content/uploads/2016/03/new-zealand-fy-8-1-Copy.jpg',
                orden: 7
            }
        ];

        /** Funciones del Controlador **/
        activarControlador();
        inicioCtrl.nuevaConexionDB = nuevaConexionDB;

        function activarControlador() {
            $timeout(function () {
                inicioCtrl.viewCarrucel = true;
                inicioCtrl.losMasVendido = inicioCtrl.dataArray;
            });
        }

        function nuevaConexionDB() {
            var mapa = new Object();
            var promesa = serviciosRest.conexionDB(mapa).$promise;
            promesa.then(function (respuesta) {

            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }


    }
})();
