'use strict';

const controller = function() {
  const ctrl = this;
};

module.exports = {
  templateUrl: './modules/statisticBox/statisticBox.html',
  controller,
  controllerAs: 'ctrl',
  bindings: {
    data: '<',
    name: '@',
    prefix: '@'
  }
};
