'use strict';

angular.module('airsoft-map.controllers')

.controller('enterGameController', function($scope, $ionicModal, $state, GamesService) {
    $scope.viewModel =
    {
        isLoading : true,
        gameTeams : [],
        selectedTeamId : 0
    }    

    $scope.goToGames = function()
    {
        $state.go('gamesList');
    }

    GamesService.getAllTeamsFromGame().then(function(foundTeams){
        $scope.viewModel.gameTeams = foundTeams;
    }).finally(function(){
        $scope.viewModel.isLoading = false;
    });

});