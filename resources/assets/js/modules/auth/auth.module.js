'use strict';

var Auth = require('./');

require('angular')
  .module(Auth.name, [
    require('./login.html')
  ])
  .config(Config)
  .run(function () {
    console.log('Auth');
  });

Config.$inject = ['$stateProvider', '$urlRouterProvider'];
function Config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      views: {
        master: {
          templateUrl: '/modules/auth/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        }
      }
    })
    .state('logout', {
      url: '/logout',
      views: {
        master: {
          template: '',
          controller: 'LogoutController',
          controllerAs: 'logout'
        }
      }
    });
}
