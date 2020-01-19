'use strict';

angular.module('airsoft-map.services')

    .service('NetworkService', function ($http, ENDPOINTS) {
        var baseAddress = "";

        this.checkConnection = function (ip) {
            var baseUrl = "http://"+ip+":"+ ENDPOINTS.basePort + "/";
            return $http
                .get(baseUrl + ENDPOINTS.test, { timeout: ENDPOINTS.timeout } )
                .then(function () {
                    baseAddress = baseUrl;
                });
        }

        this.getBaseAddress = function () {
            return baseAddress;
        }

    });