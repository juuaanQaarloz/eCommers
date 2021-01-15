(function () {
    'use strict';

    angular
        .module('eCommers')
        .controller('Venta', Venta);

    Venta.$inject = [ '$log', 'tblsServicios', 'serviciosRest' ];

    function Venta( $log, tblsServicios, serviciosRest ) {

        /* jshint validthis: true */
        var ventaCtrl = this;

        ventaCtrl.producto = null;
        ventaCtrl.usuarioSesion = null;

        var producto = serviciosRest.getDatosProducto();

        activarControlador();

        function activarControlador() {

            console.log(producto);
            console.log(producto);
            console.log(producto);

            if(producto) {
                ventaCtrl.producto = producto;
            }
        }
    }
})();
