'use strict';

angular.module('openDataCollectorApp')
    .controller('DataSetController', function ($scope, $state, DataSet, ParseLinks) {

        $scope.dataSets = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            DataSet.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.dataSets = result;
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
            $scope.dataSet = {
                nombre: null,
                descripcion: null,
                fecha: null,
                enlaceDescarga: null,
                id: null
            };
        };
    });
