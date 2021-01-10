(function () {
    'use strict';

    angular
        .module('eCommers')
        .controller('Categoria', Categoria);

    Categoria.$inject = [ '$log', 'tblsServicios' ];

    function Categoria( $log, tblsServicios ) {

        /* jshint validthis: true */
        var categoriaCtrl = this;

        categoriaCtrl.tblCategorias = tblsServicios.getTabla('tblsGenerales', 'tblCategorias');
        categoriaCtrl.tblCategoriaProducto = tblsServicios.getTabla('tblsGenerales', 'tblCategoriaProducto');

        activarControlador();
        categoriaCtrl.seleccionarCategoria = seleccionarCategoria;
        categoriaCtrl.agregarCategoria = agregarCategoria;
        categoriaCtrl.editarCategoria = editarCategoria;
        categoriaCtrl.noHaCambiadoCategoria = noHaCambiadoCategoria;
        categoriaCtrl.eliminarCategoria = eliminarCategoria;

        categoriaCtrl.seleccionarProducto = seleccionarProducto;
        categoriaCtrl.agregarProducto = agregarProducto;
        categoriaCtrl.editarProducto = editarProducto;
        categoriaCtrl.noHaCambiadoProducto = noHaCambiadoProducto;
        categoriaCtrl.eliminarProducto = eliminarProducto;

        function activarControlador() {
            consultarCategorias();
        }

        function consultarCategorias() {

        }

        function seleccionarCategoria() {
            consultarProducto();
        }

        function agregarCategoria() {

        }

        function editarCategoria() {

        }

        function noHaCambiadoCategoria() {

        }

        function eliminarCategoria() {

        }

        function consultarProducto() {

        }

        function seleccionarProducto() {

        }

        function agregarProducto() {

        }

        function editarProducto() {

        }

        function noHaCambiadoProducto() {

        }

        function eliminarProducto() {

        }
    }
})();
