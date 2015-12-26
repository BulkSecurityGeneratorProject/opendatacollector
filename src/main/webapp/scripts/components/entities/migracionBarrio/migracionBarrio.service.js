'use strict';

angular.module('openDataCollectorApp')
    .factory('MigracionBarrio', function ($resource, DateUtils) {
        return $resource('api/migracionBarrios/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.anyo = DateUtils.convertLocaleDateFromServer(data.anyo);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.anyo = DateUtils.convertLocaleDateToServer(data.anyo);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.anyo = DateUtils.convertLocaleDateToServer(data.anyo);
                    return angular.toJson(data);
                }
            }
        });
    });
