'use strict';

angular.module('openDataCollectorApp')
    .controller('MigracionBarrioController', function ($scope, $http, $state, MigracionBarrio , ParseLinks) {


        var data1 = [];
        $scope.migraciones2="";
        //$scope.migraciones = MigracionBarrio.migracionesTotales;
       /* $http.get('api/migracionesAgrupadasBarrioDestino').
        success(function(data) {

            $scope.greeting = data;

            for (var i = 0; i < $scope.greeting.length; i++) {
                data1.push({
                    label: $scope.greeting[i][1],
                    value: $scope.greeting[i][0]
                });
            }

        });

        $scope.bpData = [{
            values: data1
        }];*/

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

       /* $scope.data = [
            {
               // key: "Cumulative Return",
                values: [
                    {
                        "label" : "A" ,
                        "value" : -29.765957771107
                    } ,
                    {
                        "label" : "B" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "C" ,
                        "value" : 32.807804682612
                    } ,
                    {
                        "label" : "D" ,
                        "value" : 196.45946739256
                    } ,
                    {
                        "label" : "E" ,
                        "value" : 0.19434030906893
                    } ,
                    {
                        "label" : "F" ,
                        "value" : -98.079782601442
                    } ,
                    {
                        "label" : "G" ,
                        "value" : -13.925743130903
                    } ,
                    {
                        "label" : "H" ,
                        "value" : -5.1387322875705
                    }
                ]
            }
        ];

        console.log($scope.data);
*/

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

            MigracionBarrio.migracionesTotales(function(result){

                $scope.migraciones2 = result;

                for (var i = 0; i < $scope.migraciones2.length; i++) {
                    data1.push({
                        label: $scope.migraciones2[i][1],
                        value: $scope.migraciones2[i][0]
                    });}
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


        //cojo los valores y lo pongo en la variable para pintar en la grafica los datos
        $scope.bpData = [{
            values: data1
        }];

        console.log($scope.migraciones2);

    });
