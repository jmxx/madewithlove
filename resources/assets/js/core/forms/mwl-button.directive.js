'use strict';

require('../')
  .module
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
