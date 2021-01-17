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
        ventaCtrl.fechaCompra = new Date();

        var producto = serviciosRest.getDatosProducto();

        activarControlador();

        ventaCtrl.iniciarSesion = iniciarSesion;
        ventaCtrl.abrirRegistrarUsuario = abrirRegistrarUsuario;
        ventaCtrl.registrarUsuario = registrarUsuario;
        ventaCtrl.abrirModalVenta = abrirModalVenta;
        ventaCtrl.registrarVenta = registrarVenta;

        function activarControlador() {

            console.log(producto);
            console.log(producto);
            console.log(producto);

            if(producto) {
                ventaCtrl.producto = producto;
            }
        }

        function iniciarSesion() {

        }

        function abrirRegistrarUsuario() {
            angular.element("#mdlRegistroVenta").modal("show");
        }

        function registrarUsuario() {

        }

        function abrirModalVenta() {

        }

        function registrarVenta() {

        }


    }
})();
