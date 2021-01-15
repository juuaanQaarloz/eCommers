(function () {
    'use strict';

    angular
        .module('eCommers')
        .controller('Productos', Productos);

    Productos.$inject = [ '$log', 'tblsServicios', 'serviciosRest'];

    function Productos( $log, tblsServicios, serviciosRest ) {

        /* jshint validthis: true */
        var productoCtrl = this;

        productoCtrl.producto = null;

        var producto = serviciosRest.getDatosProducto();

        activarControlador();

        function activarControlador() {

            console.log(producto);
            console.log(producto);
            console.log(producto);

            if(producto) {
                productoCtrl.producto = producto;
            }
        }


    }
})();
