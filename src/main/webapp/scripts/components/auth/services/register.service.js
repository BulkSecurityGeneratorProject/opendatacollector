'use strict';

angular.module('openDataCollectorApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


