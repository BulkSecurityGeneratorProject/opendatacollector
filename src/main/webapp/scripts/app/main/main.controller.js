'use strict';

angular.module('openDataCollectorApp')
    .controller('MainController', function ($scope, Chart, Principal) {

        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        })




    });
