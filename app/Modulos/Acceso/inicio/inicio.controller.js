(function () {
    'use strict';
    angular
        .module('eCommers')
        .controller('InicioControlador', InicioControlador);

    /* @ngInject */
    function InicioControlador($log, tblsServicios, $timeout, serviciosRest, alertasServicios, $scope, $location,
                               urlArchivos, $rootScope) {
        /* jshint validthis: true */
        var inicioCtrl = this;

        inicioCtrl.viewCarrucel = false;
        /** Obtener configuracion de Tabla **/
        inicioCtrl.tblTokens = tblsServicios.getTabla('tblsGenerales', 'tblTokens');
        inicioCtrl.urlImagenes = urlArchivos;
        $rootScope.ocultarBuscarMenuSuperior = false;

        /** Funciones del Controlador **/
        activarControlador();
        inicioCtrl.irADetalleVenta = irADetalleVenta;
        inicioCtrl.irADetalleProducto = irADetalleProducto;
        inicioCtrl.irADetalleProductoCat = irADetalleProductoCat;
        inicioCtrl.irAComprarProducto = irAComprarProducto;

        function activarControlador() {
            $timeout(function () {
                inicioCtrl.viewCarrucel = true;
                consultarPromociones();
                consultarProductos();
                consultarCategorias();
            });
        }

        function consultarPromociones() {
            inicioCtrl.promocionesActivas = [];
            var mapa = new Object();
            var promesa = serviciosRest.getPromocionesActivos(mapa).$promise;
            promesa.then(function (respuesta) {
                angular.forEach(respuesta, function (promo) {
                    promo.urlImagen = urlArchivos + "promociones/" + promo.idPromocion + "/" + promo.imagen;
                });
                inicioCtrl.promocionesActivas =  respuesta;
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }
        function consultarCategorias() {
            inicioCtrl.categorias = [];
            var mapa = new Object();
            var promesa = serviciosRest.getCategorias(mapa).$promise;
            promesa.then(function (respuesta) {
                angular.forEach(respuesta, function (catego) {
                    catego.urlImagen = urlArchivos + "categorias/" + catego.idCategoria + "/" + catego.imagen;
                });
                inicioCtrl.categorias =  respuesta;
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }
        function consultarProductos() {
            inicioCtrl.productosActivos = [];
            var mapa = new Object();
            var promesa = serviciosRest.getProductosActivos(mapa).$promise;
            promesa.then(function (respuesta) {
                angular.forEach(respuesta, function (produtc) {
                    produtc.urlImagen = urlArchivos + "productos/" + produtc.idProducto + "/" + produtc.imagen;
                });
                inicioCtrl.productosActivos = respuesta;
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }


        function irADetalleProducto(producto) {
            serviciosRest.setDatosProducto(producto);
            $timeout(function () {
                $location.path('/producto');
            }, 100);
        }

        function irADetalleProductoCat(producto) {
            serviciosRest.setDatosProductoCat(producto);
            $timeout(function () {
                $location.path('/producto');
            }, 100);
        }


        function irADetalleVenta(producto) {
            serviciosRest.setDatosProducto(producto);
            $timeout(function () {
                $location.path('/venta');
            }, 100);
        }

        function irAComprarProducto(producto) {
            serviciosRest.setDatosProducto(producto);
            $timeout(function () {
                $location.path('/venta');
            }, 100);
        }


    }
})();
