'use strict';

module.exports = function($http, utils, authenticationService) {
  const vm = this;

  vm.getUserData = (userToken) => {
    return $http({
      method: 'GET',
      url: utils.currentUrl() + ':' + utils.port() + '/api/userInfo?access_token=' + userToken
    })
    .then((res) => {
      if (res.data.meta.error_message) {
        return Promise.reject(res.data.meta.error_message);
      } else {
        return Promise.resolve(res.data);
      }
    })
    .catch((e) => Promise.reject(e));
  }

  vm.getAllMedia = (userToken) => {
    return $http({
      method: 'GET',
      url: utils.currentUrl() + ':' + utils.port() + '/api/allMedia?access_token=' + userToken
    })
    .then((res) => {
      if (res.data.meta.error_message) {
        return Promise.reject(res.data.meta.error_message);
      } else {
        return Promise.resolve(res.data);
      }
    })
    .catch((e) => Promise.reject(e));
  }
}
