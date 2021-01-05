/**
 * Created by Solinte on 27/04/2017.
 */


angular
    .module('xpertysModulo')
    .directive('easpaybFileAgregarModel',easpaybFileAgregarModel);

easpaybFileAgregarModel.$inject = [];

/* @ngInject */
function easpaybFileAgregarModel() {
    return {
        require:'ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.bind('change', function(){
                scope.$apply(function(){
                    ngModel.$setViewValue(element[0].files[0]);
                    ngModel.$render();
                });
            });
        }
    }
}