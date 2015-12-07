'use strict';

angular.module('openDataCollectorApp')
    .controller('CiudadDetailController', function ($scope, $rootScope, $stateParams, entity, Ciudad, Categoria, DataSet) {
        $scope.ciudad = entity;
        $scope.load = function (id) {
            Ciudad.get({id: id}, function(result) {
                $scope.ciudad = result;
            });
        };
        var unsubscribe = $rootScope.$on('openDataCollectorApp:ciudadUpdate', function(event, result) {
            $scope.ciudad = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
