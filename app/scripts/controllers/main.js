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
      $scope.toggleTextEncrypt = $scope.toggle ? 'Toggle!' : 'some text';


      switch ($scope.algorithm.selected) {
        case 'one':
          // Blah
          var compressed = LZString.compress($scope.inputForm);
          break;
        case 'two':
          // Blah
          var compressor = new LZ77();
          var compressed = compressor.compress($scope.inputForm);
          break;
      }
      $scope.encryptForm = compressed;
      debugger;
    });

    $scope.$watch('decrypt', function(){
      $scope.toggleTextDecrypt = 'Decrypt';


      switch ($scope.algorithm.selected) {
        case 'one':
          // Blah
          var compressed = LZString.decompress($scope.encryptForm);
          break;
        case 'two':
          var compressor = new LZ77();
          var compressed = compressor.decompress($scope.encryptForm);
          break;
      }
      $scope.decryptForm = compressed;
      debugger;
    });

    $scope.algorithms=['LZW', 'LZ77', 'three'];
  });



