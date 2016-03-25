'use strict';

var Welcome = require('./');

require('angular')
  .module(Welcome.name)
  .controller('WelcomeController', WelcomeController);

WelcomeController.$inject = [];

function WelcomeController() {
  this.title = 'Hola mundo!!';
}
