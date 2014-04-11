// console.log("test");
var app = angular.module('routing', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  var templateSrc =  function(tpl){return '/app/tpl/'+tpl+'.html';};
  var sRoutes= ['about','projects'];

  /*
    makes each route in sRoutes E.g. 'home'
    .when('/home', {
      title:'Home',
      templateUrl:templateSrc('home'),
      conteoller: homeCtrl
    })
  */
  for (var i = 0; i < sRoutes.length; i++) {route = sRoutes[i];$routeProvider.when('/'+route, {title: 'James Harrington | Web Devloper & Contract Coder | '+route.charAt(0).toUpperCase() + route.slice(1),templateUrl: templateSrc(route),controller:route+'Ctrl'});}
  //Magic!


  $routeProvider.
    when('/', {
      title:'James Harrington | Web Devloper & Contract Coder',
      templateUrl: templateSrc('index'),
      controller: 'indexCtrl'
    }).when('/project/:slug', {
      title:"Project",
      templateUrl:templateSrc('project'),
      controller:'projectCtrl'
    });


    $routeProvider.otherwise({
      redirectTo:'/'
    });
    $locationProvider.html5Mode(true).hashPrefix('!');
});

