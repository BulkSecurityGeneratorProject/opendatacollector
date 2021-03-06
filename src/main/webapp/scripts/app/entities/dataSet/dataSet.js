'use strict';

angular.module('openDataCollectorApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('dataSet', {
                parent: 'entity',
                url: '/dataSets',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'DataSets'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/dataSet/dataSets.html',
                        controller: 'DataSetController'
                    }
                },
                resolve: {
                }
            })
            .state('dataSet.detail', {
                parent: 'entity',
                url: '/dataSet/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'DataSet'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/dataSet/dataSet-detail.html',
                        controller: 'DataSetDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'DataSet', function($stateParams, DataSet) {
                        return DataSet.get({id : $stateParams.id});
                    }]
                }
            })
            .state('dataSet.new', {
                parent: 'dataSet',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/dataSet/dataSet-dialog.html',
                        controller: 'DataSetDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    nombre: null,
                                    descripcion: null,
                                    fecha: null,
                                    enlaceDescarga: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('dataSet', null, { reload: true });
                    }, function() {
                        $state.go('dataSet');
                    })
                }]
            })
            .state('dataSet.edit', {
                parent: 'dataSet',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/dataSet/dataSet-dialog.html',
                        controller: 'DataSetDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['DataSet', function(DataSet) {
                                return DataSet.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('dataSet', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('dataSet.delete', {
                parent: 'dataSet',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/dataSet/dataSet-delete-dialog.html',
                        controller: 'DataSetDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['DataSet', function(DataSet) {
                                return DataSet.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('dataSet', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
