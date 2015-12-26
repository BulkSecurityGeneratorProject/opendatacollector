'use strict';

angular.module('openDataCollectorApp')
    .controller('MigracionBarrioController', function ($scope, $state, MigracionBarrio, ParseLinks) {

        $scope.migracionBarrios = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            MigracionBarrio.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.migracionBarrios = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.migracionBarrio = {
                numeroPersonas: null,
                anyo: null,
                id: null
            };
        };
    });
