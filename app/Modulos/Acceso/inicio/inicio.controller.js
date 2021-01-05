(function () {
    'use strict';
    angular
        .module('eAspayb')
        .controller('InicioControlador', InicioControlador);

    /* @ngInject */
    function InicioControlador($log, tblsServicios, $timeout, serviciosRest, alertasServicios) {
        /* jshint validthis: true */
        var inicioCtrl = this;

        /** Obtener configuracion de Tabla **/
        inicioCtrl.tblTokens = tblsServicios.getTabla('tblsGenerales', 'tblTokens');

        /** Variables, Listas, Objetos, banderas **/
        inicioCtrl.bndInicio = true;
        inicioCtrl.planillaAlumnos = 'Modulos/Acceso/inicio/platilla/plantillaAsistencia.xlsx';
        inicioCtrl.profesor = {};
        inicioCtrl.profesor.nombre = 'JUAN CARLOS NUTE HERNANDEZ';
        var colores = ['#2283C1', '#509B11', '#A19E05', '#A13705', '#BB1903', '#03B5BB', '#0361BB', '#5E30B2',
                       '#B230AE', '#A1133C'];

        /** Configuracion de Datepicker */

        inicioCtrl.opcionesMenu = [
            {idOpcion: 'C', opcion: 'Carga Asistencia Excel', descripcion: 'Con un archivo excel se subira la asistencia de los alumnos'},
            {idOpcion: 'S', opcion: 'Seguimiento de Asistencia', descripcion: 'Analisis de la asistencia del grupo y materia'},
            {idOpcion: 'J', opcion: 'Justificacion de Faltas', descripcion: 'Solo para Justificacion de Faltas a alumnos'},
        ];

        inicioCtrl.clases = [
            {idClase: 1, nombre: 'Programación Orientada a Objetos'},
            {idClase: 2, nombre: 'Programación WEB'},
        ];

        /** Funciones del Controlador **/
        activarControlador();
        inicioCtrl.login = login;
        inicioCtrl.logout = logout;
        inicioCtrl.seleccionarOpcion = seleccionarOpcion;
        inicioCtrl.seleccionarOpcionMenu = seleccionarOpcionMenu;
        inicioCtrl.numeroIndexAleatorio = numeroIndexAleatorio;

        inicioCtrl.limpiarCarga = limpiarCarga;
        inicioCtrl.cargarArchivo = cargarArchivo;
        inicioCtrl.confirmarAsistencia = confirmarAsistencia;

        inicioCtrl.buscarSeguimiento = buscarSeguimiento;
        inicioCtrl.limpiarBuscar = limpiarBuscar;
        inicioCtrl.seleccionarSeguimiento = seleccionarSeguimiento;

        inicioCtrl.buscarJustificaciones = buscarJustificaciones;
        inicioCtrl.limpiarBuscarJustificar = limpiarBuscarJustificar;
        inicioCtrl.seleccionarJustificacion = seleccionarJustificacion;

        function activarControlador() {
            angular.forEach(inicioCtrl.opcionesMenu, function (resp) {
                var numero = numeroIndexAleatorio();
                $timeout(function () {
                    resp.color = colores[numero];
                });
            });
            limpiarBuscar();
            limpiarBuscarJustificar();
            limpiarCarga(true);
        }

        function numeroIndexAleatorio() {
            return Math.floor((Math.random() * 11));
        }

        function login() {
            console.log("Esta entrando al metodo de Login");
            var parametros = {
                nombre: inicioCtrl.usuario,
                contrasenia: inicioCtrl.contrasenia
            }
            var promesa = serviciosRest.login(parametros).$promise;
            promesa.then(function (respuesta) {
                if(respuesta.length>0){
                    inicioCtrl.bndInicio = false;
                    inicioCtrl.profesor = respuesta[0];
                    alertasServicios.desplegarInfo("Bienvenido Profesor: " + inicioCtrl.profesor.nombre);
                }
            });
            promesa.catch(function (error) {
             alertasServicios.desplegarError(error);
            });
            /*$timeout(function () {
                inicioCtrl.bndInicio = false;
                alertasServicios.desplegarInfo("Bienvenido Profesor: " + inicioCtrl.profesor.nombre);
            }, 500)*/
        }

        function seleccionarOpcion(opcion) {
            console.log("Esta entrando al metodo de seleccionarOpcion");
            inicioCtrl.opcionSeleccionada = null;
            $timeout(function () {
                inicioCtrl.opcionSeleccionada = opcion;
            })
        }

        function seleccionarOpcionMenu(indOpcion, visualizar) {
            console.log("Esta entrando al metodo de seleccionarOpcionMenu");
            var opcion = _.filter(inicioCtrl.opcionesMenu, function (opcion) {
                return opcion.idOpcion == indOpcion;
            });
            if(opcion.length>0 && !visualizar){
                seleccionarOpcion(opcion[0]);
            } else if(visualizar){
                return opcion.length>0;
            }
        }


        /************** INICIO SECCION PARA PODER CARGAR ARCHIVO ****************/

        function cargarArchivo() {
            console.log("Esta entrando al metodo de cargarArchivo");
            var fd = new FormData();
            inicioCtrl.idCarga = angular.copy(new Date().getTime());
            fd.append('idCarga', inicioCtrl.idCarga);
            fd.append('file', inicioCtrl.archivo);
            fd.append('fechaAsistencia', inicioCtrl.fechaAsistencia);
            fd.append('materia', inicioCtrl.materia);
            var promesaArchivo = serviciosRest.cargarAlumnosExcel(fd);
            promesaArchivo.then(function (respuesta) {
                if(respuesta.length > 0) {
                    alertasServicios.desplegarSuccess("Se ha cargado la asistencia correctamente");
                    inicioCtrl.listaDatosCargado = respuesta;
                }
            });
            promesaArchivo.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            })
        }

        function confirmarAsistencia() {
            console.log("Esta entrando al metodo de confirmarAsistencia");
            var fd = new FormData();
            fd.append('idCarga', inicioCtrl.idCarga);
            fd.append('file', inicioCtrl.archivo);
            fd.append('fechaAsistencia', inicioCtrl.fechaAsistencia);
            fd.append('materia', inicioCtrl.materia);
            var promesaArchivo = serviciosRest.confirmarCargaAsistencia(fd);
            promesaArchivo.then(function (respuesta) {
                alertasServicios.desplegarSuccess("Se ha confirmado la asistencia correctamente");
                limpiarCarga()
            });
            promesaArchivo.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            })
        }

        function limpiarCarga(bnd) {
            console.log("Esta entrando al metodo de limpiarBusqueda");
            inicioCtrl.fechaAsistencia = null;
            inicioCtrl.materia = null;
            inicioCtrl.archivo = null;
            inicioCtrl.listaDatosCargado = [];
            if(!bnd)
                inicioCtrl.limpiarArchivo();
        }

        /************** FIN SECCION PARA PODER CARGAR ARCHIVO ****************/



        /************** INICIO SECCION SECCION SEGUIMIENTO ****************/

        function buscarSeguimiento() {
            console.log("Esta entrando al metodo de buscarSeguimiento");
            var parametros = {
                pnIdProfesor: inicioCtrl.profesor.idProfesor,
                pcMateria: inicioCtrl.materiaSeg,
                pcFechaAsistencia: inicioCtrl.fecAsistencia,
                pcIndAsistencia: inicioCtrl.indAsistio,
                pcMatriculaAlumno: inicioCtrl.matricula
            }
            var promesa = serviciosRest.searchSeguimiento(parametros).$promise;
            promesa.then(function (respuesta) {
                if(respuesta.length>0){
                    inicioCtrl.seguimiento = respuesta;
                }
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarError(error);
            });
        }

        function limpiarBuscar() {
            inicioCtrl.materiaSeg = null;
            inicioCtrl.fecAsistencia = null;
            inicioCtrl.indAsistio = null;
            inicioCtrl.seguimientoSeleccionado = null;
            inicioCtrl.seguimiento = [];
        }

        function seleccionarSeguimiento(row) {
            inicioCtrl.seguimientoSeleccionado = row;
            buscarJustificacionById(row.idAsistencia);
        }

        function buscarJustificacionById(idAsistencia) {
            console.log("Esta entrando al metodo de buscarJustificacion");
            inicioCtrl.seguimientoJustificacion = [];
            var parametros = {
                pnIdAsistencia: idAsistencia
            };
            var promesa = serviciosRest.searchJustificacion(parametros).$promise;
            promesa.then(function (respuesta) {
                if(respuesta.length>0){
                    inicioCtrl.seguimientoJustificacion = respuesta;
                }
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarError(error);
            });
        }

        /************** FIN SECCION SECCION SEGUIMIENTO ****************/


        /************** INICIO SECCION SECCION JUSTIFICACIONES ****************/
        function buscarJustificaciones(idAsistencia) {
            console.log("Esta entrando al metodo de buscarJustificacion");
            inicioCtrl.seguimientoJustificacion = [];
            var parametros = {
                pnIdProfesor: inicioCtrl.profesor.idProfesor,
                pcMateria: inicioCtrl.materiaJustificacion,
                pcFechaAsistencia: inicioCtrl.fecAsistenciaJust,
                pcMatriculaAlumno: inicioCtrl.matriculaJustificacion
            };
            var promesa = serviciosRest.searchJustificacion(parametros).$promise;
            promesa.then(function (respuesta) {
                if(respuesta.length>0){
                    inicioCtrl.justificacion = respuesta;
                }
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarError(error);
            });
        }

        function limpiarBuscarJustificar() {
            inicioCtrl.materiaJustificacion = null;
            inicioCtrl.fecAsistenciaJust = null;
            inicioCtrl.matriculaJustificacion = null;
            inicioCtrl.matriculaJustificacion = null;
            inicioCtrl.justificacion = [];
        }

        function seleccionarJustificacion(row) {
            inicioCtrl.justificacionSeleccionado = row;
        }

        /************** FIN SECCION SECCION JUSTIFICACIONES ****************/

        function logout() {
            inicioCtrl.usuario = null;
            inicioCtrl.contrasenia = null;
            inicioCtrl.profesor = null;
            limpiarBuscar();
            limpiarBuscarJustificar();
            limpiarCarga(true);
            $timeout(function () {
                alertasServicios.desplegarInfo("Acaba de Cerrar Sesión Correctamente");
                inicioCtrl.bndInicio = true;
            });
        }

    }
})();
