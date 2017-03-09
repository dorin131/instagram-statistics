'use strict';

const controller = function(authenticationService, $location) {
  const ctrl = this;
  ctrl.errorMsg = '';
  if ($location.search().error) {
    ctrl.errorMsg = 'Sign in failed, please try again';
  }
  ctrl.signIn = () => authenticationService.logIn();
};

module.exports = {
  templateUrl: './modules/login/login.html',
  controller,
  controllerAs: 'ctrl',
  bindings: {}
};
