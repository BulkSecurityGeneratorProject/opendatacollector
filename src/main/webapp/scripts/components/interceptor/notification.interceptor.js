 'use strict';

angular.module('openDataCollectorApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-openDataCollectorApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-openDataCollectorApp-params')});
                }
                return response;
            }
        };
    });
