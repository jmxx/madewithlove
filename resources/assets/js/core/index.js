'use strict';

var moduleName = 'MwlApp.Directives';

module.exports = {
  name: moduleName,
  module: require('angular')
    .module(moduleName, [
      require('./forms/mwl-button.html')
    ])
};

require('./forms/mwl-button.directive');
require('./ui/animation.directive');
