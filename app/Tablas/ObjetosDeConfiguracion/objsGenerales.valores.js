/**
 * Created by Israel Guzman on 2014-08-21.
 * @description Archivo donde se encuentra las configuraciones de todas las tablas del modulo de objsGenerales.
 */
(function () {
    /**
     * @type {module|*} "tablas" Módulo de tablas generales de eAspayb.
     */
    angular.module('objsGenerales')
        .value('tblTokens', {
            id: 'idTablaTokens',
            paginacion: [10, 30, 50, 100],
            permisos: {agregar: false, borrar: false, modificar: false, consultar: true},
            modals: {agregar: '', borrar: '', modificar: ''},
            columnas: [
                {valor: 'num', tipo: 'string', descripcion: '#'},
                {valor: 'token', tipo: 'string', descripcion: 'Token'},
                {valor: 'descripcion', tipo: 'string', descripcion: 'Descripción'},
                {valor: 'fila', tipo: 'string', descripcion: 'Fila'},
            ]
        })
    ;
})();
