'use strict';

var Auth = require('./');

require('angular')
  .module(Auth.name)
  .factory('AuthService', AuthService);

AuthService.$inject = ['$http', '$location', '$rootScope', '$q'];
function AuthService($http, $location, $rootScope, $q) {
  var user = null
    , auth = {};

  auth.loginSuccess = function () {
    $rootScope.$broadcast('auth:loginConfirmed', user);
  };

  auth.unauthenticatedUser = function () {
    $rootScope.$broadcast('auth:unauthenticatedUser', user);
  };

  auth.redirectToLogin = function () {
    console.log('redirecting');
    $location.path('/login');
  };

  auth.redirectToHome = function () {
    $location.path('/');
  };

  auth.isAuthenticated = function () {
    return !!user;
  };

  auth.login = function (credentials) {
    return $http.post('/login', credentials).then(function (response) {
      return response.data.status === 'success' ?
          auth.getUser()
        : false;
    }, function () {
      return false;
    });
  };

  auth.logout = function () {
    return $http.get('/logout').then(function (response) {
      if (response.data.status === 'success') {
        user = null;
        auth.unauthenticatedUser();
        auth.redirectToLogin();
      }
    }, function () {
      return false;
    });
  };

  auth.check = function () {
    console.log('check');
    return $http.get('/me').then(function (response) {
      if (response.data.status) {
        user = response.data.user;
        auth.loginSuccess();
        console.log('user');
        return user;
      }

      return false;
    }, function (response) {
      console.log(response);
    });
  };

  auth.getUser = function () {
    if (user) {
      return $q.when(user);
    }
    console.log('not user');

    return auth.check();
  };

  return auth;
}
