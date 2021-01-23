(function () {
    'use strict';

    angular
        .module('eCommers')
        .controller('AdministracionDatos', AdministracionDatos);

    AdministracionDatos.$inject = [ '$log', 'tblsServicios' ];

    function AdministracionDatos( $log, tblsServicios ) {

        /* jshint validthis: true */
        var administracionDatosCtrl = this;
        $rootScope.ocultarBuscarMenuSuperior = false;

        administracionDatosCtrl.tabSeleccionada = 1;

    }
})();
