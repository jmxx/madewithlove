'use strict';

var angular = require('angular');

angular
  .module('MwlDirectives', [
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
