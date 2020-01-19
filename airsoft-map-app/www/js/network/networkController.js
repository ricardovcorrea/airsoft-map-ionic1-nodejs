'use strict';

angular.module('airsoft-map.controllers')

.controller('NetworkController', function($scope, $state, $ionicModal, NetworkService) {
    $scope.viewModel =
    {
        ipTocheck:"192.168.0.5",
        isLoading : false,
        failedToConnect : false
    }

    $scope.checkConnection = function()
    {
        $scope.viewModel.isLoading = true;
        $scope.viewModel.failedToConnect = false;
        NetworkService.checkConnection($scope.viewModel.ipTocheck).then(function()
        {
            $state.go('gamesList');
    })
    .catch(function(){  
        $scope.viewModel.failedToConnect = true;
    })
    .finally(function(){
        $scope.viewModel.isLoading = false;
    })
    }
});