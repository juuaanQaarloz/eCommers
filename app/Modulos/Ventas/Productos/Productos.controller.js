(function () {
    'use strict';

    angular
        .module('eCommers')
        .controller('Productos', Productos);

    Productos.$inject = [ '$log', 'tblsServicios', 'serviciosRest', '$timeout', '$location'];

    function Productos( $log, tblsServicios, serviciosRest, $timeout, $location ) {

        /* jshint validthis: true */
        var productoCtrl = this;

        productoCtrl.producto = null;
        productoCtrl.productosList = [
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

        var producto = serviciosRest.getDatosProducto();
        var categoria = serviciosRest.getDatosProducto();

        activarControlador();

        productoCtrl.irADetalleProducto = irADetalleProducto;
        productoCtrl.irADetalleVenta = irADetalleVenta;

        function activarControlador() {

            console.log(producto);
            console.log(producto);
            console.log(producto);

            if(producto) {
                productoCtrl.producto = producto;
            } else if (categoria){
                buscarPorCategoria();
            }
        }

        function buscarPorCategoria() {
            console.log(categoria);
            console.log(categoria);
        }

        function irADetalleProducto(producto) {
            productoCtrl.producto = null;
            $timeout(function () {
                productoCtrl.producto = producto;
            })
        }


        function irADetalleVenta(producto) {
            serviciosRest.setDatosProducto(producto);
            $timeout(function () {
                $location.path('/venta');
            }, 100);
        }

    }
})();
