var app = angular.module('indexCtrl',['filter']);

app.controller('appCtrl',function($scope, $location){
  $scope.activePath = null;
  $scope.$on('$routeChangeSuccess', function(){
    $scope.activePath = $location.path();
  });
});

app.controller('indexCtrl', function($scope){
  $scope.header = 'Hello World';
});

app.controller('aboutCtrl', function($scope){
  $scope.header = "About Page";
});

app.controller('projectsCtrl', function($scope,$http){
  $scope.header = "Projects";
  $http.get('public/data/projects.json').success(function(data){
    $scope.projects = data;
  });
});

app.controller('projectCtrl', function($scope,$http,$routeParams){
  $scope.header = "Projects";
  $http.get('/public/data/projects.json').success(function(data){
    for (var i = 0; i < data.length; i++) {
      if(data[i].slug == $routeParams.slug){
        $scope.project = data[i];
      }
    }
  });
});

