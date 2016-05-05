'use strict';

var Home = require('./');

require('angular')
  .module(Home.name, [
    require('./index.html')
  ])
  .config(Config);

Config.$inject = ['$stateProvider', '$urlRouterProvider'];
function Config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      views: {
        master: {
          templateUrl: '/modules/home/index.html',
          controller: 'HomeController',
          controllerAs: 'vm'
        }
      }
    });
}
