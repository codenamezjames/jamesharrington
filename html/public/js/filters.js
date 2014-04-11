var app = angular.module('filter',[]);
app.filter('slice', function() {
  return function(arr, start, end) {
    arr = arr || [];
    return arr.slice(start, end);
  };
});