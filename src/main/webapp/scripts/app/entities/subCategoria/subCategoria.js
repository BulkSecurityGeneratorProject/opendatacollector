'use strict';

angular.module('openDataCollectorApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('subCategoria', {
                parent: 'entity',
                url: '/subCategorias',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'SubCategorias'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/subCategoria/subCategorias.html',
                        controller: 'SubCategoriaController'
                    }
                },
                resolve: {
                }
            })
            .state('subCategoria.detail', {
                parent: 'entity',
                url: '/subCategoria/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'SubCategoria'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/subCategoria/subCategoria-detail.html',
                        controller: 'SubCategoriaDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'SubCategoria', function($stateParams, SubCategoria) {
                        return SubCategoria.get({id : $stateParams.id});
                    }]
                }
            })
            .state('subCategoria.new', {
                parent: 'subCategoria',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/subCategoria/subCategoria-dialog.html',
                        controller: 'SubCategoriaDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    nombre: null,
                                    descripcion: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('subCategoria', null, { reload: true });
                    }, function() {
                        $state.go('subCategoria');
                    })
                }]
            })
            .state('subCategoria.edit', {
                parent: 'subCategoria',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/subCategoria/subCategoria-dialog.html',
                        controller: 'SubCategoriaDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['SubCategoria', function(SubCategoria) {
                                return SubCategoria.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('subCategoria', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('subCategoria.delete', {
                parent: 'subCategoria',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/subCategoria/subCategoria-delete-dialog.html',
                        controller: 'SubCategoriaDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['SubCategoria', function(SubCategoria) {
                                return SubCategoria.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('subCategoria', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
