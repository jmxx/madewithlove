'use strict';

var Auth = require('./');

require('angular')
  .module(Auth.name)
  .controller('HomeController', HomeController);

HomeController.$inject = [];

function HomeController() {

}
