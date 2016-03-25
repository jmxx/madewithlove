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

Config.$inject = ['$routeProvider'];
function Config($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: '/modules/auth/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    })
    .when('/logout', {
      template: '',
      controller: 'LogoutController',
      controllerAs: 'logout'
    });
}
