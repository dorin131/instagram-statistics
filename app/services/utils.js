'use strict';

module.exports = function($window, $location) {
  const vm = this;

  vm.currentUrl = () => $location.protocol() + '://' + $location.host();
  vm.port = () =>  $location.port();
  vm.getLocalStorageToken = () => $window.localStorage.getItem('igToken');
  vm.getQueryStringToken = () => $location.search().token;
  vm.saveUserToken = (token) => $window.localStorage.setItem('igToken', token);
  vm.isProduction = () => {
    const host = $location.host();
    if (host === '127.0.0.1' || host === 'localhost') {
      return false;
    }
    return true;
  }
}
