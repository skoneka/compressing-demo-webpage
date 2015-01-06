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


      switch ($scope.algorithm.selected) {
        //LZMA.compress(string, mode, on_finish(result) {}, on_progress(percent) {});
        //
        //  LZMA.decompress(byte_array, on_finish(result) {}, on_progress(percent) {});
        case 'LZW':
          // Blah
          var compressed = LZString.compress($scope.inputForm);
          $scope.encryptForm = compressed;
          break;

        case 'LZ77':
          var compressor = new LZ77();
          var compressed = compressor.compress($scope.inputForm);
          $scope.encryptForm = compressed;
          break;

        case 'LZMA':
          LZMA.compress($scope.inputForm, 1, function on_compress_complete(result) {
            $scope.$apply(function () {
              console.log('compresses: ' + result);
              $scope.encryptForm = result;
            });

          }, function on_compress_progress_update(percent) {
            document.title = "Compressing: " + (percent * 100) + "%";
          });
          break;
      }
      $scope.todos.push($scope.encryptForm);

      $scope.todo = '';
      //$scope.todoBlock.set$scope.todo;
    };

    $scope.getValue = function(){
        return $scope.todo;
    };

    $scope.$watch('toggle', function(){
      $scope.toggleTextEncrypt = $scope.toggle ? 'Compress' : 'Compress';


      switch ($scope.algorithm.selected) {
        //LZMA.compress(string, mode, on_finish(result) {}, on_progress(percent) {});
        //
        //  LZMA.decompress(byte_array, on_finish(result) {}, on_progress(percent) {});
        case 'LZW':
          // Blah
          var compressed = LZString.compress($scope.inputForm);
          $scope.encryptForm = compressed;
          break;

        case 'LZ77':
          var compressor = new LZ77();
          var compressed = compressor.compress($scope.inputForm);
          $scope.encryptForm = compressed;
          break;

        case 'LZMA':
          LZMA.compress($scope.inputForm, 1, function on_compress_complete(result) {
            $scope.$apply(function () {
              console.log('compresses: ' + result);
              $scope.encryptForm = result;
            });

          }, function on_compress_progress_update(percent) {
            document.title = "Compressing: " + (percent * 100) + "%";
          });
          break;
      }
    });

    $scope.$watch('decrypt', function(){
      $scope.toggleTextDecrypt = 'Decompress';


      switch ($scope.algorithm.selected) {
        case 'LZW':
          // Blah
          var compressed = LZString.decompress($scope.encryptForm);
          $scope.decryptForm = compressed;
          break;
        case 'LZ77':
          var compressor = new LZ77();
          var compressed = compressor.decompress($scope.encryptForm);
          $scope.decryptForm = compressed;
          break;

        case 'LZMA':
          LZMA.decompress($scope.encryptForm, function on_decompress_complete(result) {
            $scope.$apply(function () {
              console.log('decompress: ' + result);
              $scope.decryptForm = result;
            });
          }, function on_decompress_progress_update(percent) {
            /// Decompressing progress code goes here.
            document.title = "Decompressing: " + (percent * 100) + "%";
          });
          break;
      }

      debugger;
    });

    $scope.algorithms=['LZW', 'LZ77', 'LZMA'];
  });



