var socialManager = angular.module('socialManager', ['ui.router']);

socialManager.component('navBar', require('./modules/navBar/navBar.js'));
socialManager.component('managerPage', require('./modules/manager/manager.js'));
socialManager.component('privacyPolicy', require('./modules/privacy/privacy.js'));
socialManager.component('loginPage', require('./modules/login/login.js'));
socialManager.component('statisticBox', require('./modules/statisticBox/statisticBox.js'));

socialManager.service('authenticationService', require('./services/authenticationService.js'));
socialManager.service('dataService', require('./services/dataService.js'));
socialManager.service('stats', require('./services/stats.js'));
socialManager.service('utils', require('./services/utils.js'));

socialManager.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/manager');
  $stateProvider
  .state('login', {
    url: '/login',
    template: '<login-page></login-page>'
  })
  .state('manager', {
    url: '/manager',
    template: '<manager-page></manager-page>'
  })
});
