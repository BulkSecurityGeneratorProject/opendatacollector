'use strict';

angular.module('openDataCollectorApp')
    .controller('MigracionBarrioDetailController', function ($scope, $rootScope, $stateParams, entity, MigracionBarrio, Barrio) {
        $scope.migracionBarrio = entity;
        $scope.load = function (id) {
            MigracionBarrio.get({id: id}, function(result) {
                $scope.migracionBarrio = result;
            });
        };
        var unsubscribe = $rootScope.$on('openDataCollectorApp:migracionBarrioUpdate', function(event, result) {
            $scope.migracionBarrio = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
