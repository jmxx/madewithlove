'use strict';

require('../')
  .module
  .directive('mwlUiInit', MwlUIInit);

function MwlUIInit () {
  function link(scope, element, attrs) {
    element.addClass('mwl-ui-untouched');
    
    setTimeout(function () {
      element.removeClass('mwl-ui-untouched');
    }, 1000);
  }

  return {
    restrict: 'A',
    link: link
  };
}
