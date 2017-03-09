'use strict';

const controller = function($window, $location, $state, $timeout, authenticationService, dataService, utils, stats) {
  const ctrl = this;
  const queryStringToken = utils.getQueryStringToken();
  let userToken = null;
  let allMedia = {};
  ctrl.pageLoaded = false;
  ctrl.userData = {};
  $location.url($location.path()); // Clear URL query string

  if (queryStringToken) {
    userToken = queryStringToken;
    utils.saveUserToken(queryStringToken);
  } else {
    userToken = utils.getLocalStorageToken();
  }

  if (!userToken) {
    $state.go('login');
  } else {
    dataService.getUserData(userToken)
    .then((res) => {
      ctrl.userData = res.data;
      $timeout(() => { ctrl.pageLoaded = true }, 1000);
    })
    .then(() => dataService.getAllMedia(userToken))
    .then((res) => {
      allMedia = res.data;
      return stats.getTopUsedTags(allMedia, 10);
    })
    .then((res) => ctrl.topUsedTags = res)
    .then(() => stats.getTopPopularTags(allMedia, 10))
    .then((res) => ctrl.topPopularTags = res)
    .then(() => stats.getTopUsedFilters(allMedia, 10))
    .then((res) => ctrl.topUsedFilters = res)
    .then(() => stats.getTopPopularFilters(allMedia, 10))
    .then((res) => ctrl.topPopularFilters = res)
    .catch((e) => $state.go('login'));
  }
};

module.exports = {
  templateUrl: './modules/manager/manager.html',
  controller,
  controllerAs: 'ctrl',
  bindings: {}
};
