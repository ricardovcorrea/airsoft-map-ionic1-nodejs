'use strict';

angular.module('airsoft-map.controllers')

.controller('GamesController', function($scope, $ionicModal, $state, GamesService) {
    $scope.viewModel =
    {
        isLoading : false,
        gamesList : []
    }

    $scope.goToSelectIp = function()
    {
        $state.go('selectIp');
    }

    $scope.enterGame = function(game)
    {
        GamesService.setGameToEnter(game);
        $state.go('enterGame');
        
    }
    GamesService.getAllGames().then(function(foundGames){
        $scope.viewModel.gamesList = foundGames;
    }).finally(function(){
        $scope.viewModel.isLoading = false;
    });
    
});