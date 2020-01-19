angular.module('airsoft-map')

.constant('ENDPOINTS',
    {
        basePort: 9000,
        timeout: 1000,
        test:"testConnection",
        games: {
            getAllGames: "games",
            getAllPlayersFromGame:"games/teams"
        }
    });