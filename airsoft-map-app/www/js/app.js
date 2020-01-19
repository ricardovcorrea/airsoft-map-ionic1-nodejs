var airsoftMapApp = angular.module('airsoft-map', ['ionic', 'ngCordova', 'airsoft-map.controllers','airsoft-map.services']);

airsoftMapApp.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.maxCache(0);

    $stateProvider
      .state('selectIp', {
        url: '/network/selectip',
        templateUrl: 'templates/network/selectIpView.html',
        controller: 'NetworkController'
      })
      .state('gamesList', {
        url: '/games/list',
        templateUrl: 'templates/games/gamesList.html',
        controller: 'GamesController'
      })
      .state('enterGame', {
        url: '/games/enter',
        templateUrl: 'templates/games/enterGame.html',
        controller: 'enterGameController'
      })

    $urlRouterProvider.otherwise('/network/selectip');

  });


  // .constant('ENDPOINTS', {
  //   BASE_API: "http://192.168.44.160:3000/",
  //   teams: {
  //     getAllPlayingTeams: "teams",
  //     getAllPlayers: "players",
  //   }
  // })
  // .controller('mainPageController', function ($scope, $ionicModal, $interval, teamsService) {
  //   $scope.viewFlags =
  //     {
  //       map: {},
  //       mapOptions: {
  //         center: new google.maps.LatLng(-22.899864957184825, -43.561150431632996),
  //         zoom: 18,
  //         mapTypeId: google.maps.MapTypeId.SATELLITE,
  //         disableDefaultUI: true
  //       },
  //       roleIcons:
  //       {
  //         assault: "img/classIcons/assault.png",
  //         sniper: "img/classIcons/sniper.png",
  //         medic: "img/classIcons/medic.png",
  //         dead: "img/classIcons/dead.png"
  //       },
  //       showOptionsMenu: false
  //     }

  //   $scope.viewData =
  //     {
  //       teams: [],
  //       players: [],
  //       markers:{},
  //       myTeam: "bravo"
  //     }

  //   $scope.getRoleIcon = function (player) {
  //     if (!player.isAlive) {
  //       return $scope.viewFlags.roleIcons.dead;
  //     }
  //     return $scope.viewFlags.roleIcons[player.role];
  //   }

  //   $scope.getPlayerPosition = function (player) {
  //     return new google.maps.LatLng(player.position.latitude, player.position.longitude);
  //   }

  //   $scope.init = function () {

  //     $scope.viewFlags.map = new google.maps.Map(document.getElementById("map"), $scope.viewFlags.mapOptions);

  //     google.maps.event.addListener($scope.viewFlags.map, 'click', function (event) {
  //       console.log("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
  //       $scope.$apply(function () {
  //         $scope.showHideOptionsMenu();
  //       });
  //     });

  //     makeGrid($scope.viewFlags.map);

  //     $scope.refreshMap();

  //     $interval(function () {
  //       $scope.refreshMap();
  //     }, 3000);
  //   }

  //   $scope.showHideOptionsMenu = function () {
  //     $scope.viewFlags.showOptionsMenu = !$scope.viewFlags.showOptionsMenu;
  //   }

  //   $scope.refreshMap = function () {
  //     teamsService.getAllPlayers().then(function (responsePlayers) {
  //       $scope.viewData.players = responsePlayers;
  //       angular.forEach($scope.viewData.players, function (player) {
  //         if (player.team === $scope.viewData.myTeam || $scope.viewData.myTeam === "all") {
  //           if (!$scope.viewData.markers[player.id]) {
  //             $scope.viewData.markers[player.id] = new google.maps.Marker({
  //               position: $scope.getPlayerPosition(player),
  //               map: $scope.viewFlags.map,
  //               icon: $scope.getRoleIcon(player)
  //             });
  //           }
  //           else {

  //             $scope.viewData.markers[player.id].setPosition($scope.getPlayerPosition(player));
  //             $scope.viewData.markers[player.id].setIcon($scope.getRoleIcon(player));
  //           }
  //         }
  //         else if ($scope.viewData.markers[player.id]) {
  //           $scope.viewData.markers[player.id].setMap(null);
  //         }
  //       });
  //     });
  //   }

  //   $scope.init();

  // })
  // .service('teamsService', function ($http, $filter, ENDPOINTS) {

  //   this.getAllPlayingTeams = function () {
  //     return $http
  //       .get(ENDPOINTS.BASE_API + ENDPOINTS.teams.getAllPlayingTeams)
  //       .then(function (response) {
  //         return response.data;
  //       });
  //   };

  //   this.getAllPlayers = function () {
  //     return $http
  //       .get(ENDPOINTS.BASE_API + ENDPOINTS.teams.getAllPlayers)
  //       .then(function (response) {
  //         return response.data;
  //       });
  //   };

  // });
