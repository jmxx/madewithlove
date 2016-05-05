'use strict';

var Auth = require('./');

require('angular')
  .module(Auth.name)
  .controller('LoginController', LoginController);

LoginController.$inject = ['AuthService', '$http', '$timeout', '$scope'];

function LoginController(AuthService, $http, $timeout, $scope) {
  var vm = this;

  vm.title = 'Hola mundo!!';
  vm.username = '';
  vm.password = '';
  vm.loadingButton = false;
  vm.errors = false;

  vm.submit = submit;

  redirectIfUserIsLoggedIn();

  $scope.$on('auth:loginConfirmed', function (event, user) {
    // alert('asdadsad');
  });

  function submit() {
    vm.loadingButton = true;
    vm.errors = false;

    AuthService
      .login({username: vm.username, password: vm.password})
      .then(function (user) {
        if (user) {
          AuthService.redirectToHome();
        }
      }, function (data) {
        vm.errors = data;
      }).finally(function () {
        vm.loadingButton = false;
      });
  }

  function redirectIfUserIsLoggedIn() {
    if (AuthService.isAuthenticated()) {
      AuthService.redirectToHome();
    }
  }
}
