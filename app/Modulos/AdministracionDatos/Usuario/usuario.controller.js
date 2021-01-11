(function () {
    'use strict';

    angular
        .module('eCommers')
        .controller('Usuario', Usuario);

    Usuario.$inject = [ '$log', 'tblsServicios', '$filter' ];

    function Usuario( $log, tblsServicios, $filter ) {

        /* jshint validthis: true */
        var usuarioCtrl = this;

        usuarioCtrl.cbxTipoUsuario = {
            placeholder: "Seleccione",
            dataTextField: "tipo",
            dataValueField: "idTipo"
        };

        usuarioCtrl.cbxPais = {
            placeholder: "Seleccione",
            dataTextField: "pais",
            dataValueField: "idPais"
        };

        usuarioCtrl.cbxEstado = {
            placeholder: "Seleccione",
            dataTextField: "estado",
            dataValueField: "idEstado"
        };

        usuarioCtrl.cbxMunicipio = {
            placeholder: "Seleccione",
            dataTextField: "pais",
            dataValueField: "idMunicipio"
        };

        usuarioCtrl.cbxCiudad = {
            placeholder: "Seleccione",
            dataTextField: "ciudad",
            dataValueField: "idCiudad"
        };

        usuarioCtrl.tiposdeUsuario = [
            {tipo: "Administrador de Sistema", idTipo: "A"},
            {tipo: "Comprador", idTipo: "C"}
        ];

        /** Obtener configuracion de Tabla **/
        usuarioCtrl.tblUsuarios = tblsServicios.getTabla('tblsGenerales', 'tblUsuarios');

        usuarioCtrl.seleccionarUsuario = seleccionarUsuario;
        usuarioCtrl.agregarUsuario = agregarUsuario;
        usuarioCtrl.editarUsuario = editarUsuario;
        usuarioCtrl.noHaCambiado = noHaCambiado;
        usuarioCtrl.eliminarUsuario = eliminarUsuario;


        usuarioCtrl.usuarios = [
            {
                idUsuario: 1 + new Date().getSeconds(),
                nombreUsuario: "JUAN CARLOS NUTE HERNANDEZ",
                tipoUsuario: "A",
                descTipoUsuario: "Administrador de Sistema",
                contrasenia: "GORDO",
                email: "juanqarlosnh10h@hotmail.com",
                fechaRegistro: "08/01/2021",
                calle: "Tepic",
                noExterior: "99",
                noInterior: null,
                codigoPostal: "51370",
                colonia: "SAN JUAN DE LAS HUERTAS",
                municipio: "Zinacantepec",
                idMunicipio: 1,
                ciudad: "Toluca",
                idCiudad: 1,
                estado: "Mexico",
                idEstado: 1,
                pais: "Mexico",
                idPais: 1,
                referencias: "Puerta Negra con Rojo"
            },
            {
                idUsuario: 2 + new Date().getSeconds(),
                nombreUsuario: "JUAN CARLOS NUTE CORDOVA",
                tipoUsuario: "A",
                descTipoUsuario: "Administrador de Sistema",
                contrasenia: "GORDO1",
                email: "carlitosnute@hotmail.com",
                fechaRegistro: "09/01/2021",
                calle: "Tepic",
                noExterior: "123",
                noInterior: 1,
                codigoPostal: "51370",
                colonia: "SAN JUAN DE LAS HUERTAS",
                municipio: "Zinacantepec",
                idMunicipio: 1,
                ciudad: "Toluca",
                idCiudad: 1,
                estado: "Mexico",
                idEstado: 1,
                pais: "Mexico",
                idPais: 1,
                referencias: null
            }
        ];

        usuarioCtrl.nuevoUsr = {};


        function seleccionarUsuario(row) {
            usuarioCtrl.usuarioSeleccionado = row;
            usuarioCtrl.usuarioEditable = angular.copy(usuarioCtrl.usuarioSeleccionado);
        }

        function agregarUsuario() {
            usuarioCtrl.usuarios.push({
                idUsuario: new Date().getSeconds(),
                nombreUsuario: usuarioCtrl.nuevoUsr.nombre,
                tipoUsuario: usuarioCtrl.nuevoUsr.tipoUsuario,
                contrasenia: usuarioCtrl.nuevoUsr.clave,
                descTipoUsuario: usuarioCtrl.tipoUsuario.tipo,
                email: usuarioCtrl.nuevoUsr.eMail,
                fechaRegistro: $filter('fecha')(new Date()),
                calle: usuarioCtrl.nuevoUsr.calle,
                noExterior: usuarioCtrl.nuevoUsr.noExterior,
                noInterior: usuarioCtrl.nuevoUsr.noInterior,
                codigoPostal: usuarioCtrl.nuevoUsr.codigoPostal,
                colonia: usuarioCtrl.nuevoUsr.colonia,
                municipio: usuarioCtrl.nuevoUsr.idMunicipio,
                idMunicipio: usuarioCtrl.nuevoUsr.idMunicipio,
                ciudad: usuarioCtrl.nuevoUsr.idCiudad,
                idCiudad: usuarioCtrl.nuevoUsr.idCiudad,
                estado: usuarioCtrl.nuevoUsr.idEstado,
                idEstado: usuarioCtrl.nuevoUsr.idEstado,
                pais: usuarioCtrl.nuevoUsr.idPais,
                idPais: usuarioCtrl.nuevoUsr.idPais,
                referencias: usuarioCtrl.nuevoUsr.referencias
            });
        }

        function editarUsuario() {
            var findIndesz = _.findIndex(usuarioCtrl.usuarios, function (user) {
                return usuarioCtrl.usuarioSeleccionado.idUsuario == user.idUsuario;
            });

            if(findIndesz > -1) {
                angular.copy(usuarioCtrl.usuarioEditable, usuarioCtrl.usuarios[findIndesz] );
                usuarioCtrl.usuarioSeleccionado = null;
            }
        }
        
        function noHaCambiado() {
            return !angular.equals(usuarioCtrl.usuarioSeleccionado, usuarioCtrl.usuarioEditable)
        }

        function eliminarUsuario() {
            var findIndesz = _.findIndex(usuarioCtrl.usuarios, function (user) {
                return usuarioCtrl.usuarioSeleccionado.idUsuario == user.idUsuario;
            });

            if(findIndesz > -1){
                usuarioCtrl.usuarios.splice(findIndesz, 1);
            }
        }

    }
})();
