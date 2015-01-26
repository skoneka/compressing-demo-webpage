'use strict';

// entropy.js MIT License © 2014 James Abney http://github.com/jabney

// Calculate the Shannon entropy of a string in bits per symbol.
(function(shannon) {
  'use strict';

  // Create a dictionary of character frequencies and iterate over it.
  function process(s, evaluator) {
    var h = Object.create(null), k;
    s.split('').forEach(function(c) {
      h[c] && h[c]++ || (h[c] = 1); });
    if (evaluator) for (k in h) evaluator(k, h[k]);
    return h;
  };

  // Measure the entropy of a string in bits per symbol.
  shannon.entropy = function(s) {
    var sum = 0,len = s.length;
    process(s, function(k, f) {
      var p = f/len;
      sum -= p * Math.log(p) / Math.log(2);
    });
    return sum;
  };

  // Measure the entropy of a string in total bits.
  shannon.bits = function(s) {
    return shannon.entropy(s) * s.length;
  };

  // Log the entropy of a string to the console.
  shannon.log = function(s) {
    console.log('Entropy of "' + s + '" in bits per symbol:', shannon.entropy(s));
  };
})(window.shannon = window.shannon || Object.create(null));



function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

function utf8_to_b64(str) {
  return str;
}

function b64_to_utf8(str) {
  return str;
}
/**
 * @ngdoc function
 * @name yeomanTodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanTodoApp
 */
angular.module('yeomanTodoApp')
  .controller('MainCtrl', function ($scope, dialogs, $base64) {
    $scope.todos = [
      {value: 'օ〶惶@✰ӈ', algorithm: "LZW",  type: 'text', cr:'CR'},
      {value: 'ኀ怶ภ☁恑ȋ₊쪁ꠏ䀷㑐ᶈ간쨭⚫栒䁓尋䀡Ƅܶ工㠇畂┺ᆜI敠ᵟḢƘ嚵犀웜ʨٰୡ%耯䷪蠄怉끁ᆨ㌀͓䠀盕ꠄ㆗쀃倂햗ሢ', orginal_value: 'ኀ怶ภ☁恑ȋ₊쪁ꠏ䀷㑐ᶈ간쨭⚫栒䁓尋䀡Ƅܶ工㠇畂┺ᆜI敠ᵟḢƘ嚵犀웜ʨٰୡ%耯䷪蠄怉끁ᆨ㌀͓䠀盕ꠄ㆗쀃倂햗ሢ', algorithm: "LZW", type: 'image'}
    ];
    $scope.showpreview = true;

    $scope.data = {
      show: true,
      hide: false,
      showpreview: false
    };

    $scope.previewFile = function() {

      var preview = document.querySelector('#img-src');
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();

      reader.onloadend = function () {
        preview.src = reader.result;
        $scope.showpreview = true;

      }

      if (file) {
        reader.readAsDataURL(file);

      } else {
        preview.src = "";
      }
    };

    $scope.addFile = function() {
      console.log('addFile');
      var preview = document.querySelector('#img-src');
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();

      reader.onloadend = function () {
        var data = utf8_to_b64(reader.result);
        $scope.compress(data, $scope.algorithm.selected, 'image');
        console.log('compressed');
        //$scope.todos.push({value: document.querySelector('input[type=file]').files[0].name, algorithm: 'LZW', orginal_value: reader.result});
        //preview.src = reader.result;

      }

      if (file) {
        reader.readAsText(file);
      } else {
        preview.src = "";
      }
    };

    $scope.addTodo = function () {
      console.log('addTodo');
      debugger;

      //$scope.todos.push($scope.todo);
      $scope.compress($scope.todo, $scope.algorithm.selected, 'text');

      $scope.todo = '';
      //$scope.todoBlock.set$scope.todo;
    };

    $scope.getDecompressedField = function (index) {

    }

    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };

    $scope.decompressTodo = function (index) {
      //var item = $scope.todos[index]
      $scope.decompress(index);
      //debugger;
      //$scope.todos.splice(index, 1);
    };


    $scope.compress = function(value, algorithm, type) {

        shannon.log(value);

        switch (algorithm) {
          //LZMA.compress(string, mode, on_finish(result) {}, on_progress(percent) {});
          //
          //  LZMA.decompress(byte_array, on_finish(result) {}, on_progress(percent) {});
          case 'LZW':
            // Blah
            var compressed = LZString.compress(value);
            $scope.todos.push({value: compressed, algorithm: 'LZW', orginal_value: value, type: type, cr: (value.length/compressed.length).toFixed(3), entropy_pre : shannon.entropy(value).toFixed(3), entropy_post : shannon.entropy(compressed).toFixed(3)});
            shannon.log(compressed);
            break;

          case 'LZ77':
            var compressor = new LZ77();
            var compressed = compressor.compress(value);
            $scope.todos.push({value: compressed, algorithm: 'LZ77', orginal_value: value, type: type, cr: value.length/compressed.length});
            break;

          case 'LZMA':
            LZMA.compress(value, 1, function on_compress_complete(compressed) {
              $scope.$apply(function () {
                console.log('compresses: ' + compressed);
                $scope.todos.push({value: compressed, algorithm: 'LZMA', orginal_value: value, type: type, cr: value.length/compressed.length});
              });

            }, function on_compress_progress_update(percent) {
              //document.title = "Compressing: " + (percent * 100) + "%";
            });
            break;
        }

    };

    $scope.decompress = function(index) {
      if ($scope.todos[index].type == 'image')
        $scope.orginalValueForm = b64_to_utf8($scope.todos[index].orginal_value);
      else
        $scope.orginalValueForm = $scope.todos[index].orginal_value;
      switch ($scope.todos[index].algorithm) {
        case 'LZW':

          if ($scope.todos[index].type == 'image') {
            var compressed = b64_to_utf8(LZString.decompress($scope.todos[index].value));
            $scope.decryptForm = compressed;

            var b=new Blob([compressed], {type: 'image/gif'});
            var preview = document.querySelector('#img-dest');
            var reader  = new FileReader();

            reader.onloadend = function () {

              console.log('IMAGE-dst');
              preview.src = reader.result;
              console.log(reader.result);
              //$scope.todos.push({value: document.querySelector('input[type=file]').files[0].name, algorithm: 'LZW', orginal_value: reader.result});
              //preview.src = reader.result;

            }

            reader.readAsDataURL(b);

          } else {
            var compressed = LZString.decompress($scope.todos[index].value);
            $scope.decryptForm = compressed;
          }
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
      if ($scope.orginalValueForm == $scope.decryptForm )
        $scope.formCheckStyle = { "background" : "green", "color" : "black" }
      else {
        var dlg = dialogs.error('Decompressed value does not match original value.');
        $scope.formCheckStyle = {"background": "red", "color": "black"}
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



