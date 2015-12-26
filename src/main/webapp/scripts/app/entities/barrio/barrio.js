'use strict';

angular.module('openDataCollectorApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('barrio', {
                parent: 'entity',
                url: '/barrios',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Barrios'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/barrio/barrios.html',
                        controller: 'BarrioController'
                    }
                },
                resolve: {
                }
            })
            .state('barrio.detail', {
                parent: 'entity',
                url: '/barrio/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Barrio'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/barrio/barrio-detail.html',
                        controller: 'BarrioDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Barrio', function($stateParams, Barrio) {
                        return Barrio.get({id : $stateParams.id});
                    }]
                }
            })
            .state('barrio.new', {
                parent: 'barrio',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/barrio/barrio-dialog.html',
                        controller: 'BarrioDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    nombre: null,
                                    nombreCsvOrigen: null,
                                    nombreCsvDestino: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('barrio', null, { reload: true });
                    }, function() {
                        $state.go('barrio');
                    })
                }]
            })
            .state('barrio.edit', {
                parent: 'barrio',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/barrio/barrio-dialog.html',
                        controller: 'BarrioDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Barrio', function(Barrio) {
                                return Barrio.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('barrio', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('barrio.delete', {
                parent: 'barrio',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/barrio/barrio-delete-dialog.html',
                        controller: 'BarrioDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Barrio', function(Barrio) {
                                return Barrio.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('barrio', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
