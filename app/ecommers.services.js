(function () {
    'use strict';

    angular
        .module('eCommers')
        .factory('serviciosRest', serviciosRest);

    serviciosRest.$inject = ['$http', '$log', '$window', '$resource', 'urlServicios', 'alertasServicios'];

    /* @ngInject */
    function serviciosRest($http, $log, $window, $resource, urlServicios, alertasServicios) {

        var store = $window.localStorage;
        var llave = 'at-finance';
        var producto = null;
        var productoCat = null;
        var usuarioSesion = null;
        var textoBuscar = null;

        var serviciosJava = $resource(urlServicios+'apiRest/:servicio', {servicio: "@servicio"}, {
            getUsuarios: {
                method: 'POST', isArray: 'true', headers: {'Content-Type': 'application/json'}
            },
            getCategorias: {
                method: 'POST', isArray: 'true', headers: {'Content-Type': 'application/json'}
            },
            getPromociones: {
                method: 'POST', isArray: 'true', headers: {'Content-Type': 'application/json'}
            },
            getPromocionesActivos: {
                method: 'POST', isArray: 'true', headers: {'Content-Type': 'application/json'}
            },
            getProductos: {
                method: 'POST', isArray: 'true', headers: {'Content-Type': 'application/json'}
            },
            getProductosActivos: {
                method: 'POST', isArray: 'true', headers: {'Content-Type': 'application/json'}
            },
            getVentas: {
                method: 'POST', isArray: 'true', headers: {'Content-Type': 'application/json'}
            },
            crudTblUsuario: {
                method: 'POST', headers: {'Content-Type': 'application/json'}
            },
            crudTblPromocion: {
                method: 'POST', headers: {'Content-Type': 'application/json'}
            },
            crudTblCategoria: {
                method: 'POST', headers: {'Content-Type': 'application/json'}
            },
            crudTblProducto: {
                method: 'POST', headers: {'Content-Type': 'application/json'}
            },
            crudTblVenta: {
                method: 'POST', headers: {'Content-Type': 'application/json'}
            }
        });

        var pdfGenerico =  $resource( urlServicios + 'pdf/pdfGenerico', {}, {
            generarPdf: {
                method: 'POST', headers: {'Content-Type': 'application/json'},
                params: {
                    pnId: '@pnId',
                    nombrePdf: '@nombrePdf'
                }
            }
        });

        var metrica =  $resource(urlServicios +'metricas/:servicio', {servicio: "@servicio"}, {
            metricaUno: {
                method: 'POST', headers: {'Content-Type': 'application/json'}, isArray: 'true'
            },
            metricaDos: {
                method: 'POST', headers: {'Content-Type': 'application/json'}, isArray: 'true'
            }
        });

        var descargarPdf =  $resource( urlServicios + 'pdf/pdfDescargar', {}, {
            pdf: {
                method: 'POST', headers: {'Content-Type': 'application/json', accept: 'application/pdf'},
                params: {
                    pcURI: '@pcURI',
                    pcNombre: '@pcNombre'
                },
                responseType: 'arraybuffer',
                cache: false,
                transformResponse: function (data, headers) {
                    var pdf = null;
                    if (data) {
                        pdf = new Blob([data], {
                            type: 'application/pdf'
                        });
                    }
                    var result = {
                        blob: pdf
                    };

                    return {
                        response: result
                    };
                }
            }
        });

        var servicios = {
            setT: setT,
            validarDato: validarDato,
            setDatosProducto: setDatosProducto,
            getDatosProducto: getDatosProducto,
            getDatosSesion: getDatosSesion,
            setDatosSesion: setDatosSesion,
            subirArchivoGenerico: subirArchivoGenerico,
            getPromociones: getPromociones,
            getPromocionesActivos: getPromocionesActivos,
            getCategorias: getCategorias,
            getProductos: getProductos,
            getProductosActivos: getProductosActivos,
            getUsuarios: getUsuarios,
            getVentas: getVentas,
            crudTblUsuario: crudTblUsuario,
            crudTblPromocion: crudTblPromocion,
            crudTblCategoria: crudTblCategoria,
            crudTblProducto: crudTblProducto,
            setTextoBuscar: setTextoBuscar,
            getTextoBuscar: getTextoBuscar,
            setDatosProductoCat: setDatosProductoCat,
            getDatosProductoCat: getDatosProductoCat,
            crudTblVenta: crudTblVenta,
            replaceAll: replaceAll,
            generarPdf: generarPdf,
            getMetricaVentaPorDepartamento: getMetricaVentaPorDepartamento,
            getMetricaVentaPorProducto: getMetricaVentaPorProducto,
        };
        return servicios;

        function setT(t) {
            if (t) {
                store.setItem(llave, t);
            } else {
                store.removeItem(llave);
            }
        };

        function setDatosProducto(prod) {
            producto = prod;
        }

        function getDatosProducto() {
            return producto;
        }
        function setDatosProductoCat(categoria) {
            productoCat = categoria;
        }

        function getDatosProductoCat() {
            return productoCat;
        }

        function setDatosSesion(usuario) {
            usuarioSesion = usuario;
        }

        function getDatosSesion() {
            return usuarioSesion;
        }

        function setTextoBuscar(texto) {
            textoBuscar = texto;
        }

        function getTextoBuscar() {
            return textoBuscar;
        }

        function getPromociones(parametros) {
            return serviciosJava.getPromociones({servicio: "getPromociones"}, parametros);
        }
        function getPromocionesActivos(parametros) {
            return serviciosJava.getPromocionesActivos({servicio: "getPromocionesActivos"}, parametros);
        }

        function getCategorias(parametros) {
            return serviciosJava.getCategorias({servicio: "getCategorias"}, parametros);
        }

        function getProductos(parametros) {
            return serviciosJava.getProductos({servicio: "getProductos"}, parametros);
        }

        function getProductosActivos(parametros) {
            return serviciosJava.getProductosActivos({servicio: "getProductosActivos"}, parametros);
        }

        function getVentas(parametros) {
            return serviciosJava.getVentas({servicio: "getVentas"}, parametros);
        }

        function getUsuarios(parametros) {
            return serviciosJava.getUsuarios({servicio: "getUsuarios"}, parametros);
        }
        function crudTblUsuario(parametros) {
            return serviciosJava.crudTblUsuario({servicio: "crudUsuarios"}, parametros);
        }
        function crudTblPromocion(parametros) {
            return serviciosJava.crudTblPromocion({servicio: "crudPromocion"}, parametros);
        }
        function crudTblCategoria(parametros) {
            return serviciosJava.crudTblCategoria({servicio: "crudCategoria"}, parametros);
        }
        function crudTblProducto(parametros) {
            return serviciosJava.crudTblProducto({servicio: "crudCatProducto"}, parametros);
        }
        function crudTblVenta(parametros) {
            return serviciosJava.crudTblVenta({servicio: "crudVenta"}, parametros);
        }

        function validarDato(valor) {
            var bandera = false;
            if (valor != undefined && valor != null && valor != '') {
                bandera = true;
            }
            return bandera;
        }

        function subirArchivoGenerico(ruta, imagen, metodo, codNodo) {
            var fd = new FormData();
            fd.append('ruta', ruta);
            fd.append('file', imagen);
            fd.append('metodo', metodo);
            return $http.post( urlServicios + 'apiRest/crudDoctoGeneral', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
        }

        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        }

        function generarPdf( idGenerico, nombrePdf, correo) {
            var parametros = {
                pnId: idGenerico,
                nombrePdf: nombrePdf
            };
            var promesa = pdfGenerico.generarPdf({servicio: 'generarPdf'}, parametros).$promise;
            promesa.then(function (respuesta) {
                if (correo != "S") {
                    var parametros = {
                        pcURI: respuesta.ruta + respuesta.nombre + '.pdf',
                        pcNombre: respuesta.nombre
                    };
                    var promesaObtener = descargarPdf.pdf({}, parametros).$promise;
                    promesaObtener.then(function (datos) {
                        var blob = datos.response.blob;
                        ($window).saveAs(blob, respuesta.nombre + '.pdf');
                        borrarPdf(respuesta.ruta + respuesta.nombre + '.pdf');
                    });
                    promesaObtener.catch(function (error) {
                        alertasServicios.desplegarError(error);
                    });
                } else {
                    alertasServicios.desplegarSuccess("Correo enviado");
                }
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });

        }

        function borrarPdf(nombrePDF) {
            var borrarParametros = {
                pnId: nombrePDF,
                nombrePdf: "delete"
            };
            var borrarPdf = pdfGenerico.generarPdf({servicio: 'obtenerPdf'}, borrarParametros).$promise;
            borrarPdf.then(function (respuesta) {
                $log.info("se elimino el pdf");
            });
            borrarPdf.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }


        function getMetricaVentaPorDepartamento(parametros) {
            return metrica.metricaUno({servicio: "getVentasMetrica"}, parametros);
        }

        function getMetricaVentaPorProducto(parametros) {
            return metrica.metricaDos({servicio: "getVentasMetricaProducto"}, parametros);
        }

    }
})();