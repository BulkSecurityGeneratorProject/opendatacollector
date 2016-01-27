'use strict';

angular.module('openDataCollectorApp')
    .factory('MigracionBarrio', function ($resource, DateUtils) {
        return $resource('api/migracionBarrios/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
           /* 'migracionesAgrupadasBarrioDestino': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },*/
            'update': { method:'PUT' }
        });
    });
