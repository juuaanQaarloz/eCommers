/**
/**
 * Created by Rice on 15-02-05.
 * @description Filtros del sistema en general.
 */
(function () {
    angular
        .module('xsModulo')
        .filter('offset', offset);

    offset.$inject = [];
    function offset() {
        return function (input, inicio) {
            inicio = parseInt(inicio, 10);
            return input.slice(inicio);
        };
    }
})();
