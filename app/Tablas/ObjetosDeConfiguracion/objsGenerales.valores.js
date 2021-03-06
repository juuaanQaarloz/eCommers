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
        .value('tblUsuarios', {
            id: 'idTablaUsuario',
            paginacion: [10, 30, 50, 100],
            permisos: {agregar: true, borrar: true, modificar: true, consultar: true},
            modals: {agregar: 'usuarioA', borrar: 'usuarioB', modificar: 'usuarioM'},
            columnas: [
                {valor: 'nombreUsuario', tipo: 'string', descripcion: 'Nombre Usuario'},
                {valor: 'descTipoUsuario', tipo: 'string', descripcion: 'Tipo de Usuario'},
                {valor: 'email', tipo: 'string', descripcion: 'Correo Electrónico'}
            ]
        })
        .value('tblPromociones', {
            id: 'idTablaPromociones',
            paginacion: [10, 30, 50, 100],
            permisos: {agregar: true, borrar: true, modificar: true, consultar: true},
            modals: {agregar: 'promocionA', borrar: 'promocionB', modificar: 'promocionM'},
            columnas: [
                {valor: 'orden', tipo: 'string', descripcion: 'Orden'},
                {valor: 'nombrePromocion', tipo: 'string', descripcion: 'Nombre Promocion'},
                {valor: 'indVigente', tipo: 'string', descripcion: '¿Vigente?'},
                {valor: 'descripcionCategoria', tipo: 'string', descripcion: 'Categoria'},
                {valor: 'descripcionProducto', tipo: 'string', descripcion: 'Producto'},
                {valor: 'descripcion', tipo: 'string', descripcion: 'Descripcion'}
            ]
        })
        .value('tblCategoria', {
            id: 'idTablaCategoria',
            paginacion: [10, 30, 50, 100],
            permisos: {agregar: true, borrar: true, modificar: true, consultar: true},
            modals: {agregar: 'categoriaA', borrar: 'categoriaB', modificar: 'categoriaM'},
            columnas: [
                {valor: 'calle', tipo: 'string', descripcion: 'Calle'},
                {valor: 'noExterior', tipo: 'string', descripcion: 'No Exterior'}
            ]
        })

    ;
})();
