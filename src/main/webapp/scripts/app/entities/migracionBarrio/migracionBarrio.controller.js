'use strict';

angular.module('openDataCollectorApp')
    .controller('MigracionBarrioController', function ($scope, $http, $state, MigracionBarrio , ParseLinks) {


        var data1 = [];
        $scope.migraciones2="";
        MigracionBarrio.migracionesTotales(function(result){
            $scope.migraciones2 = result;

            for (var i = 0; i < $scope.migraciones2.length; i++) {
                data1.push({
                    label: $scope.migraciones2[i][1],
                    value: $scope.migraciones2[i][0]
                });}
        });
        //cojo los valores y lo pongo en la variable para pintar en la grafica los datos
        $scope.dataMiaData1 = data1;

        $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                duration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10
                }
            }
        };

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



        $scope.options22 = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showLabels: false,
                donut: true,
                showLegend: false,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };






    });
