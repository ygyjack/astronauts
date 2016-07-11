'use strict';

var myApp = angular.module('myApp.services', [ ]);


// Define the Astronaut services on the myApp module
myApp.factory('Astronaut', function ($http) {
    return {
        get: function () {
            return $http.get('users.json');
        }
    };
});

