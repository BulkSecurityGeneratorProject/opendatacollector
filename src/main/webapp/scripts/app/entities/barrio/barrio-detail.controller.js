'use strict';

angular.module('openDataCollectorApp')
    .controller('BarrioDetailController', function ($scope, $rootScope, $stateParams, entity, Barrio, MigracionBarrio) {
        $scope.barrio = entity;
        $scope.load = function (id) {
            Barrio.get({id: id}, function(result) {
                $scope.barrio = result;
            });
        };
        var unsubscribe = $rootScope.$on('openDataCollectorApp:barrioUpdate', function(event, result) {
            $scope.barrio = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
