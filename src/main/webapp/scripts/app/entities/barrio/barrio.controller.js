'use strict';

angular.module('openDataCollectorApp')
    .controller('BarrioController', function ($scope, $state, Barrio, ParseLinks) {

        $scope.barrios = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            Barrio.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.barrios = result;
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
            $scope.barrio = {
                nombre: null,
                nombreCsvOrigen: null,
                nombreCsvDestino: null,
                id: null
            };
        };
    });
