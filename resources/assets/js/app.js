'use strict';

var angular = require('angular')

;

var Directives = require('./core/forms/mwl-button.directive')
  , Auth = require('./modules/auth/')
  , Welcome = require('./modules/welcome/');

angular
  .module('MwlApp', [
    require('angular-animate'),
    require('angular-material'),
    require('angular-route'),
    'MwlDirectives',
    Auth.name,
    Welcome.name,
  ])
  .run(FirstRun)
  .config(Config);

FirstRun.$inject = ['AuthService'];
function FirstRun(AuthService) {
  AuthService.check().then(function (user) {
    AuthService.getUser().then(function (user) {
      console.log('getting user', user);
    });

    if (!user) {
      AuthService.redirectToLogin();
      console.log(user);
      return false;
    }

    AuthService.redirectToHome();
  });
}


Config.$inject = ['$routeProvider'];

function Config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : '/modules/welcome/index.html',
      controller: 'WelcomeController',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });
}
