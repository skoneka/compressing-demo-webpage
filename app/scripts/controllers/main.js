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
      {value: 'օ〶惶@✰ӈ', algorithm: "LZW"}
    ];
    $scope.addTodo = function () {
      console.log('addTodo');

      //switch ('LZW') {
      //  //LZMA.compress(string, mode, on_finish(result) {}, on_progress(percent) {});
      //  //
      //  //  LZMA.decompress(byte_array, on_finish(result) {}, on_progress(percent) {});
      //  case 'LZW':
      //    // Blah
      //    var compressed = LZString.compress($scope.inputForm);
      //    $scope.encryptForm = compressed;
      //    break;
      //
      //  case 'LZ77':
      //    var compressor = new LZ77();
      //    var compressed = compressor.compress($scope.inputForm);
      //    $scope.encryptForm = compressed;
      //    break;
      //
      //  case 'LZMA':
      //    LZMA.compress($scope.inputForm, 1, function on_compress_complete(result) {
      //      $scope.$apply(function () {
      //        console.log('compresses: ' + result);
      //        $scope.encryptForm = result;
      //      });
      //
      //    }, function on_compress_progress_update(percent) {
      //      document.title = "Compressing: " + (percent * 100) + "%";
      //    });
      //    break;
      //}

      //$scope.todos.push($scope.todo);
      $scope.compress($scope.todo, $scope.algorithm.selected);

      $scope.todo = '';
      //$scope.todoBlock.set$scope.todo;
    };

    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };

    $scope.decompressTodo = function (index) {
      //var item = $scope.todos[index]
      $scope.decompress(index);
      //debugger;
      //$scope.todos.splice(index, 1);
    };

    $scope.getValue = function(){
        return $scope.todo;
    };

    $scope.compress = function(value, algorithm) {

        switch (algorithm) {
          //LZMA.compress(string, mode, on_finish(result) {}, on_progress(percent) {});
          //
          //  LZMA.decompress(byte_array, on_finish(result) {}, on_progress(percent) {});
          case 'LZW':
            // Blah
            var compressed = LZString.compress(value);
            $scope.todos.push({value: compressed, algorithm: 'LZW'});
            break;

          case 'LZ77':
            var compressor = new LZ77();
            var compressed = compressor.compress(value);
            $scope.todos.push({value: compressed, algorithm: 'LZ77'});
            break;

          case 'LZMA':
            LZMA.compress(value, 1, function on_compress_complete(compressed) {
              $scope.$apply(function () {
                console.log('compresses: ' + compressed);
                $scope.todos.push({value: compressed, algorithm: 'LZMA'});
              });

            }, function on_compress_progress_update(percent) {
              //document.title = "Compressing: " + (percent * 100) + "%";
            });
            break;
        }

    };

    $scope.decompress = function(index) {
      switch ($scope.todos[index].algorithm) {
        case 'LZW':
          // Blah
          var compressed = LZString.decompress($scope.todos[index].value);
          $scope.decryptForm = compressed;
          break;
        case 'LZ77':
          var compressor = new LZ77();
          var compressed = compressor.decompress($scope.todos[index].value);
          $scope.decryptForm = compressed;
          break;

        case 'LZMA':
          LZMA.decompress($scope.todos[index].value, function on_decompress_complete(result) {
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
    };

    //$scope.$watch('toggle', function(){
    //  $scope.toggleTextEncrypt = $scope.toggle ? 'Compress' : 'Compress';
    //
    //
    //  switch ($scope.algorithm.selected) {
    //    //LZMA.compress(string, mode, on_finish(result) {}, on_progress(percent) {});
    //    //
    //    //  LZMA.decompress(byte_array, on_finish(result) {}, on_progress(percent) {});
    //    case 'LZW':
    //      // Blah
    //      var compressed = LZString.compress($scope.inputForm);
    //      $scope.encryptForm = compressed;
    //      break;
    //
    //    case 'LZ77':
    //      var compressor = new LZ77();
    //      var compressed = compressor.compress($scope.inputForm);
    //      $scope.encryptForm = compressed;
    //      break;
    //
    //    case 'LZMA':
    //      LZMA.compress($scope.inputForm, 1, function on_compress_complete(result) {
    //        $scope.$apply(function () {
    //          console.log('compresses: ' + result);
    //          $scope.encryptForm = result;
    //        });
    //
    //      }, function on_compress_progress_update(percent) {
    //        document.title = "Compressing: " + (percent * 100) + "%";
    //      });
    //      break;
    //  }
    //});
    //
    //$scope.$watch('decrypt', function(){
    //  $scope.toggleTextDecrypt = 'Decompress';
    //
    //
    //  switch ($scope.algorithm.selected) {
    //    case 'LZW':
    //      // Blah
    //      var compressed = LZString.decompress($scope.encryptForm);
    //      $scope.decryptForm = compressed;
    //      break;
    //    case 'LZ77':
    //      var compressor = new LZ77();
    //      var compressed = compressor.decompress($scope.encryptForm);
    //      $scope.decryptForm = compressed;
    //      break;
    //
    //    case 'LZMA':
    //      LZMA.decompress($scope.encryptForm, function on_decompress_complete(result) {
    //        $scope.$apply(function () {
    //          console.log('decompress: ' + result);
    //          $scope.decryptForm = result;
    //        });
    //      }, function on_decompress_progress_update(percent) {
    //        /// Decompressing progress code goes here.
    //        document.title = "Decompressing: " + (percent * 100) + "%";
    //      });
    //      break;
    //  }
    //
    //  debugger;
    //});

    $scope.algorithms=['LZW', 'LZ77', 'LZMA'];
  });



