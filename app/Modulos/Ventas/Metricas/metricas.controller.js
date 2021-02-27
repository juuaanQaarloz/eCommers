(function () {
    'use strict';

    angular
        .module('eCommers')
        .controller('Metricas', Metricas);

    Metricas.$inject = [ '$log', 'tblsServicios', 'serviciosRest', '$timeout', '$scope', '$rootScope', '$filter',
        '$location', 'webStorage', 'alertasServicios'];

    function Metricas( $log, tblsServicios, serviciosRest, $timeout, $scope, $rootScope, $filter, $location,
                    webStorage, alertasServicios ) {

        /* jshint validthis: true */
        var metricasCtrl = this;

        $rootScope.ocultarBuscarMenuSuperior = true;
        metricasCtrl.busqueda = {};

        metricasCtrl.cbxCategorias = {
            placeholder: "Seleccione", filter: "contains",
            dataTextField: "nombreCategoria",
            dataValueField: "idCategoria"
        };

        metricasCtrl.cbxProductos = {
            placeholder: "Seleccione", filter: "contains",
            dataTextField: "nombreProducto",
            dataValueField: "idProducto"
        };

        activarControlador();
        metricasCtrl.limpiar = limpiar;
        metricasCtrl.buscar = buscar;
        metricasCtrl.buscarP = buscarP;
        metricasCtrl.consultarProductos = consultarProductos;


        function activarControlador() {
            $timeout(function () {
                metricasCtrl.mostrarSecciones = false;
                if(!$rootScope.usuarioSesion || $rootScope.usuarioSesion.tipoUsuario != 'A') {
                    alertasServicios.desplegarMensaje("Tú no puedes acceder a esta opción no eres un adminsitrador de sistema");
                    $timeout(function () {
                        $location.path('/inicio');
                    }, 500)
                } else {
                    metricasCtrl.mostrarSecciones = true;
                    consultarCategorias();
                    consultarProductos();
                }
            }, 1000);
        }

        function consultarCategorias() {
            metricasCtrl.categorias = [];
            var mapa = new Object();
            var promesa = serviciosRest.getCategorias(mapa).$promise;
            promesa.then(function (respuesta) {
                metricasCtrl.categorias =  respuesta;
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }
        function consultarProductos(categoria) {
            metricasCtrl.productosActivos = [];
            if(categoria){
                var mapa = {
                    pnIdGenerico: categoria
                };
            } else {
                var mapa = {};
            }
            var promesa = serviciosRest.getProductosActivos(mapa).$promise;
            promesa.then(function (respuesta) {
                metricasCtrl.productosActivos = respuesta;
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }


        function limpiar() {
            metricasCtrl.busqueda = {};
            metricasCtrl.datosConsulta = [];
            metricasCtrl.categoria = null;
            metricasCtrl.bndHTML = false;
            metricasCtrl.producto = null;

            consultarCategorias();
            consultarProductos();
        }

        function buscar() {
            metricasCtrl.tipoDeGrafica = 1;
            metricasCtrl.bndHTML = false;
            metricasCtrl.ventaPorDepartamento = [];

            var fecha = null;
            if(metricasCtrl.busqueda.fecAl){
                var fecAl = $filter('fechaSimple')(metricasCtrl.busqueda.fecAl);
                fecha = fecAl.split("/")[2] + "-" + fecAl.split("/")[1] + "-" + fecAl.split("/")[0];
            }

            var mapa = {
                pnIdGenerico: (metricasCtrl.busqueda.categoria?metricasCtrl.busqueda.categoria:null),
                pnIdProducto: (metricasCtrl.busqueda.producto?metricasCtrl.busqueda.producto:null),
                pcFechaAl: fecha
            };

            var promesa = serviciosRest.getMetricaVentaPorDepartamento(mapa).$promise;
            promesa.then(function (respuesta) {
                metricasCtrl.bndHTML = true;
                metricasCtrl.ventaPorDepartamento = respuesta;

                var data = [];
                angular.forEach(respuesta, function (venta, index) {
                    var mapa = {
                        "country": venta.nombreCategoria,
                        "visits": parseInt((venta.numTotal?venta.numTotal:0))
                    };
                    data.push(mapa);
                    if((index+1) == respuesta.length){
                        $timeout(function () {
                            crearGrafica(data);
                        }, 500);
                    }
                });


            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });

        }

        function buscarP() {
            metricasCtrl.bndHTML = false;
            metricasCtrl.ventaPorDepartamento = [];

            var fecha = null;
            if(metricasCtrl.busqueda.fecAl){
                var fecAl = $filter('fechaSimple')(metricasCtrl.busqueda.fecAl);
                fecha = fecAl.split("/")[2] + "-" + fecAl.split("/")[1] + "-" + fecAl.split("/")[0];
            }

            var mapa = {
                pnIdGenerico: (metricasCtrl.busqueda.categoria?metricasCtrl.busqueda.categoria:null),
                pnIdProducto: (metricasCtrl.busqueda.producto?metricasCtrl.busqueda.producto:null),
                pcFechaAl: fecha
            };

            var promesa = serviciosRest.getMetricaVentaPorProducto(mapa).$promise;
            promesa.then(function (respuesta) {
                metricasCtrl.bndHTML = true;
                metricasCtrl.ventaPorDepartamento = respuesta;

                var data = [];
                angular.forEach(respuesta, function (venta, index) {
                    var mapa = {
                        "country": venta.nombreProducto,
                        "visits": parseInt((venta.numTotal?venta.numTotal:0))
                    };
                    data.push(mapa);
                    if((index+1) == respuesta.length){
                        $timeout(function () {
                            crearGraficaP(data);
                        }, 500);
                    }
                });


            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });

        }


        function crearGrafica(data) {
            am4core.ready(function() {

                am4core.useTheme(am4themes_animated);
                var chart = am4core.create("chartdiv", am4charts.XYChart);

                chart.data = data;

                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "country";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 30;

                categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
                    if (target.dataItem && target.dataItem.index & 2 == 2) {
                        return dy + 25;
                    }
                    return dy;
                });

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = "visits";
                series.dataFields.categoryX = "country";
                series.name = "Visits";
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                series.columns.template.fillOpacity = .8;

                var columnTemplate = series.columns.template;
                columnTemplate.strokeWidth = 2;
                columnTemplate.strokeOpacity = 1;

            });
        }

        function crearGraficaP(data) {
            am4core.ready(function() {

                am4core.useTheme(am4themes_animated);
                var chart = am4core.create("chartdivProd", am4charts.XYChart);

                chart.data = data;

                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "country";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 30;

                categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
                    if (target.dataItem && target.dataItem.index & 2 == 2) {
                        return dy + 25;
                    }
                    return dy;
                });

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = "visits";
                series.dataFields.categoryX = "country";
                series.name = "Visits";
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                series.columns.template.fillOpacity = .8;

                var columnTemplate = series.columns.template;
                columnTemplate.strokeWidth = 2;
                columnTemplate.strokeOpacity = 1;

            });
        }



    }
})();
