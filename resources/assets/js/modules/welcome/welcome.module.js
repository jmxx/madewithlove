'use strict';

var Welcome = require('./');

require('angular')
  .module(Welcome.name, [
    require('./index.html')
  ])
  .config(Config);

Config.$inject = ['$stateProvider', '$urlRouterProvider'];
function Config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('welcome', {
      url: '/welcome',
      templateUrl: '/modules/welcome/index.html',
      controller: 'WelcomeController',
      controllerAs: 'vm'
    });
}
