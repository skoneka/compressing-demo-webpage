'use strict';

/**
 * @ngdoc function
 * @name yeomanTodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanTodoApp
 */
angular.module('yeomanTodoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.todos = [
      'Item 1',
      'Item 2',
      'Item 3'
    ];
    $scope.addTodo = function () {
      $scope.todos.push($scope.todo);
      $scope.todo = '';
      //$scope.todoBlock.set$scope.todo;
    };

    $scope.getValue = function(){
        return $scope.todo;
    };

    $scope.$watch('toggle', function(){
      $scope.toggleText = $scope.toggle ? 'Toggle!' : 'some text';
      $scope.outputForm = $scope.inputForm;
    });
  });



