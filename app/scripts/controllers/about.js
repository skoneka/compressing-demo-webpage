'use strict';

/**
 * @ngdoc function
 * @name yeomanTodoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yeomanTodoApp
 */
angular.module('yeomanTodoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
