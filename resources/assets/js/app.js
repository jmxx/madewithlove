'use strict';

var angular = require('angular')

;

var Directives = require('./core/')
  , Auth = require('./modules/auth/')
  , Welcome = require('./modules/welcome/')
  , Home = require('./modules/home/');

angular
  .module('MwlApp', [
    require('angular-ui-router'),
    require('angular-messages'),
    require('angular-animate'),
    require('angular-material'),
    Directives.name,
    Auth.name,
    Welcome.name,
    Home.name,
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

Config.$inject = ['$stateProvider', '$urlRouterProvider'];
function Config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      views: {
        master: {
          templateUrl: '/modules/welcome/index.html',
          controller: 'WelcomeController',
          controllerAs: 'vm'
        }
      }
    });
}
