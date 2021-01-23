(function () {
    'use strict';

    angular
        .module('eCommers')
        .controller('Venta', Venta);

    Venta.$inject = [ '$log', 'tblsServicios', 'serviciosRest', '$timeout', '$scope', '$rootScope', '$filter', '$location' ];

    function Venta( $log, tblsServicios, serviciosRest, $timeout, $scope, $rootScope, $filter, $location ) {

        /* jshint validthis: true */
        var ventaCtrl = this;

        ventaCtrl.producto = null;
        ventaCtrl.usuarioSesion = null;
        ventaCtrl.fechaCompra = new Date();

        $rootScope.ocultarBuscarMenuSuperior = false;

        var producto = serviciosRest.getDatosProducto();
        ventaCtrl.datosSesion = serviciosRest.getDatosSesion();

        $scope.$watch('ventaCtrl.datosSesion', function (registro) {
            if(registro){
                ventaCtrl.usuarioSesion = registro;
            }
        }, true);

        activarControlador();

        ventaCtrl.iniciarSesion = iniciarSesion;
        ventaCtrl.abrirModalVenta = abrirModalVenta;
        ventaCtrl.agregarVenta = agregarVenta;
        ventaCtrl.mdlSoloResgistro = mdlSoloResgistro;
        ventaCtrl.generarPDF = generarPDF;

        function activarControlador() {
            if(producto) {
                ventaCtrl.producto = producto;
            }

            if($rootScope.usuarioSesion) {
                ventaCtrl.nuevaVenta = angular.copy($rootScope.usuarioSesion);
            }

        }

        function iniciarSesion() {
            var mapa = {
                pcUsuario: ventaCtrl.usr.username,
                pcPassword: ventaCtrl.usr.password
            };
            var promesa = serviciosRest.getUsuarios(mapa).$promise;
            promesa.then(function (respuesta) {
                if(respuesta.length > 0) {
                    ventaCtrl.usuarioSesion = respuesta[0];
                    $rootScope.usuarioSesion = respuesta[0];
                    serviciosRest.setDatosSesion(ventaCtrl.usuarioSesion);
                    ventaCtrl.nuevaVenta = angular.copy(ventaCtrl.usuarioSesion);
                } else ventaCtrl.usuarioSesion = null;
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }

        function mdlSoloResgistro() {
            angular.element("#mdlSoloResgistro").modal("show");
        }

        function abrirModalVenta() {
            angular.element("#mdlRegistroVenta").modal("show");
        }

        function agregarVenta() {

            var fecha = $filter('fechaSimple')(new Date());

            var mapa = 0 + ","; //ID_VENTA
            mapa += ventaCtrl.usuarioSesion.idUsuario + ","; //ID_USUARIO
            mapa += ventaCtrl.producto.idProducto + ","; //ID_PRODUCTO
            mapa += ventaCtrl.producto.precio + ","; //MTOVENTA
            mapa += (ventaCtrl.nuevaVenta.calle?ventaCtrl.nuevaVenta.calle:null) + ","; //NOEXT
            mapa += (ventaCtrl.nuevaVenta.noExt?ventaCtrl.nuevaVenta.noExt:null) + ",";
            mapa += (ventaCtrl.nuevaVenta.noInterior?ventaCtrl.nuevaVenta.noInterior:null) + ",";
            mapa += (ventaCtrl.nuevaVenta.codPos?ventaCtrl.nuevaVenta.codPos:null) + ",";
            mapa += (ventaCtrl.nuevaVenta.colonia?ventaCtrl.nuevaVenta.colonia:null) + ",";
            mapa += (ventaCtrl.nuevaVenta.municipio?ventaCtrl.nuevaVenta.municipio:null) + ",";
            mapa += (ventaCtrl.nuevaVenta.ciudad?ventaCtrl.nuevaVenta.ciudad:null) + ",";
            mapa += (ventaCtrl.nuevaVenta.estado?ventaCtrl.nuevaVenta.estado:null) + ",";
            mapa += (ventaCtrl.nuevaVenta.pais?ventaCtrl.nuevaVenta.pais:null) + ",";
            mapa += ventaCtrl.nuevaVenta.referencia;
            var datosMapa = {
                pcAccion:  "INSERT",
                pcTextoAdd:  mapa
            };
            var promesa = serviciosRest.crudTblVenta(datosMapa).$promise;
            promesa.then(function (respuesta) {
                ventaCtrl.ventaCompletada = null;
                consultarVentaEfectuada();
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }

        function consultarVentaEfectuada() {
            var datosMapa = { };
            var promesa = serviciosRest.getVentas(datosMapa).$promise;
            promesa.then(function (respuesta) {
                ventaCtrl.ventaCompletada = _.filter(respuesta, function (venta) {
                    return venta.idProducto == ventaCtrl.producto.idProducto &&
                           venta.idUsuario == ventaCtrl.usuarioSesion.idUsuario &&
                           venta.referencia == ventaCtrl.nuevaVenta.referencia;
                });

                $timeout(function () {
                    angular.element("#mdlVentaCompletada").modal("show");
                });
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }

        function generarPDF() {
            $log.info("Entra a metodo generarPDF() de CotizadorControlador");
            var htmlcontentMdl = angular.element('#pdf-recibo-compra');
            var contentMdl = '<html>';
            contentMdl += '<style>@media print {  html {  zoom: ';
            contentMdl += 100;
            contentMdl += '%; } }</style>';
            contentMdl += '<link rel="stylesheet" href="css/estilosPdf.css" />';
            contentMdl += '<div id="container"><div id="left"><span class="textNegro">';
            contentMdl += "Tienda Online JC";
            contentMdl += '</span><br/><br/>';
            contentMdl += '<br/></div><br/><br/><br/><br/><br/>';
            contentMdl += '<div style="margin-top: 20px">';
            contentMdl += htmlcontentMdl[0].outerHTML;
            contentMdl += '</div></html>';
            $timeout(function (){
                //Realizar la estrucutura HTML
                var doc = document.getElementById('print-iframe').contentWindow.document;
                doc.open();
                doc.write(contentMdl);
                doc.close();
                $timeout(function (){
                    $("#print-iframe").get(0).contentWindow.print();
                    angular.element("#mdlVentaCompletada").modal("hide");
                    $timeout(function () {
                        $location.path('/producto');
                    }, 1000);
                },500);
            },100);

        }

    }
})();
