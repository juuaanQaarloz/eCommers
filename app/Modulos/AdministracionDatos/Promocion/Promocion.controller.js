(function () {
    'use strict';

    angular
        .module('eCommers')
        .controller('Promocion', Promocion);

    Promocion.$inject = [ '$log', 'tblsServicios' ];

    function Promocion( $log, tblsServicios ) {

        /* jshint validthis: true */
        var promocionCtrl = this;

        promocionCtrl.cbxCategoria = {
            placeholder: "Seleccione",
            dataTextField: "categoria",
            dataValueField: "idCategoria"
        };

        promocionCtrl.cbxProducto = {
            placeholder: "Seleccione",
            dataTextField: "producto",
            dataValueField: "idProducto"
        };

        promocionCtrl.tblPromociones = tblsServicios.getTabla('tblsGenerales', 'tblPromociones');


        activarControlador();
        promocionCtrl.seleccionarPromociones = seleccionarPromociones;
        promocionCtrl.agregarPromociones = agregarPromociones;
        promocionCtrl.editarPromociones = editarPromociones;
        promocionCtrl.noHaCambiado = noHaCambiado;
        promocionCtrl.eliminarPromociones = eliminarPromociones;

        promocionCtrl.nuevaPromocion = {};

        function activarControlador() {
            consultarPromociones();
        }

        function consultarPromociones() {
            promocionCtrl.promociones = [
                {
                    idPromocion: 1 + new Date().getDate(),
                    nombrePromocion: "INVIERNO 2020",
                    descripcion: "Moda de invierno 2020",
                    orden: 1,
                    idProducto: 1,
                    img: "productosTemporada.png"
                },
                {
                    idPromocion: 2 + new Date().getDate(),
                    nombrePromocion: "PRIMAVERA 2020",
                    descripcion: "Moda de primavera 2020",
                    orden: 2,
                    idProducto: 2,
                    img: "productosTemporada1.png"
                }

            ];
        }

        function seleccionarPromociones(row) {
            promocionCtrl.promocionesSeleccionado = row;
            promocionCtrl.promocionesEditable = angular.copy(promocionCtrl.promocionesSeleccionado);
        }

        function agregarPromociones() {
            promocionCtrl.promociones.push({
                idPromocion: new Date().getSeconds(),
                nombrePromocion: promocionCtrl.nuevaPromocion.nombrePromocion,
                descripcion: promocionCtrl.nuevaPromocion.descripcion,
                orden: promocionCtrl.nuevaPromocion.orden,
                idProducto: promocionCtrl.tipoUsuario.idProducto,
                indVigente: (promocionCtrl.tipoUsuario.idVigente?promocionCtrl.tipoUsuario.idVigente:'N'),
                img: promocionCtrl.nuevaPromocion.imagen
            });
        }

        function editarPromociones() {
            var findIndesz = _.findIndex(promocionCtrl.promociones, function (user) {
                return promocionCtrl.promocionesSeleccionado.idPromocion == user.idPromocion;
            });

            if(findIndesz > -1) {
                angular.copy(promocionCtrl.promocionesEditable, promocionCtrl.promociones[findIndesz] );
                promocionCtrl.promocionesSeleccionado = null;
            }
        }

        function noHaCambiado() {
            return !angular.equals(promocionCtrl.promocionesSeleccionado, promocionCtrl.promocionesEditable)
        }

        function eliminarPromociones() {
            var findIndesz = _.findIndex(promocionCtrl.promociones, function (user) {
                return promocionCtrl.promocionesSeleccionado.idPromocion == user.idPromocion;
            });

            if(findIndesz > -1){
                promocionCtrl.promociones.splice(findIndesz, 1);
            }
        }

    }
})();
