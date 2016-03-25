'use strict';

var Auth = require('./');

require('angular')
  .module(Auth.name)
  .controller('LogoutController', LogoutController);

LogoutController.$inject = ['AuthService', '$scope'];

function LogoutController(AuthService, $scope) {
  AuthService.logout();
}
