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



        /*$scope.options1 = {
            chart: {
                type: 'pieChart',
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showLabels: true,
                height: 500,
                duration: 500

            }
        };*/


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

        //Regular pie chart example
        nv.addGraph(function() {
            var chart = nv.models.pieChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .showLabels(true)
                .labelType("value");

            d3.select("#chart1 svg")
                .datum(exampleData1())
                .transition().duration(350)
                .call(chart);

            return chart;
        });
        function exampleData1() {
            return data1;
        }
        function exampleData() {
            return  [
                {
                    "label": "One",
                    "value" : 29.765957771107
                } ,
                {
                    "label": "Two",
                    "value" : 0
                } ,
                {
                    "label": "Three",
                    "value" : 32.807804682612
                } ,
                {
                    "label": "Four",
                    "value" : 196.45946739256
                } ,
                {
                    "label": "Five",
                    "value" : 0.19434030906893
                } ,
                {
                    "label": "Six",
                    "value" : 98.079782601442
                } ,
                {
                    "label": "Seven",
                    "value" : 13.925743130903
                } ,
                {
                    "label": "Eight",
                    "value" : 5.1387322875705
                }
            ];
        }



        $scope.dataEjemplo = exampleData();
        $scope.dataMia = exampleData1();
        $scope.dataMiaData1 = data1;

        var h = 600;
        var r = h/2;
        var arc = d3.svg.arc().outerRadius(r);


        var colors = [
            'rgb(178, 55, 56)',
            'rgb(213, 69, 70)',
            'rgb(230, 125, 126)',
            'rgb(239, 183, 182)'
        ]


        nv.addGraph(function() {
            var chart = nv.models.pieChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                //.color(colors)
                .showLabels(false)
                .labelType("percent")
                //.donut(true).donutRatio(0) /* Trick to make the labels go inside the chart*/
                ;

            d3.select("#chart svg")
                .datum(exampleData1)
                .transition().duration(1200)
                .call(chart)
            ;

            d3.selectAll(".nv-label text")
                /* Alter SVG attribute (not CSS attributes) */
                .attr("transform", function(d){
                    d.innerRadius = -450;
                    d.outerRadius = r;
                    return "translate(" + arc.centroid(d) + ")";}
                )
                .attr("text-anchor", "middle")
                /* Alter CSS attributes */
                .style({"font-size": "1em"})
            ;

            /* Replace bullets with blocks */
            d3.selectAll('.nv-series').each(function(d,i) {
                var group = d3.select(this),
                    circle = group.select('circle');
                var color = circle.style('fill');
                circle.remove();
                var symbol = group.append('path')
                    .attr('d', d3.svg.symbol().type('square'))
                    .style('stroke', color)
                    .style('fill', color)
                    // ADJUST SIZE AND POSITION
                    .attr('transform', 'scale(1.5) translate(-2,0)')
            });


            return chart;
        });




        console.log($scope.migraciones2);

    });
