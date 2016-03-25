'use strict';

var Welcome = require('./');

require('angular')
  .module(Welcome.name, [
    require('./index.html')
  ])
  .config(Config);

Config.$inject = ['$routeProvider'];
function Config($routeProvider) {
  $routeProvider
    .when('/welcome', {
      templateUrl: '/modules/welcome/index.html',
      controller: 'WelcomeController',
      controllerAs: 'vm'
    });
}
