'use strict';

var Directives = require('../');

require('angular')
  .module(Directives.name, [
    require('./mwl-button.html')
  ])
  .directive('mwlButton', MwlButton);

function MwlButton () {
  return {
    replace: true,
    scope: {
      ngClick: '=?',
      loading: '=?'
    },
    templateUrl: '/core/forms/mwl-button.html',
    transclude: true
  };
}
