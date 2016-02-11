'use strict';

angular.module('openDataCollectorApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('migracionBarrio', {
                parent: 'entity',
                url: '/migracionBarrios',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'MigracionBarrios'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/migracionBarrio/migracionBarrios.html',
                        controller: 'MigracionBarrioController'
                    }
                },
                resolve: {
                }
            })
            .state('migracionBarrio.detail', {
                parent: 'entity',
                url: '/migracionBarrio/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'MigracionBarrio'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/migracionBarrio/migracionBarrio-detail.html',
                        controller: 'MigracionBarrioDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'MigracionBarrio', function($stateParams, MigracionBarrio) {
                        return MigracionBarrio.get({id : $stateParams.id});
                    }]
                }
            })
            .state('migracionBarrio.new', {
                parent: 'migracionBarrio',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/migracionBarrio/migracionBarrio-dialog.html',
                        controller: 'MigracionBarrioDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    numeroPersonas: null,
                                    anyo: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('migracionBarrio', null, { reload: true });
                    }, function() {
                        $state.go('migracionBarrio');
                    })
                }]
            })
            .state('migracionBarrio.edit', {
                parent: 'migracionBarrio',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/migracionBarrio/migracionBarrio-dialog.html',
                        controller: 'MigracionBarrioDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['MigracionBarrio', function(MigracionBarrio) {
                                return MigracionBarrio.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('migracionBarrio', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('migracionBarrio.delete', {
                parent: 'migracionBarrio',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/migracionBarrio/migracionBarrio-delete-dialog.html',
                        controller: 'MigracionBarrioDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['MigracionBarrio', function(MigracionBarrio) {
                                return MigracionBarrio.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('migracionBarrio', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
