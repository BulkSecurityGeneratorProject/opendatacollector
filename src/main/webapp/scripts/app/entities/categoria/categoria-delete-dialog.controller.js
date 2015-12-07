'use strict';

angular.module('openDataCollectorApp')
	.controller('CategoriaDeleteController', function($scope, $uibModalInstance, entity, Categoria) {

        $scope.categoria = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Categoria.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
