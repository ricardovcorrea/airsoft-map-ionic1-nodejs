'use strict';

angular.module('airsoft-map.services')

    .service('GamesService', function ($http, $q, ENDPOINTS, NetworkService) {
        var gameToEnter = {};

        this.getAllGames = function () {
            return $http
                .get(NetworkService.getBaseAddress() + ENDPOINTS.games.getAllGames, { timeout: ENDPOINTS.timeout } )
                .then(function (response) {
                    return response.data;
                });
        }

        this.getAllTeamsFromGame = function () {
            return $http
                .post(NetworkService.getBaseAddress() + ENDPOINTS.games.getAllPlayersFromGame, { _id: gameToEnter._id })
                .then(function (response) {
                    return response.data;
                });
        }

        this.setGameToEnter = function (game) {
           gameToEnter = game;
        }

        this.getGameToEnter = function () {
           return gameToEnter;
        }

    });