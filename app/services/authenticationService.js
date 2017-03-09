'use strict';

module.exports = function($location, $window, utils) {
  const vm = this;

  vm.logIn = () => {
    console.log($location.protocol());
    const loginUrl = 'https://www.instagram.com/oauth/authorize/';
    const igClientId = '3df7472a20ef4925aaa42ac581d25524';
    const igPostback = encodeURI(utils.currentUrl() + (utils.isProduction() ? '' : (':' + utils.port())) + '/api/authenticate');
    console.log('Redirect URI:', igPostback);
    const permissions = ['basic'];
    $window.open(
      loginUrl +
      '?client_id=' + igClientId +
      '&redirect_uri=' + igPostback +
      '&response_type=code&scope=' + permissions.join('+'),
      '_top'
    );
  }
}
